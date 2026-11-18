// Bridges service worker registration (set up in index.js, outside React) to
// the UpdatePrompt component. Remembers a pending update so a component that
// subscribes after the update was found still sees it.

let pendingRegistration = null;
const listeners = new Set();

export function notifyUpdateAvailable(registration) {
  pendingRegistration = registration;
  listeners.forEach((listener) => listener(registration));
}

export function onUpdateAvailable(listener) {
  listeners.add(listener);
  if (pendingRegistration) {
    listener(pendingRegistration);
  }
  return () => {
    listeners.delete(listener);
  };
}

// Activate the waiting service worker, then reload once it takes control so
// the page runs against the new precached assets.
export function applyUpdate(registration) {
  const waitingWorker = registration.waiting;
  if (!waitingWorker) {
    window.location.reload();
    return;
  }
  navigator.serviceWorker.addEventListener(
    'controllerchange',
    () => window.location.reload(),
    { once: true }
  );
  waitingWorker.postMessage({ type: 'SKIP_WAITING' });
}
