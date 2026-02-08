import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { WORD_CATEGORIES } from '../data/languageData';
import { WordCard } from '../components/WordCard';
import { useSpeech } from '../hooks/useSpeech';
import { useProgress } from '../hooks/useProgress';

const WordsPage = () => {
  const navigate = useNavigate();
  const { speak } = useSpeech();
  const { recordWordTapped } = useProgress();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleWordTap = (word) => {
    speak(word.telugu);
    recordWordTapped(word.telugu);
  };

  const categories = Object.entries(WORD_CATEGORIES).map(([key, value]) => ({
    id: key,
    ...value
  }));

  return (
    <div className="min-h-screen bg-[#FFFDF5]">
      {/* Header */}
      <header className="sticky top-0 z-40 px-4 py-4 bg-[#FFFDF5]/90 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <motion.button
            data-testid="back-button"
            onClick={() => selectedCategory ? setSelectedCategory(null) : navigate('/')}
            className="min-h-[56px] min-w-[56px] rounded-2xl bg-white shadow-lg flex items-center justify-center cursor-pointer border-b-4 border-gray-100 active:border-b-0 active:translate-y-1"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {selectedCategory ? (
              <ArrowLeft className="w-7 h-7 text-[#FFD93D]" />
            ) : (
              <Home className="w-7 h-7 text-[#FFD93D]" />
            )}
          </motion.button>

          <h1 
            className="font-black text-2xl md:text-3xl text-[#FFD93D]"
            style={{ fontFamily: 'Ramabhadra, sans-serif' }}
          >
            {selectedCategory ? WORD_CATEGORIES[selectedCategory].name : 'పదాలు'}
          </h1>

          <div className="w-[56px]" /> {/* Spacer for alignment */}
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-8 max-w-5xl mx-auto">
        <AnimatePresence mode="wait">
          {!selectedCategory ? (
            // Category Selection
            <motion.div
              key="categories"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {categories.map((category, index) => (
                <motion.button
                  key={category.id}
                  data-testid={`category-${category.id}`}
                  onClick={() => setSelectedCategory(category.id)}
                  className="relative overflow-hidden rounded-3xl shadow-xl cursor-pointer min-h-[200px] md:min-h-[280px]"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {/* Background Image */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundColor: category.color }}
                  >
                    <img
                      src={category.image}
                      alt={category.englishName}
                      className="w-full h-full object-cover opacity-60"
                      onError={(e) => { e.target.style.display = 'none' }}
                    />
                  </div>
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  
                  {/* Content */}
                  <div className="relative h-full flex flex-col items-center justify-center text-white p-6">
                    <span className="text-6xl mb-4">{category.icon}</span>
                    <h2 
                      className="text-3xl md:text-4xl font-black"
                      style={{ fontFamily: 'Ramabhadra, sans-serif' }}
                    >
                      {category.name}
                    </h2>
                    <p className="text-lg opacity-90 font-nunito">
                      {category.englishName}
                    </p>
                    <p className="text-sm opacity-70 mt-2 font-nunito">
                      {category.words.length} words
                    </p>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          ) : (
            // Words Grid
            <motion.div
              key="words"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
            >
              {WORD_CATEGORIES[selectedCategory].words.map((word, index) => (
                <motion.div
                  key={word.telugu}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <WordCard
                    word={word}
                    onTap={handleWordTap}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Category indicator pills (when in words view) */}
      {selectedCategory && (
        <div className="fixed bottom-4 left-0 right-0 flex justify-center gap-2 z-30">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              data-testid={`switch-${category.id}`}
              onClick={() => setSelectedCategory(category.id)}
              className={`
                px-4 py-2 rounded-full font-nunito font-bold text-sm shadow-lg cursor-pointer
                transition-all
                ${selectedCategory === category.id 
                  ? 'bg-white text-[#2D3436] scale-110' 
                  : 'bg-white/70 text-[#2D3436]/70'}
              `}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.icon} {category.englishName}
            </motion.button>
          ))}
        </div>
      )}
    </div>
  );
};

export default WordsPage;
