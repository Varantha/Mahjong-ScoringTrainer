import React, { useEffect, useState } from "react";
import { useTranslation } from "../i18n/I18nContext";
import { applyUpdate, onUpdateAvailable } from "../swUpdate";

// Shown when a new version of the app has been downloaded by the service
// worker. Without this, the new version only takes over once every tab (or
// the installed app) has been fully closed.
function UpdatePrompt() {
  const { t } = useTranslation();
  const [waitingWorker, setWaitingWorker] = useState(null);
  const [dismissedWorker, setDismissedWorker] = useState(null);

  useEffect(() => onUpdateAvailable(setWaitingWorker), []);

  const visible = waitingWorker !== null && waitingWorker !== dismissedWorker;

  // The live region stays mounted so screen readers announce the banner when
  // its content appears; a region inserted with its text already in it is
  // often skipped.
  return (
    <div role="status" aria-live="polite">
      {visible && (
        <div className="updatePrompt">
          <span>{t("update.available")}</span>
          <div className="updatePromptButtons">
            <button onClick={() => applyUpdate(waitingWorker)}>
              {t("update.reload")}
            </button>
            <button
              className="secondary"
              onClick={() => setDismissedWorker(waitingWorker)}
            >
              {t("update.dismiss")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export { UpdatePrompt };
