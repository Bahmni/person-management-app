import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from './translations/en.json';
import frTranslations from './translations/fr.json';

const getLanguage = () => {
    const language = localStorage.getItem('NG_TRANSLATE_LANG_KEY')
    return language || 'en'
}

i18n.use(initReactI18next).init({
  resources: {
    en: enTranslations,
    fr: frTranslations
  },
  lng: getLanguage(),
  fallbackLng: 'en',

  interpolation: {
    escapeValue: false
  }
});

export default i18n;