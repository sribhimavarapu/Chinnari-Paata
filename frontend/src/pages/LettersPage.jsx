import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Volume2, VolumeX, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useProgress } from '../hooks/useProgress';
import { useAudio } from '../hooks/useAudio';
import { Button } from '../components/ui/button';

const LettersPage = () => {
  const navigate = useNavigate();
  const { vowels, strings, fontFamily, speechLang } = useLanguage();
  const { recordLetterHeard } = useProgress();
  const { speak, isPlaying, playbackRate, togglePlaybackRate } = useAudio();
  
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewMode, setViewMode] = useState('grid');

  // Load voices on mount
  useEffect(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.getVoices();
    }
  }, []);

  const handleLetterTap = (vowel, index) => {
    setSelectedLetter(vowel);
    setCurrentIndex(index);
    
    // Speak the letter
    speak(vowel.letter, { lang: speechLang, slow: playbackRate === 'slow' });
    
    // Record progress
    recordLetterHeard(vowel.letter);
  };

  const handlePrevious = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : vowels.length - 1;
    setCurrentIndex(newIndex);
    handleLetterTap(vowels[newIndex], newIndex);
  };

  const handleNext = () => {
    const newIndex = currentIndex < vowels.length - 1 ? currentIndex + 1 : 0;
    setCurrentIndex(newIndex);
    handleLetterTap(vowels[newIndex], newIndex);
  };

  const speakExample = () => {
    if (selectedLetter) {
      speak(selectedLetter.example, { lang: speechLang, slow: playbackRate === 'slow' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF5]">
      {/* Header */}
      <header className="sticky top-0 z-40 px-4 py-3 sm:py-4 bg-[#FFFDF5]/90 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <motion.button
            data-testid="back-to-home"
            onClick={() => navigate('/')}
            className="min-h-[50px] min-w-[50px] sm:min-h-[56px] sm:min-w-[56px] rounded-2xl bg-white shadow-lg flex items-center justify-center cursor-pointer border-b-4 border-gray-100 active:border-b-0 active:translate-y-1"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Home className="w-6 h-6 sm:w-7 sm:h-7 text-[#FF6B6B]" />
          </motion.button>

          <h1 
            className="font-black text-xl sm:text-2xl md:text-3xl text-[#FF6B6B]"
            style={{ fontFamily }}
          >
            {strings.letters}
          </h1>

          <motion.button
            data-testid="toggle-speed"
            onClick={togglePlaybackRate}
            className={`
              min-h-[50px] px-3 sm:px-4 rounded-2xl shadow-lg flex items-center gap-2 cursor-pointer 
              border-b-4 border-gray-100 active:border-b-0 active:translate-y-1
              ${playbackRate === 'slow' ? 'bg-[#6BCB77] text-white' : 'bg-white text-gray-600'}
            `}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {playbackRate === 'slow' ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            <span className="font-nunito font-bold text-sm hidden sm:inline">
              {playbackRate === 'slow' ? strings.slow : strings.normal}
            </span>
          </motion.button>
        </div>
      </header>

      {/* View Mode Toggle */}
      <div className="px-4 py-3 sm:py-4 max-w-5xl mx-auto flex justify-center gap-2">
        <Button
          data-testid="grid-view-btn"
          onClick={() => setViewMode('grid')}
          variant={viewMode === 'grid' ? 'default' : 'outline'}
          className={viewMode === 'grid' ? 'bg-[#FF6B6B] hover:bg-[#FF6B6B]/90' : ''}
          size="sm"
        >
          {strings.gridView}
        </Button>
        <Button
          data-testid="single-view-btn"
          onClick={() => setViewMode('single')}
          variant={viewMode === 'single' ? 'default' : 'outline'}
          className={viewMode === 'single' ? 'bg-[#FF6B6B] hover:bg-[#FF6B6B]/90' : ''}
          size="sm"
        >
          {strings.singleView}
        </Button>
      </div>

      {/* Main Content */}
      <main className="px-4 py-2 sm:py-4 max-w-5xl mx-auto">
        <AnimatePresence mode="wait">
          {viewMode === 'grid' ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6"
            >
              {vowels.map((vowel, index) => (
                <motion.button
                  key={vowel.letter}
                  data-testid={`letter-${vowel.letter}`}
                  onClick={() => handleLetterTap(vowel, index)}
                  className={`
                    aspect-square rounded-3xl bg-white shadow-xl 
                    flex flex-col items-center justify-center 
                    border-b-8 border-gray-100 
                    active:border-b-0 active:translate-y-2
                    cursor-pointer transition-colors
                    min-h-[100px] sm:min-h-[120px]
                    ${selectedLetter?.letter === vowel.letter && isPlaying ? 'bg-[#FFD93D]/30 border-[#FFD93D]' : ''}
                  `}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <span 
                    className="text-5xl sm:text-6xl md:text-7xl text-[#FF6B6B] select-none"
                    style={{ fontFamily }}
                  >
                    {vowel.letter}
                  </span>
                  <span className="text-xs sm:text-sm text-gray-400 mt-1 sm:mt-2 font-nunito font-bold">
                    {vowel.transliteration}
                  </span>
                </motion.button>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="single"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-6 sm:gap-8"
            >
              {/* Navigation and letter */}
              <div className="flex items-center gap-3 sm:gap-4 md:gap-8 w-full justify-center">
                <motion.button
                  data-testid="prev-letter"
                  onClick={handlePrevious}
                  className="min-h-[60px] min-w-[60px] sm:min-h-[80px] sm:min-w-[80px] rounded-full bg-white shadow-xl flex items-center justify-center cursor-pointer border-b-8 border-gray-100 active:border-b-0 active:translate-y-2"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronLeft className="w-8 h-8 sm:w-10 sm:h-10 text-[#FF6B6B]" />
                </motion.button>

                <motion.div
                  key={selectedLetter?.letter || vowels[currentIndex].letter}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className={`
                    w-40 h-40 sm:w-48 sm:h-48 md:w-64 md:h-64 rounded-3xl bg-white shadow-2xl 
                    flex flex-col items-center justify-center 
                    border-b-8 border-[#FF6B6B]/20
                    cursor-pointer
                    ${isPlaying ? 'bg-[#FFD93D]/20' : ''}
                  `}
                  onClick={() => handleLetterTap(vowels[currentIndex], currentIndex)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.span 
                    className="text-7xl sm:text-8xl md:text-9xl text-[#FF6B6B] select-none"
                    style={{ fontFamily }}
                    animate={isPlaying ? { scale: [1, 1.2, 1] } : {}}
                  >
                    {selectedLetter?.letter || vowels[currentIndex].letter}
                  </motion.span>
                  <span className="text-base sm:text-lg text-gray-400 mt-2 font-nunito font-bold">
                    {selectedLetter?.transliteration || vowels[currentIndex].transliteration}
                  </span>
                </motion.div>

                <motion.button
                  data-testid="next-letter"
                  onClick={handleNext}
                  className="min-h-[60px] min-w-[60px] sm:min-h-[80px] sm:min-w-[80px] rounded-full bg-white shadow-xl flex items-center justify-center cursor-pointer border-b-8 border-gray-100 active:border-b-0 active:translate-y-2"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronRight className="w-8 h-8 sm:w-10 sm:h-10 text-[#FF6B6B]" />
                </motion.button>
              </div>

              {/* Example Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-3xl shadow-xl p-4 sm:p-6 w-full max-w-md"
              >
                <h3 className="font-nunito font-bold text-gray-500 mb-3 sm:mb-4 text-center text-sm sm:text-base">
                  {strings.exampleWord}
                </h3>
                <div className="flex items-center gap-3 sm:gap-4">
                  <img
                    src={(selectedLetter || vowels[currentIndex]).exampleImage}
                    alt={(selectedLetter || vowels[currentIndex]).example}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover shadow-lg"
                    onError={(e) => { e.target.src = 'https://placehold.co/200x200/FFD93D/2D3436?text=?' }}
                  />
                  <div className="flex-1">
                    <span 
                      className="text-2xl sm:text-3xl text-[#2D3436] block"
                      style={{ fontFamily }}
                    >
                      {(selectedLetter || vowels[currentIndex]).example}
                    </span>
                    <span className="text-gray-500 font-nunito text-sm sm:text-base">
                      {(selectedLetter || vowels[currentIndex]).exampleMeaning}
                    </span>
                  </div>
                  <motion.button
                    data-testid="speak-example"
                    onClick={speakExample}
                    className="min-h-[50px] min-w-[50px] sm:min-h-[60px] sm:min-w-[60px] rounded-2xl bg-[#4D96FF] shadow-lg flex items-center justify-center cursor-pointer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Volume2 className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </motion.button>
                </div>
              </motion.div>

              {/* Progress dots */}
              <div className="flex gap-1.5 sm:gap-2 flex-wrap justify-center max-w-md px-4">
                {vowels.map((vowel, index) => (
                  <motion.button
                    key={vowel.letter}
                    onClick={() => {
                      setCurrentIndex(index);
                      handleLetterTap(vowel, index);
                    }}
                    className={`
                      w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full cursor-pointer transition-all
                      ${index === currentIndex ? 'bg-[#FF6B6B] scale-125' : 'bg-gray-200'}
                    `}
                    whileHover={{ scale: 1.5 }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Selected Letter Detail (Grid Mode) */}
      <AnimatePresence>
        {selectedLetter && viewMode === 'grid' && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl p-4 sm:p-6 z-50"
          >
            <div className="max-w-md mx-auto">
              <div className="flex items-center gap-3 sm:gap-4">
                <img
                  src={selectedLetter.exampleImage}
                  alt={selectedLetter.example}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover shadow-lg"
                  onError={(e) => { e.target.src = 'https://placehold.co/200x200/FFD93D/2D3436?text=?' }}
                />
                <div className="flex-1 min-w-0">
                  <span 
                    className="text-3xl sm:text-4xl text-[#FF6B6B]"
                    style={{ fontFamily }}
                  >
                    {selectedLetter.letter}
                  </span>
                  <span 
                    className="text-xl sm:text-2xl text-[#2D3436] ml-2 sm:ml-3"
                    style={{ fontFamily }}
                  >
                    {selectedLetter.example}
                  </span>
                  <p className="text-gray-500 font-nunito text-xs sm:text-sm truncate">
                    {selectedLetter.exampleMeaning}
                  </p>
                </div>
                <motion.button
                  data-testid="speak-example-grid"
                  onClick={speakExample}
                  className="min-h-[50px] min-w-[50px] sm:min-h-[60px] sm:min-w-[60px] rounded-2xl bg-[#4D96FF] shadow-lg flex items-center justify-center cursor-pointer flex-shrink-0"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Volume2 className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LettersPage;
