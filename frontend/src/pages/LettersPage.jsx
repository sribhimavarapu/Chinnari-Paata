import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Volume2, VolumeX, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { TELUGU_VOWELS } from '../data/languageData';
import { useSpeech } from '../hooks/useSpeech';
import { useProgress } from '../hooks/useProgress';
import { Button } from '../components/ui/button';

const LettersPage = () => {
  const navigate = useNavigate();
  const { speak } = useSpeech();
  const { recordLetterHeard } = useProgress();
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [slowMode, setSlowMode] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'single'

  // Load voices on mount
  useEffect(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.getVoices();
    }
  }, []);

  const handleLetterTap = (vowel, index) => {
    setSelectedLetter(vowel);
    setCurrentIndex(index);
    setIsPlaying(true);
    
    // Speak the letter
    speak(vowel.letter, { slow: slowMode });
    
    // Record progress
    recordLetterHeard(vowel.letter);
    
    // Reset playing state after animation
    setTimeout(() => setIsPlaying(false), 1500);
  };

  const handlePrevious = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : TELUGU_VOWELS.length - 1;
    setCurrentIndex(newIndex);
    handleLetterTap(TELUGU_VOWELS[newIndex], newIndex);
  };

  const handleNext = () => {
    const newIndex = currentIndex < TELUGU_VOWELS.length - 1 ? currentIndex + 1 : 0;
    setCurrentIndex(newIndex);
    handleLetterTap(TELUGU_VOWELS[newIndex], newIndex);
  };

  const speakExample = () => {
    if (selectedLetter) {
      speak(selectedLetter.example, { slow: slowMode });
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF5]">
      {/* Header */}
      <header className="sticky top-0 z-40 px-4 py-4 bg-[#FFFDF5]/90 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <motion.button
            data-testid="back-to-home"
            onClick={() => navigate('/')}
            className="min-h-[56px] min-w-[56px] rounded-2xl bg-white shadow-lg flex items-center justify-center cursor-pointer border-b-4 border-gray-100 active:border-b-0 active:translate-y-1"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Home className="w-7 h-7 text-[#FF6B6B]" />
          </motion.button>

          <h1 
            className="font-black text-2xl md:text-3xl text-[#FF6B6B]"
            style={{ fontFamily: 'Ramabhadra, sans-serif' }}
          >
            అక్షరాలు
          </h1>

          <div className="flex items-center gap-2">
            <motion.button
              data-testid="toggle-speed"
              onClick={() => setSlowMode(!slowMode)}
              className={`
                min-h-[56px] px-4 rounded-2xl shadow-lg flex items-center gap-2 cursor-pointer 
                border-b-4 border-gray-100 active:border-b-0 active:translate-y-1
                ${slowMode ? 'bg-[#6BCB77] text-white' : 'bg-white text-gray-600'}
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {slowMode ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              <span className="font-nunito font-bold text-sm hidden md:inline">
                {slowMode ? 'Slow' : 'Normal'}
              </span>
            </motion.button>
          </div>
        </div>
      </header>

      {/* View Mode Toggle */}
      <div className="px-4 py-4 max-w-5xl mx-auto flex justify-center gap-2">
        <Button
          data-testid="grid-view-btn"
          onClick={() => setViewMode('grid')}
          variant={viewMode === 'grid' ? 'default' : 'outline'}
          className={viewMode === 'grid' ? 'bg-[#FF6B6B] hover:bg-[#FF6B6B]/90' : ''}
        >
          Grid View
        </Button>
        <Button
          data-testid="single-view-btn"
          onClick={() => setViewMode('single')}
          variant={viewMode === 'single' ? 'default' : 'outline'}
          className={viewMode === 'single' ? 'bg-[#FF6B6B] hover:bg-[#FF6B6B]/90' : ''}
        >
          Single View
        </Button>
      </div>

      {/* Main Content */}
      <main className="px-4 py-4 max-w-5xl mx-auto">
        <AnimatePresence mode="wait">
          {viewMode === 'grid' ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-3 md:grid-cols-5 gap-4 md:gap-6"
            >
              {TELUGU_VOWELS.map((vowel, index) => (
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
                    ${selectedLetter?.letter === vowel.letter && isPlaying ? 'bg-[#FFD93D]/30 border-[#FFD93D]' : ''}
                  `}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <span 
                    className="text-5xl md:text-6xl text-[#FF6B6B] select-none"
                    style={{ fontFamily: 'Ramabhadra, sans-serif' }}
                  >
                    {vowel.letter}
                  </span>
                  <span className="text-xs text-gray-400 mt-1 font-nunito">
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
              className="flex flex-col items-center gap-8"
            >
              {/* Navigation arrows and letter */}
              <div className="flex items-center gap-4 md:gap-8 w-full justify-center">
                <motion.button
                  data-testid="prev-letter"
                  onClick={handlePrevious}
                  className="min-h-[80px] min-w-[80px] rounded-full bg-white shadow-xl flex items-center justify-center cursor-pointer border-b-8 border-gray-100 active:border-b-0 active:translate-y-2"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronLeft className="w-10 h-10 text-[#FF6B6B]" />
                </motion.button>

                <motion.div
                  key={selectedLetter?.letter || TELUGU_VOWELS[currentIndex].letter}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  className={`
                    w-48 h-48 md:w-64 md:h-64 rounded-3xl bg-white shadow-2xl 
                    flex flex-col items-center justify-center 
                    border-b-8 border-[#FF6B6B]/20
                    cursor-pointer
                    ${isPlaying ? 'bg-[#FFD93D]/20' : ''}
                  `}
                  onClick={() => handleLetterTap(TELUGU_VOWELS[currentIndex], currentIndex)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.span 
                    className="text-8xl md:text-9xl text-[#FF6B6B] select-none"
                    style={{ fontFamily: 'Ramabhadra, sans-serif' }}
                    animate={isPlaying ? { scale: [1, 1.2, 1] } : {}}
                  >
                    {selectedLetter?.letter || TELUGU_VOWELS[currentIndex].letter}
                  </motion.span>
                  <span className="text-lg text-gray-400 mt-2 font-nunito font-bold">
                    {selectedLetter?.transliteration || TELUGU_VOWELS[currentIndex].transliteration}
                  </span>
                </motion.div>

                <motion.button
                  data-testid="next-letter"
                  onClick={handleNext}
                  className="min-h-[80px] min-w-[80px] rounded-full bg-white shadow-xl flex items-center justify-center cursor-pointer border-b-8 border-gray-100 active:border-b-0 active:translate-y-2"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronRight className="w-10 h-10 text-[#FF6B6B]" />
                </motion.button>
              </div>

              {/* Example Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-3xl shadow-xl p-6 w-full max-w-md"
              >
                <h3 className="font-nunito font-bold text-gray-500 mb-4 text-center">Example Word</h3>
                <div className="flex items-center gap-4">
                  <img
                    src={(selectedLetter || TELUGU_VOWELS[currentIndex]).exampleImage}
                    alt={(selectedLetter || TELUGU_VOWELS[currentIndex]).example}
                    className="w-24 h-24 rounded-2xl object-cover shadow-lg"
                    onError={(e) => { e.target.src = 'https://placehold.co/200x200/FFD93D/2D3436?text=?' }}
                  />
                  <div className="flex-1">
                    <span 
                      className="text-3xl text-[#2D3436] block"
                      style={{ fontFamily: 'Ramabhadra, sans-serif' }}
                    >
                      {(selectedLetter || TELUGU_VOWELS[currentIndex]).example}
                    </span>
                    <span className="text-gray-500 font-nunito">
                      {(selectedLetter || TELUGU_VOWELS[currentIndex]).exampleMeaning}
                    </span>
                  </div>
                  <motion.button
                    data-testid="speak-example"
                    onClick={speakExample}
                    className="min-h-[60px] min-w-[60px] rounded-2xl bg-[#4D96FF] shadow-lg flex items-center justify-center cursor-pointer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Volume2 className="w-7 h-7 text-white" />
                  </motion.button>
                </div>
              </motion.div>

              {/* Progress dots */}
              <div className="flex gap-2 flex-wrap justify-center max-w-md">
                {TELUGU_VOWELS.map((vowel, index) => (
                  <motion.button
                    key={vowel.letter}
                    onClick={() => {
                      setCurrentIndex(index);
                      handleLetterTap(vowel, index);
                    }}
                    className={`
                      w-3 h-3 rounded-full cursor-pointer transition-all
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
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl p-6 z-50"
          >
            <div className="max-w-md mx-auto">
              <div className="flex items-center gap-4">
                <img
                  src={selectedLetter.exampleImage}
                  alt={selectedLetter.example}
                  className="w-20 h-20 rounded-2xl object-cover shadow-lg"
                  onError={(e) => { e.target.src = 'https://placehold.co/200x200/FFD93D/2D3436?text=?' }}
                />
                <div className="flex-1">
                  <span 
                    className="text-4xl text-[#FF6B6B]"
                    style={{ fontFamily: 'Ramabhadra, sans-serif' }}
                  >
                    {selectedLetter.letter}
                  </span>
                  <span 
                    className="text-2xl text-[#2D3436] ml-3"
                    style={{ fontFamily: 'Ramabhadra, sans-serif' }}
                  >
                    {selectedLetter.example}
                  </span>
                  <p className="text-gray-500 font-nunito text-sm">
                    {selectedLetter.exampleMeaning}
                  </p>
                </div>
                <motion.button
                  data-testid="speak-example-grid"
                  onClick={speakExample}
                  className="min-h-[60px] min-w-[60px] rounded-2xl bg-[#4D96FF] shadow-lg flex items-center justify-center cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Volume2 className="w-7 h-7 text-white" />
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
