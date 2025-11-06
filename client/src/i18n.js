import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslations from './locales/en.json';
import hiTranslations from './locales/hi.json';
import orTranslations from './locales/or.json';

const getInitialLanguage = () => {
  if (typeof window !== 'undefined' && window.localStorage) {
    return localStorage.getItem('language') || 'en';
  }
  return 'en';
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslations,
      },
      hi: {
        translation: hiTranslations,
      },
      or: {
        translation: orTranslations,
      },
    },
    fallbackLng: 'en',
    lng: getInitialLanguage(),
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

