// Generates src/publicPrecacheManifest.json: the files in public/ that the
// service worker precaches for offline use, each with a content hash as its
// revision.
//
// Files in public/ are copied into build/ outside of webpack, so Workbox's
// injected manifest (self.__WB_MANIFEST) doesn't know about them. Generating
// this list at build time means new or changed tiles and images are picked up
// automatically, with no hand-maintained list or revision to bump.
//
// Runs as the first step of `npm run build`. Calling `react-scripts build`
// directly skips it: the build then fails on a fresh checkout, or precaches a
// stale list if an old generated file is lying around.

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const OUTPUT_FILE = path.join(__dirname, '..', 'src', 'publicPrecacheManifest.json');

// Only what the app needs to work offline: tile images and help page images.
// Icons, favicon and manifest are left out; the browser and OS keep their own
// copies of those once the app is installed.
const PRECACHED_DIRS = ['assets', 'img'];

function listFiles(dir) {
  return fs.readdirSync(dir).flatMap((name) => {
    if (name.startsWith('.')) {
      return [];
    }
    const fullPath = path.join(dir, name);
    // statSync follows symlinks, matching how CRA copies public/ into build/.
    return fs.statSync(fullPath).isDirectory() ? listFiles(fullPath) : [fullPath];
  });
}

const entries = PRECACHED_DIRS.flatMap((dir) => listFiles(path.join(PUBLIC_DIR, dir)))
  .map((file) => path.relative(PUBLIC_DIR, file).split(path.sep).join('/'))
  .sort()
  .map((relativePath) => ({
    url: '/' + relativePath,
    revision: crypto
      .createHash('sha256')
      .update(fs.readFileSync(path.join(PUBLIC_DIR, relativePath)))
      .digest('hex')
      .slice(0, 16),
  }));

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(entries, null, 2) + '\n');
console.log(`Wrote ${entries.length} public/ entries to ${path.relative(process.cwd(), OUTPUT_FILE)}`);
