// Data Index - Central data loader

import teluguData from './telugu';
import hindiData from './hindi';
import { STICKERS, THEMES, MILESTONES } from './shared/rewards';
import { DEFAULT_LANGUAGE } from '../config/languages';

// Language data registry
const LANGUAGE_DATA = {
  telugu: teluguData,
  hindi: hindiData
};

// Get language data by key
export const getLanguageData = (langKey) => {
  return LANGUAGE_DATA[langKey] || LANGUAGE_DATA[DEFAULT_LANGUAGE];
};

// Get specific data type for a language
export const getVowels = (langKey) => getLanguageData(langKey).vowels;
export const getWordCategories = (langKey) => getLanguageData(langKey).wordCategories;
export const getRhymes = (langKey) => getLanguageData(langKey).rhymes;
export const getStrings = (langKey) => getLanguageData(langKey).strings;

// Export shared data
export { STICKERS, THEMES, MILESTONES };

// Export all language data for direct access
export { teluguData, hindiData };

export default {
  getLanguageData,
  getVowels,
  getWordCategories,
  getRhymes,
  getStrings,
  STICKERS,
  THEMES,
  MILESTONES
};
