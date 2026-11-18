// Runs `react-scripts build` with REACT_APP_VERSION set to the short commit
// SHA, so analytics can tell which release a visitor is running. Set
// REACT_APP_VERSION yourself to override it.

const { execFileSync, spawnSync } = require('child_process');

function appVersion() {
  if (process.env.REACT_APP_VERSION) {
    return process.env.REACT_APP_VERSION;
  }
  try {
    return execFileSync('git', ['rev-parse', '--short', 'HEAD'], {
      stdio: ['ignore', 'pipe', 'ignore'],
    })
      .toString()
      .trim();
  } catch {
    // No git, no .git directory, or git refuses the checkout (for example a
    // build container running as a different user). CI still knows the SHA.
  }
  if (process.env.GITHUB_SHA) {
    return process.env.GITHUB_SHA.slice(0, 7);
  }
  return 'unknown';
}

const version = appVersion();
console.log(`Building app version ${version}`);

const result = spawnSync(
  process.execPath,
  [require.resolve('react-scripts/bin/react-scripts.js'), 'build'],
  { stdio: 'inherit', env: { ...process.env, REACT_APP_VERSION: version } }
);
process.exit(result.status ?? 1);
