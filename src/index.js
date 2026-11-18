import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { notifyUpdateAvailable } from './swUpdate';
import reportWebVitals from './reportWebVitals';
import { I18nProvider } from './i18n/I18nContext';

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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
