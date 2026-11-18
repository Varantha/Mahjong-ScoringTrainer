// Bridges service worker registration (set up in index.js, outside React) to
// the UpdatePrompt component. Remembers the latest waiting worker so a
// component that subscribes after the update was found still sees it.

let waitingWorker = null;
const listeners = new Set();

export function notifyUpdateAvailable(registration) {
  if (!registration.waiting) {
    return;
  }
  waitingWorker = registration.waiting;
  listeners.forEach((listener) => listener(waitingWorker));
}

// Calls listener with each new waiting worker. A newer deploy gives a new
// worker object, which lets the prompt reappear after being dismissed.
export function onUpdateAvailable(listener) {
  listeners.add(listener);
  if (waitingWorker) {
    listener(waitingWorker);
  }
  return () => {
    listeners.delete(listener);
  };
}

// Activates the waiting worker. Every open tab then reloads on
// 'controllerchange' (see serviceWorkerRegistration.js).
export function applyUpdate(worker) {
  worker.postMessage({ type: 'SKIP_WAITING' });
}
