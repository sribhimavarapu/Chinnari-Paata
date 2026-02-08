import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Settings } from 'lucide-react';

export const Navigation = ({ onSettingsLongPress }) => {
  const navigate = useNavigate();
  const longPressTimer = React.useRef(null);

  const handleSettingsMouseDown = () => {
    longPressTimer.current = setTimeout(() => {
      if (onSettingsLongPress) {
        onSettingsLongPress();
      }
    }, 3000); // 3 second long press for parent controls
  };

  const handleSettingsMouseUp = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-3 flex justify-between items-center bg-[#FFFDF5]/80 backdrop-blur-sm">
      <motion.button
        data-testid="home-nav-button"
        onClick={() => navigate('/')}
        className="min-h-[60px] min-w-[60px] rounded-2xl bg-white shadow-lg flex items-center justify-center cursor-pointer border-b-4 border-gray-100 active:border-b-0 active:translate-y-1"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Home className="w-8 h-8 text-[#FF6B6B]" />
      </motion.button>

      <div className="flex items-center gap-2">
        <span className="font-nunito font-black text-xl md:text-2xl text-[#2D3436]">
          చిన్నారి పాట
        </span>
      </div>

      <motion.button
        data-testid="settings-button"
        onMouseDown={handleSettingsMouseDown}
        onMouseUp={handleSettingsMouseUp}
        onMouseLeave={handleSettingsMouseUp}
        onTouchStart={handleSettingsMouseDown}
        onTouchEnd={handleSettingsMouseUp}
        className="min-h-[60px] min-w-[60px] rounded-2xl bg-white shadow-lg flex items-center justify-center cursor-pointer border-b-4 border-gray-100 active:border-b-0 active:translate-y-1 opacity-50"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title="Hold for 3 seconds for parent controls"
      >
        <Settings className="w-6 h-6 text-gray-400" />
      </motion.button>
    </nav>
  );
};

export default Navigation;
