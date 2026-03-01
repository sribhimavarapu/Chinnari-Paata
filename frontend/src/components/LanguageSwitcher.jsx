import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Check, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const LanguageSwitcher = ({ isOpen, onClose }) => {
  const { currentLanguage, availableLanguages, switchLanguage } = useLanguage();

  const handleSelectLanguage = (langKey) => {
    switchLanguage(langKey);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-[#4D96FF]/10">
                  <Globe className="w-6 h-6 text-[#4D96FF]" />
                </div>
                <h2 className="font-nunito font-black text-xl text-[#2D3436]">
                  Select Language
                </h2>
              </div>
              <button
                data-testid="close-language-switcher"
                onClick={onClose}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Language Options */}
            <div className="space-y-3">
              {availableLanguages.map((lang) => (
                <motion.button
                  key={lang.key}
                  data-testid={`lang-option-${lang.key}`}
                  onClick={() => handleSelectLanguage(lang.key)}
                  className={`
                    w-full p-4 rounded-2xl border-2 transition-all
                    flex items-center justify-between
                    ${currentLanguage === lang.key 
                      ? 'border-[#4D96FF] bg-[#4D96FF]/10' 
                      : 'border-gray-200 hover:border-[#4D96FF]/50'}
                  `}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{lang.flag}</span>
                    <div className="text-left">
                      <div 
                        className="font-bold text-lg text-[#2D3436]"
                        style={{ fontFamily: lang.fontFamily }}
                      >
                        {lang.name}
                      </div>
                      <div className="text-sm text-gray-500 font-nunito">
                        {lang.englishName}
                      </div>
                    </div>
                  </div>
                  {currentLanguage === lang.key && (
                    <div className="w-8 h-8 rounded-full bg-[#4D96FF] flex items-center justify-center">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                  )}
                </motion.button>
              ))}
            </div>

            {/* Coming soon notice */}
            <p className="text-center text-sm text-gray-400 mt-4 font-nunito">
              More languages coming soon!
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LanguageSwitcher;
