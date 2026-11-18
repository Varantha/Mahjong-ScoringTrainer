import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { notifyUpdateAvailable } from './swUpdate';
import { I18nProvider } from './i18n/I18nContext';
import { initAnalytics } from './analytics';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <I18nProvider>
      <App />
    </I18nProvider>
  </React.StrictMode>
);

// Register the service worker so the app is installable and works offline.
// When a new version is downloaded, UpdatePrompt offers to reload into it.
// Learn more about the benefits of this model: https://cra.link/PWA
serviceWorkerRegistration.register({ onUpdate: notifyUpdateAvailable });

// Web Vitals and uncaught errors are collected by the Umami tracker itself
// (data-performance and data-errors in public/index.html).
initAnalytics();
