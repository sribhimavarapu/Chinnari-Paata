import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, MessageCircle, Music, Settings, Star } from 'lucide-react';
import { ParentControls } from '../components/ParentControls';
import { RewardModal } from '../components/RewardModal';
import { useProgress } from '../hooks/useProgress';
import { STICKERS } from '../data/languageData';

const HomePage = () => {
  const navigate = useNavigate();
  const { progress, getStats, setDailyLimit, resetProgress, earnSticker } = useProgress();
  const [showParentControls, setShowParentControls] = useState(false);
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [newSticker, setNewSticker] = useState(null);
  const longPressTimer = React.useRef(null);

  const stats = getStats();

  // Check for milestone rewards
  useEffect(() => {
    const totalInteractions = stats.totalInteractions;
    const earnedCount = progress.stickersEarned.length;
    
    // Award stickers at milestones
    const milestones = [5, 15, 30, 50, 75, 100, 150, 200, 300, 500];
    const stickerIndex = milestones.findIndex((m, i) => totalInteractions >= m && i >= earnedCount);
    
    if (stickerIndex !== -1 && stickerIndex < STICKERS.length && !progress.stickersEarned.includes(STICKERS[stickerIndex].id)) {
      const sticker = STICKERS[stickerIndex];
      earnSticker(sticker.id);
      setNewSticker(sticker);
      setShowRewardModal(true);
    }
  }, [stats.totalInteractions, progress.stickersEarned, earnSticker]);

  const handleSettingsMouseDown = () => {
    longPressTimer.current = setTimeout(() => {
      setShowParentControls(true);
    }, 3000);
  };

  const handleSettingsMouseUp = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }
  };

  const sections = [
    {
      id: 'letters',
      title: 'అక్షరాలు',
      subtitle: 'Letters',
      icon: BookOpen,
      color: 'bg-[#FF6B6B]',
      borderColor: 'border-[#FF6B6B]',
      path: '/letters',
      description: 'Learn Telugu vowels'
    },
    {
      id: 'words',
      title: 'పదాలు',
      subtitle: 'Words',
      icon: MessageCircle,
      color: 'bg-[#FFD93D]',
      borderColor: 'border-[#FFD93D]',
      textColor: 'text-[#2D3436]',
      path: '/words',
      description: 'Animals, Fruits & Colors'
    },
    {
      id: 'rhymes',
      title: 'పాటలు',
      subtitle: 'Rhymes',
      icon: Music,
      color: 'bg-[#4D96FF]',
      borderColor: 'border-[#4D96FF]',
      path: '/rhymes',
      description: 'Fun Telugu songs'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FFFDF5] overflow-hidden">
      {/* Header */}
      <header className="relative px-6 pt-8 pb-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 
              className="font-black text-3xl md:text-5xl text-[#2D3436]"
              style={{ fontFamily: 'Nunito, sans-serif' }}
            >
              చిన్నారి పాట
            </h1>
            <p className="text-[#2D3436]/60 font-nunito text-lg mt-1">
              Chinnari Paata
            </p>
          </motion.div>

          <div className="flex items-center gap-3">
            {/* Stickers button */}
            <motion.button
              data-testid="stickers-button"
              onClick={() => {
                setNewSticker(null);
                setShowRewardModal(true);
              }}
              className="relative min-h-[60px] min-w-[60px] rounded-2xl bg-white shadow-lg flex items-center justify-center cursor-pointer border-b-4 border-gray-100 active:border-b-0 active:translate-y-1"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Star className="w-7 h-7 text-[#FFD93D]" />
              {progress.stickersEarned.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#FF6B6B] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {progress.stickersEarned.length}
                </span>
              )}
            </motion.button>

            {/* Settings (hidden parent controls) */}
            <motion.button
              data-testid="settings-button"
              onMouseDown={handleSettingsMouseDown}
              onMouseUp={handleSettingsMouseUp}
              onMouseLeave={handleSettingsMouseUp}
              onTouchStart={handleSettingsMouseDown}
              onTouchEnd={handleSettingsMouseUp}
              className="min-h-[60px] min-w-[60px] rounded-2xl bg-white shadow-lg flex items-center justify-center cursor-pointer border-b-4 border-gray-100 active:border-b-0 active:translate-y-1 opacity-40"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="Hold for 3 seconds for parent controls"
            >
              <Settings className="w-6 h-6 text-gray-400" />
            </motion.button>
          </div>
        </div>
      </header>

      {/* Main content - Bento Grid */}
      <main className="px-6 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {sections.map((section, index) => (
              <motion.button
                key={section.id}
                data-testid={`section-${section.id}`}
                onClick={() => navigate(section.path)}
                className={`
                  ${section.color} 
                  rounded-3xl shadow-xl 
                  flex flex-col items-center justify-center 
                  gap-4 p-8 md:p-10
                  min-h-[280px] md:min-h-[320px]
                  cursor-pointer
                  border-4 border-white/20 
                  backdrop-blur-sm
                  transition-transform
                  ${section.textColor || 'text-white'}
                `}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                }}
                transition={{ 
                  delay: index * 0.15,
                  type: 'spring',
                  stiffness: 200,
                  damping: 20
                }}
                whileHover={{ 
                  scale: 1.05,
                  y: -8,
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="bg-white/20 rounded-full p-6"
                  animate={{ 
                    y: [0, -8, 0],
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.3,
                    ease: 'easeInOut'
                  }}
                >
                  <section.icon className="w-12 h-12 md:w-16 md:h-16" />
                </motion.div>
                
                <div className="text-center">
                  <h2 
                    className="font-black text-3xl md:text-4xl mb-1"
                    style={{ fontFamily: 'Ramabhadra, sans-serif' }}
                  >
                    {section.title}
                  </h2>
                  <p className="text-lg md:text-xl opacity-90 font-nunito font-bold">
                    {section.subtitle}
                  </p>
                  <p className="text-sm opacity-70 mt-2 font-nunito">
                    {section.description}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </main>

      {/* Decorative elements */}
      <div className="fixed bottom-0 left-0 right-0 h-32 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-[#FF6B6B]/10"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-20 right-10 w-60 h-60 rounded-full bg-[#4D96FF]/10"
          animate={{ scale: [1.2, 1, 1.2] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-5 left-1/3 w-32 h-32 rounded-full bg-[#FFD93D]/10"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </div>

      {/* Parent Controls Modal */}
      <ParentControls
        isOpen={showParentControls}
        onClose={() => setShowParentControls(false)}
        stats={stats}
        onSetDailyLimit={setDailyLimit}
        onReset={resetProgress}
      />

      {/* Reward Modal */}
      <RewardModal
        isOpen={showRewardModal}
        onClose={() => setShowRewardModal(false)}
        newSticker={newSticker}
        earnedStickers={progress.stickersEarned}
      />
    </div>
  );
};

export default HomePage;
