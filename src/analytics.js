// Umami analytics, self-hosted at analytics.konbamwa.net. The tracker script
// is loaded by public/index.html; these helpers hold calls until it has
// loaded, and do nothing when it is blocked, offline or not tracking this
// hostname (see data-domains). Analytics must never break the quiz, so
// nothing here throws.

const trackerReady = () => typeof window.umami?.track === 'function';

const call = (method, ...args) => {
  const run = () => {
    try {
      if (trackerReady()) {
        Promise.resolve(window.umami[method](...args)).catch(() => {});
      }
    } catch {}
  };
  try {
    if (trackerReady()) {
      run();
    } else {
      document
        .getElementById('umami-tracker')
        ?.addEventListener('load', run, { once: true });
    }
  } catch {}
};

// Event names are kebab-case, property keys snake_case. Never send anything
// the user typed or anything that identifies them.
export const track = (name, data) => call('track', name, data);

// Sets session properties. Umami merges them per key, so a call can update
// one property without resending the others.
export const identify = (data) => call('identify', data);

// 'standalone' when running as an installed app, otherwise 'browser'.
// iOS Safari reports this through navigator.standalone instead.
export const displayMode = () => {
  try {
    if (
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true
    ) {
      return 'standalone';
    }
  } catch {}
  return 'browser';
};

// Sends the session properties known at startup and reports installs. The
// language property is sent by I18nProvider, which owns it.
export const initAnalytics = () => {
  identify({
    display_mode: displayMode(),
    app_version: process.env.REACT_APP_VERSION || 'unknown',
  });
  try {
    // Chromium only; iOS fires no install event, so display_mode covers it.
    window.addEventListener('appinstalled', () => track('app-installed'));
  } catch {}
};
