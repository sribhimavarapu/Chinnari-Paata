import React, { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, MessageCircle, Music, Settings, Star, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useProgress } from '../hooks/useProgress';
import { STICKERS } from '../data';
import { ParentDashboard } from '../components/ParentDashboard';
import { RewardModal } from '../components/RewardModal';
import { LanguageSwitcher } from '../components/LanguageSwitcher';

const HomePage = () => {
  const navigate = useNavigate();
  const { strings, fontFamily, languageConfig } = useLanguage();
  const { progress, newReward, clearNewReward, getStats, setDailyLimit, resetProgress, setCurrentTheme } = useProgress();
  
  const [showParentDashboard, setShowParentDashboard] = useState(false);
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [showLanguageSwitcher, setShowLanguageSwitcher] = useState(false);
  
  const longPressTimer = useRef(null);
  const cornerTaps = useRef({ count: 0, timer: null });
  const stats = getStats();

  // Long press for parent dashboard
  const handleSettingsMouseDown = () => {
    longPressTimer.current = setTimeout(() => {
      setShowParentDashboard(true);
    }, 3000);
  };

  const handleSettingsMouseUp = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }
  };

  // 4-corner tap detection (alternative to long press)
  const handleCornerTap = useCallback((corner) => {
    const now = Date.now();
    if (cornerTaps.current.timer) clearTimeout(cornerTaps.current.timer);
    
    cornerTaps.current.count++;
    
    if (cornerTaps.current.count >= 4) {
      setShowParentDashboard(true);
      cornerTaps.current.count = 0;
    } else {
      cornerTaps.current.timer = setTimeout(() => {
        cornerTaps.current.count = 0;
      }, 2000);
    }
  }, []);

  // Show reward modal when new reward is earned
  React.useEffect(() => {
    if (newReward) {
      setShowRewardModal(true);
    }
  }, [newReward]);

  const sections = [
    {
      id: 'letters',
      title: strings.letters,
      subtitle: strings.lettersEnglish,
      icon: BookOpen,
      color: 'bg-[#FF6B6B]',
      path: '/letters',
      description: strings.lettersDescription
    },
    {
      id: 'words',
      title: strings.words,
      subtitle: strings.wordsEnglish,
      icon: MessageCircle,
      color: 'bg-[#FFD93D]',
      textColor: 'text-[#2D3436]',
      path: '/words',
      description: strings.wordsDescription
    },
    {
      id: 'rhymes',
      title: strings.rhymes,
      subtitle: strings.rhymesEnglish,
      icon: Music,
      color: 'bg-[#4D96FF]',
      path: '/rhymes',
      description: strings.rhymesDescription
    }
  ];

  return (
    <div className="min-h-screen bg-[#FFFDF5] overflow-hidden">
      {/* Corner tap zones for parent access */}
      <div 
        className="fixed top-0 left-0 w-16 h-16 z-50" 
        onClick={() => handleCornerTap('tl')}
      />
      <div 
        className="fixed top-0 right-0 w-16 h-16 z-50" 
        onClick={() => handleCornerTap('tr')}
      />

      {/* Header */}
      <header className="relative px-4 sm:px-6 pt-6 sm:pt-8 pb-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 
              className="font-black text-2xl sm:text-3xl md:text-5xl text-[#2D3436]"
              style={{ fontFamily }}
            >
              {strings.appName}
            </h1>
            <p className="text-[#2D3436]/60 font-nunito text-sm sm:text-lg mt-1">
              {strings.appNameEnglish}
            </p>
          </motion.div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language switcher */}
            <motion.button
              data-testid="language-button"
              onClick={() => setShowLanguageSwitcher(true)}
              className="min-h-[50px] min-w-[50px] sm:min-h-[60px] sm:min-w-[60px] rounded-2xl bg-white shadow-lg flex items-center justify-center cursor-pointer border-b-4 border-gray-100 active:border-b-0 active:translate-y-1"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-[#4D96FF]" />
            </motion.button>

            {/* Stickers button */}
            <motion.button
              data-testid="stickers-button"
              onClick={() => {
                clearNewReward();
                setShowRewardModal(true);
              }}
              className="relative min-h-[50px] min-w-[50px] sm:min-h-[60px] sm:min-w-[60px] rounded-2xl bg-white shadow-lg flex items-center justify-center cursor-pointer border-b-4 border-gray-100 active:border-b-0 active:translate-y-1"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Star className="w-5 h-5 sm:w-7 sm:h-7 text-[#FFD93D]" />
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
              className="min-h-[50px] min-w-[50px] sm:min-h-[60px] sm:min-w-[60px] rounded-2xl bg-white shadow-lg flex items-center justify-center cursor-pointer border-b-4 border-gray-100 active:border-b-0 active:translate-y-1 opacity-40"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="Hold for 3 seconds for parent controls"
            >
              <Settings className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
            </motion.button>
          </div>
        </div>
      </header>

      {/* Main content - Bento Grid */}
      <main className="px-4 sm:px-6 py-6 sm:py-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {sections.map((section, index) => (
              <motion.button
                key={section.id}
                data-testid={`section-${section.id}`}
                onClick={() => navigate(section.path)}
                className={`
                  ${section.color} 
                  rounded-3xl shadow-xl 
                  flex flex-col items-center justify-center 
                  gap-3 sm:gap-4 p-6 sm:p-8 md:p-10
                  min-h-[220px] sm:min-h-[280px] md:min-h-[320px]
                  cursor-pointer
                  border-4 border-white/20 
                  backdrop-blur-sm
                  transition-transform
                  ${section.textColor || 'text-white'}
                `}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
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
                  className="bg-white/20 rounded-full p-4 sm:p-6"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.3,
                    ease: 'easeInOut'
                  }}
                >
                  <section.icon className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16" />
                </motion.div>
                
                <div className="text-center">
                  <h2 
                    className="font-black text-2xl sm:text-3xl md:text-4xl mb-1"
                    style={{ fontFamily }}
                  >
                    {section.title}
                  </h2>
                  <p className="text-base sm:text-lg md:text-xl opacity-90 font-nunito font-bold">
                    {section.subtitle}
                  </p>
                  <p className="text-xs sm:text-sm opacity-70 mt-2 font-nunito">
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
      </div>

      {/* Language Switcher Modal */}
      <LanguageSwitcher
        isOpen={showLanguageSwitcher}
        onClose={() => setShowLanguageSwitcher(false)}
      />

      {/* Parent Dashboard Modal */}
      <ParentDashboard
        isOpen={showParentDashboard}
        onClose={() => setShowParentDashboard(false)}
        stats={stats}
        onSetDailyLimit={setDailyLimit}
        onReset={resetProgress}
        onSetTheme={setCurrentTheme}
      />

      {/* Reward Modal */}
      <RewardModal
        isOpen={showRewardModal}
        onClose={() => {
          setShowRewardModal(false);
          clearNewReward();
        }}
        newSticker={newReward?.type === 'sticker' ? newReward.item : null}
        earnedStickers={progress.stickersEarned}
      />
    </div>
  );
};

export default HomePage;
