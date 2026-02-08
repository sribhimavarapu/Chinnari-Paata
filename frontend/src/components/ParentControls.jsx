import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, BarChart3, RefreshCw, Lock } from 'lucide-react';
import { Button } from './ui/button';
import { Slider } from './ui/slider';

export const ParentControls = ({ isOpen, onClose, stats, onSetDailyLimit, onReset }) => {
  const [dailyLimit, setDailyLimit] = useState(stats?.dailyLimit || 30);
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  const handleSaveLimit = () => {
    onSetDailyLimit(dailyLimit);
  };

  const handleReset = () => {
    onReset();
    setShowConfirmReset(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl border-4 border-gray-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gray-100">
                  <Lock className="w-6 h-6 text-gray-600" />
                </div>
                <h2 className="font-nunito font-black text-xl text-[#2D3436]">
                  Parent Controls
                </h2>
              </div>
              <button
                data-testid="close-parent-controls"
                onClick={onClose}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            {/* Progress Stats */}
            <div className="mb-6 p-4 bg-[#FFFDF5] rounded-2xl">
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="w-5 h-5 text-[#4D96FF]" />
                <span className="font-nunito font-bold text-[#2D3436]">Learning Progress</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-3 text-center">
                  <div className="text-3xl font-black text-[#FF6B6B]">{stats?.uniqueLetters || 0}</div>
                  <div className="text-sm text-gray-500">Letters Heard</div>
                </div>
                <div className="bg-white rounded-xl p-3 text-center">
                  <div className="text-3xl font-black text-[#FFD93D]">{stats?.uniqueWords || 0}</div>
                  <div className="text-sm text-gray-500">Words Learned</div>
                </div>
                <div className="bg-white rounded-xl p-3 text-center">
                  <div className="text-3xl font-black text-[#4D96FF]">{stats?.rhymesWatched || 0}</div>
                  <div className="text-sm text-gray-500">Rhymes Watched</div>
                </div>
                <div className="bg-white rounded-xl p-3 text-center">
                  <div className="text-3xl font-black text-[#6BCB77]">{stats?.stickersEarned || 0}</div>
                  <div className="text-sm text-gray-500">Stickers Earned</div>
                </div>
              </div>
            </div>

            {/* Daily Limit Setting */}
            <div className="mb-6 p-4 bg-[#FFFDF5] rounded-2xl">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-[#FF6B6B]" />
                <span className="font-nunito font-bold text-[#2D3436]">Daily Time Limit</span>
              </div>
              <div className="mb-4">
                <Slider
                  data-testid="daily-limit-slider"
                  value={[dailyLimit]}
                  onValueChange={(value) => setDailyLimit(value[0])}
                  max={120}
                  min={10}
                  step={5}
                  className="w-full"
                />
                <div className="flex justify-between mt-2 text-sm text-gray-500">
                  <span>10 min</span>
                  <span className="font-bold text-[#2D3436]">{dailyLimit} minutes</span>
                  <span>2 hours</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Today's usage: {stats?.dailyUsage || 0} min</span>
                <Button 
                  data-testid="save-limit-btn"
                  onClick={handleSaveLimit}
                  className="bg-[#4D96FF] hover:bg-[#4D96FF]/90 text-white"
                >
                  Save Limit
                </Button>
              </div>
            </div>

            {/* Reset Progress */}
            <div className="p-4 bg-red-50 rounded-2xl">
              <div className="flex items-center gap-2 mb-3">
                <RefreshCw className="w-5 h-5 text-red-500" />
                <span className="font-nunito font-bold text-red-700">Reset Progress</span>
              </div>
              {!showConfirmReset ? (
                <Button
                  data-testid="reset-progress-btn"
                  onClick={() => setShowConfirmReset(true)}
                  variant="outline"
                  className="w-full border-red-300 text-red-600 hover:bg-red-100"
                >
                  Reset All Progress
                </Button>
              ) : (
                <div className="space-y-2">
                  <p className="text-sm text-red-600">Are you sure? This cannot be undone.</p>
                  <div className="flex gap-2">
                    <Button
                      data-testid="confirm-reset-btn"
                      onClick={handleReset}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white"
                    >
                      Yes, Reset
                    </Button>
                    <Button
                      data-testid="cancel-reset-btn"
                      onClick={() => setShowConfirmReset(false)}
                      variant="outline"
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ParentControls;
