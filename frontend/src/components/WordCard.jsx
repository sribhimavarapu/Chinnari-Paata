import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2 } from 'lucide-react';

export const WordCard = ({ word, onTap }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleTap = () => {
    setIsPlaying(true);
    setShowConfetti(true);
    onTap(word);
    
    setTimeout(() => {
      setIsPlaying(false);
      setShowConfetti(false);
    }, 1500);
  };

  return (
    <motion.div
      data-testid={`word-card-${word.english.toLowerCase()}`}
      className="relative cursor-pointer overflow-hidden"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleTap}
    >
      <div 
        className={`
          aspect-square sm:aspect-[4/3] rounded-2xl sm:rounded-3xl bg-white shadow-xl overflow-hidden
          border-4 border-transparent hover:border-[#FFD93D]
          transition-all duration-300 min-h-[140px]
          ${isPlaying ? 'border-[#6BCB77]' : ''}
        `}
        style={word.bgColor ? { backgroundColor: word.bgColor } : {}}
      >
        {/* Image */}
        {!word.bgColor && (
          <img
            src={word.image}
            alt={word.english}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={(e) => { 
              e.target.onerror = null;
              e.target.src = `https://placehold.co/400x300/FFD93D/2D3436?text=${encodeURIComponent(word.english)}`;
            }}
          />
        )}

        {/* Overlay with Telugu word */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-3 sm:p-4 md:p-6">
          <span 
            className="text-2xl sm:text-3xl md:text-4xl text-white font-bold drop-shadow-lg"
            style={{ fontFamily: 'Ramabhadra, sans-serif' }}
          >
            {word.telugu}
          </span>
          <span className="text-white/80 text-sm sm:text-base md:text-lg font-nunito">
            {word.english}
          </span>
        </div>

        {/* Playing indicator */}
        {isPlaying && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-white rounded-full p-2 sm:p-3 shadow-lg"
          >
            <Volume2 className="w-6 h-6 sm:w-8 sm:h-8 text-[#4D96FF] animate-pulse" />
          </motion.div>
        )}

        {/* Confetti effect */}
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 rounded-full"
                style={{
                  backgroundColor: ['#FF6B6B', '#FFD93D', '#4D96FF', '#6BCB77'][i % 4],
                  left: `${50 + (Math.random() - 0.5) * 60}%`,
                  top: '50%'
                }}
                initial={{ y: 0, opacity: 1, scale: 0 }}
                animate={{ 
                  y: -150 - Math.random() * 100,
                  x: (Math.random() - 0.5) * 200,
                  opacity: 0,
                  scale: 1.5,
                  rotate: Math.random() * 360
                }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default WordCard;
