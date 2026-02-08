import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2 } from 'lucide-react';

export const LetterTile = ({ 
  letter, 
  example, 
  exampleImage, 
  onTap, 
  isExpanded,
  onExpand 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleTap = () => {
    setIsPlaying(true);
    onTap();
    setTimeout(() => setIsPlaying(false), 1000);
    if (onExpand) onExpand();
  };

  return (
    <motion.div
      data-testid={`letter-tile-${letter}`}
      className="relative cursor-pointer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleTap}
      layout
    >
      <motion.div
        className={`
          aspect-square rounded-3xl bg-white shadow-xl 
          flex flex-col items-center justify-center 
          border-b-8 border-gray-100 
          active:border-b-0 active:translate-y-2
          transition-colors duration-200
          ${isPlaying ? 'bg-[#FFD93D]/20' : ''}
          ${isExpanded ? 'col-span-2 row-span-2' : ''}
        `}
        animate={isPlaying ? { 
          scale: [1, 1.1, 1],
          rotate: [0, -5, 5, 0] 
        } : {}}
        transition={{ duration: 0.5 }}
      >
        <span 
          className="font-telugu text-5xl md:text-7xl text-[#FF6B6B] select-none"
          style={{ fontFamily: 'Ramabhadra, sans-serif' }}
        >
          {letter}
        </span>
        
        <AnimatePresence>
          {isPlaying && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute top-2 right-2"
            >
              <Volume2 className="w-6 h-6 text-[#4D96FF] animate-pulse" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Expanded view with example */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute -bottom-24 left-0 right-0 bg-white rounded-2xl shadow-lg p-3 z-10"
          >
            <div className="flex items-center gap-3">
              <img 
                src={exampleImage} 
                alt={example}
                className="w-16 h-16 rounded-xl object-cover"
                onError={(e) => { e.target.src = 'https://placehold.co/100x100/FFD93D/2D3436?text=?' }}
              />
              <span 
                className="font-telugu text-2xl text-[#2D3436]"
                style={{ fontFamily: 'Ramabhadra, sans-serif' }}
              >
                {example}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default LetterTile;
