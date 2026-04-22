import React, { createContext, useState, useContext, useEffect } from 'react';
import enTranslations from './translations/en.json';
import jaTranslations from './translations/ja.json';
import koTranslations from './translations/ko.json';
import zh_cnTranslations from './translations/zh_cn.json';

const I18nContext = createContext();

// Available languages
export const LANGUAGES = {
  en: { code: 'en', name: 'English', flag: '🇬🇧' },
  ja: { code: 'ja', name: '日本語', flag: '🇯🇵' },
  ko: { code: 'ko', name: '한국어', flag: '🇰🇷' },
  zh_cn: { code: 'zh_cn', name: '简体中文', flag: '🇨🇳' },
};

const translations = {
  en: enTranslations,
  ja: jaTranslations,
  ko: koTranslations,
  zh_cn: zh_cnTranslations
};

export function I18nProvider({ children }) {
  // Try to load saved language preference, default to English
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    const saved = localStorage.getItem('mahjong-language');
    return saved && LANGUAGES[saved] ? saved : 'en';
  });

  // Save language preference when it changes
  useEffect(() => {
    localStorage.setItem('mahjong-language', currentLanguage);
    
    // Send language to Google Analytics as a user property
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('set', 'user_properties', {
        app_language: currentLanguage
      });
    }
  }, [currentLanguage]);

  const changeLanguage = (languageCode) => {
    if (LANGUAGES[languageCode]) {
      setCurrentLanguage(languageCode);
    }
  };

  // Get nested translation value using dot notation (e.g., "quiz.han")
  const t = (key, fallback = key) => {
    const keys = key.split('.');
    let value = translations[currentLanguage];
    
    // Navigate through nested object
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Try English as fallback
        let fallbackValue = translations['en'];
        for (const fk of keys) {
          if (fallbackValue && typeof fallbackValue === 'object' && fk in fallbackValue) {
            fallbackValue = fallbackValue[fk];
          } else {
            return fallback;
          }
        }
        return fallbackValue;
      }
    }
    
    return value || fallback;
  };

  const value = {
    currentLanguage,
    changeLanguage,
    t,
    languages: LANGUAGES
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

// Custom hook to use translations
export function useTranslation() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useTranslation must be used within an I18nProvider');
  }
  return context;
}
