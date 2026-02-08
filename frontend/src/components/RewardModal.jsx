import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star } from 'lucide-react';
import { STICKERS } from '../data/languageData';

export const RewardModal = ({ isOpen, onClose, newSticker, earnedStickers = [] }) => {
  if (!isOpen) return null;
  
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
            initial={{ scale: 0.5, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.5, opacity: 0, y: 50 }}
            transition={{ type: 'spring', damping: 15 }}
            className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl border-4 border-[#FFD93D] relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              data-testid="close-reward-modal"
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>

            {/* New sticker celebration */}
            {newSticker && (
              <div className="text-center mb-6">
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, -10, 10, 0]
                  }}
                  transition={{ 
                    duration: 0.5,
                    repeat: 2,
                    repeatType: 'reverse'
                  }}
                  className="text-8xl mb-4"
                >
                  {newSticker.emoji}
                </motion.div>
                <h2 
                  className="font-nunito font-black text-2xl md:text-3xl text-[#2D3436] mb-2"
                >
                  బాగుంది! 
                </h2>
                <p className="text-[#2D3436]/70 font-nunito text-lg">
                  You earned a {newSticker.name}!
                </p>
              </div>
            )}

            {/* Sticker collection */}
            <div className="mt-6">
              <h3 className="font-nunito font-bold text-lg text-[#2D3436] mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-[#FFD93D]" />
                Your Stickers
              </h3>
              <div className="grid grid-cols-5 gap-3">
                {STICKERS.map((sticker) => {
                  const isEarned = earnedStickers.includes(sticker.id);
                  return (
                    <motion.div
                      key={sticker.id}
                      data-testid={`sticker-${sticker.id}`}
                      className={`
                        aspect-square rounded-2xl flex items-center justify-center text-3xl
                        ${isEarned ? 'bg-[#FFD93D]/20' : 'bg-gray-100'}
                        ${isEarned ? '' : 'grayscale opacity-30'}
                      `}
                      whileHover={isEarned ? { scale: 1.1 } : {}}
                    >
                      {sticker.emoji}
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Stars animation */}
            {newSticker && (
              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-2xl"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                      rotate: Math.random() * 360
                    }}
                    transition={{ 
                      duration: 2,
                      delay: Math.random() * 0.5,
                      repeat: Infinity,
                      repeatDelay: Math.random() * 2
                    }}
                  >
                    ✨
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RewardModal;
