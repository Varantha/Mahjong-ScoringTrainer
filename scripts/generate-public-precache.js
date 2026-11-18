// Generates src/publicPrecacheManifest.json: the list of files in public/ that
// the service worker should precache for offline use, each with a content hash
// as its revision.
//
// Files in public/ are copied into build/ outside of webpack, so Workbox's
// injected manifest (self.__WB_MANIFEST) doesn't know about them. Generating
// this list at build time means new or changed tiles/images/icons are picked
// up automatically, with no hand-maintained list or revision to bump.
//
// Runs automatically before `npm run build` (the "prebuild" script).

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const OUTPUT_FILE = path.join(__dirname, '..', 'src', 'publicPrecacheManifest.json');

// Not needed offline: index.html is already precached via webpack, and the
// others are only read by crawlers or the hosting platform.
const EXCLUDE = new Set(['index.html', 'robots.txt', 'staticwebapp.config.json']);

function listFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (entry.name.startsWith('.')) {
      return [];
    }
    const fullPath = path.join(dir, entry.name);
    return entry.isDirectory() ? listFiles(fullPath) : [fullPath];
  });
}

const entries = listFiles(PUBLIC_DIR)
  .map((file) => path.relative(PUBLIC_DIR, file).split(path.sep).join('/'))
  .filter((relativePath) => !EXCLUDE.has(relativePath))
  .sort()
  .map((relativePath) => ({
    url: '/' + relativePath,
    revision: crypto
      .createHash('md5')
      .update(fs.readFileSync(path.join(PUBLIC_DIR, relativePath)))
      .digest('hex')
      .slice(0, 10),
  }));

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(entries, null, 2) + '\n');
console.log(`Wrote ${entries.length} public/ entries to ${path.relative(process.cwd(), OUTPUT_FILE)}`);
