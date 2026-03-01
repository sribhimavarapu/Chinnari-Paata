// Language Configuration - Central config for all supported languages

export const SUPPORTED_LANGUAGES = {
  telugu: {
    code: 'te-IN',
    name: 'తెలుగు',
    englishName: 'Telugu',
    flag: '🇮🇳',
    direction: 'ltr',
    fontFamily: 'Ramabhadra, sans-serif',
    speechLang: 'te-IN',
    enabled: true
  },
  hindi: {
    code: 'hi-IN',
    name: 'हिंदी',
    englishName: 'Hindi',
    flag: '🇮🇳',
    direction: 'ltr',
    fontFamily: 'Tiro Devanagari Hindi, sans-serif',
    speechLang: 'hi-IN',
    enabled: true
  },
  tamil: {
    code: 'ta-IN',
    name: 'தமிழ்',
    englishName: 'Tamil',
    flag: '🇮🇳',
    direction: 'ltr',
    fontFamily: 'Noto Sans Tamil, sans-serif',
    speechLang: 'ta-IN',
    enabled: false // Coming soon
  }
};

export const DEFAULT_LANGUAGE = 'telugu';

export const getLanguageConfig = (langKey) => {
  return SUPPORTED_LANGUAGES[langKey] || SUPPORTED_LANGUAGES[DEFAULT_LANGUAGE];
};

export const getEnabledLanguages = () => {
  return Object.entries(SUPPORTED_LANGUAGES)
    .filter(([_, config]) => config.enabled)
    .map(([key, config]) => ({ key, ...config }));
};

export default {
  SUPPORTED_LANGUAGES,
  DEFAULT_LANGUAGE,
  getLanguageConfig,
  getEnabledLanguages
};
