import React, { useEffect, useState } from "react";
import { useTranslation } from "../i18n/I18nContext";
import { applyUpdate, onUpdateAvailable } from "../swUpdate";

// Shown when a new version of the app has been downloaded by the service
// worker. Without this, the new version only takes over once every tab (or
// the installed app) has been fully closed.
function UpdatePrompt() {
  const { t } = useTranslation();
  const [registration, setRegistration] = useState(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => onUpdateAvailable(setRegistration), []);

  if (!registration || dismissed) {
    return null;
  }

  return (
    <div className="updatePrompt" role="status">
      <span>{t("update.available")}</span>
      <div className="updatePromptButtons">
        <button onClick={() => applyUpdate(registration)}>
          {t("update.reload")}
        </button>
        <button className="secondary" onClick={() => setDismissed(true)}>
          {t("update.dismiss")}
        </button>
      </div>
    </div>
  );
}

export { UpdatePrompt };
