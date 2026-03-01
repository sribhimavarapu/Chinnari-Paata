import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { DEFAULT_LANGUAGE, getLanguageConfig, getEnabledLanguages } from '../config/languages';
import { getLanguageData } from '../data';

const LanguageContext = createContext(null);

const STORAGE_KEY = 'chinnari_paata_language';

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved || DEFAULT_LANGUAGE;
    } catch {
      return DEFAULT_LANGUAGE;
    }
  });

  const [languageData, setLanguageData] = useState(() => getLanguageData(currentLanguage));
  const [languageConfig, setLanguageConfig] = useState(() => getLanguageConfig(currentLanguage));

  // Update data when language changes
  useEffect(() => {
    setLanguageData(getLanguageData(currentLanguage));
    setLanguageConfig(getLanguageConfig(currentLanguage));
    try {
      localStorage.setItem(STORAGE_KEY, currentLanguage);
    } catch (e) {
      console.error('Failed to save language preference:', e);
    }
  }, [currentLanguage]);

  const switchLanguage = useCallback((langKey) => {
    const config = getLanguageConfig(langKey);
    if (config.enabled) {
      setCurrentLanguage(langKey);
    }
  }, []);

  const availableLanguages = getEnabledLanguages();

  const value = {
    currentLanguage,
    languageData,
    languageConfig,
    switchLanguage,
    availableLanguages,
    // Convenience accessors
    vowels: languageData.vowels,
    wordCategories: languageData.wordCategories,
    rhymes: languageData.rhymes,
    strings: languageData.strings,
    fontFamily: languageConfig.fontFamily,
    speechLang: languageConfig.speechLang
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext;
