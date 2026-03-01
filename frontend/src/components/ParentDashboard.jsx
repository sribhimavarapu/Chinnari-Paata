import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, BarChart3, RefreshCw, Lock, Award, Palette, Zap } from 'lucide-react';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { STICKERS, THEMES } from '../data';

export const ParentDashboard = ({ isOpen, onClose, stats, onSetDailyLimit, onReset, onSetTheme }) => {
  const [dailyLimit, setDailyLimit] = useState(stats?.dailyLimit || 30);
  const [showConfirmReset, setShowConfirmReset] = useState(false);
  const [activeTab, setActiveTab] = useState('progress'); // 'progress' | 'rewards' | 'settings'

  const handleSaveLimit = () => {
    onSetDailyLimit(dailyLimit);
  };

  const handleReset = () => {
    onReset();
    setShowConfirmReset(false);
  };

  const formatTime = (minutes) => {
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-white rounded-3xl max-w-lg w-full shadow-2xl max-h-[90vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-gray-100">
                    <Lock className="w-6 h-6 text-gray-600" />
                  </div>
                  <h2 className="font-nunito font-black text-xl text-[#2D3436]">
                    Parent Dashboard
                  </h2>
                </div>
                <button
                  data-testid="close-parent-dashboard"
                  onClick={onClose}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex gap-2 mt-4">
                {[
                  { id: 'progress', label: 'Progress', icon: BarChart3 },
                  { id: 'rewards', label: 'Rewards', icon: Award },
                  { id: 'settings', label: 'Settings', icon: Clock }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      flex-1 py-2 px-3 rounded-xl font-nunito font-bold text-sm flex items-center justify-center gap-2
                      transition-colors
                      ${activeTab === tab.id ? 'bg-[#4D96FF] text-white' : 'bg-gray-100 text-gray-600'}
                    `}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto flex-1">
              {activeTab === 'progress' && (
                <div className="space-y-6">
                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-[#FF6B6B]/10 rounded-2xl p-4 text-center">
                      <div className="text-3xl font-black text-[#FF6B6B]">{stats?.lettersTapped || 0}</div>
                      <div className="text-sm text-gray-600 font-nunito">Letters Tapped</div>
                    </div>
                    <div className="bg-[#FFD93D]/10 rounded-2xl p-4 text-center">
                      <div className="text-3xl font-black text-[#FFD93D]">{stats?.wordsExplored || 0}</div>
                      <div className="text-sm text-gray-600 font-nunito">Words Explored</div>
                    </div>
                    <div className="bg-[#4D96FF]/10 rounded-2xl p-4 text-center">
                      <div className="text-3xl font-black text-[#4D96FF]">{stats?.rhymesPlayed || 0}</div>
                      <div className="text-sm text-gray-600 font-nunito">Rhymes Played</div>
                    </div>
                    <div className="bg-[#6BCB77]/10 rounded-2xl p-4 text-center">
                      <div className="text-3xl font-black text-[#6BCB77]">{stats?.totalInteractions || 0}</div>
                      <div className="text-sm text-gray-600 font-nunito">Total Interactions</div>
                    </div>
                  </div>

                  {/* Time Stats */}
                  <div className="bg-gray-50 rounded-2xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Clock className="w-5 h-5 text-gray-500" />
                      <span className="font-nunito font-bold text-gray-700">Time Tracking</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-gray-500">Today</div>
                        <div className="text-xl font-bold text-[#2D3436]">{formatTime(stats?.dailyUsage || 0)}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Total</div>
                        <div className="text-xl font-bold text-[#2D3436]">{formatTime(Math.floor((stats?.totalTimeSpent || 0) / 60))}</div>
                      </div>
                    </div>
                  </div>

                  {/* Progress Bars */}
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600 font-nunito">Letters Progress</span>
                        <span className="font-bold text-[#FF6B6B]">{stats?.lettersProgress || 0}%</span>
                      </div>
                      <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#FF6B6B] rounded-full transition-all"
                          style={{ width: `${stats?.lettersProgress || 0}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600 font-nunito">Words Progress</span>
                        <span className="font-bold text-[#FFD93D]">{stats?.wordsProgress || 0}%</span>
                      </div>
                      <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#FFD93D] rounded-full transition-all"
                          style={{ width: `${stats?.wordsProgress || 0}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Streak */}
                  {stats?.currentStreak > 0 && (
                    <div className="bg-gradient-to-r from-[#FF6B6B] to-[#FFD93D] rounded-2xl p-4 text-white">
                      <div className="flex items-center gap-2">
                        <Zap className="w-6 h-6" />
                        <span className="font-nunito font-bold">{stats.currentStreak} Day Streak!</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'rewards' && (
                <div className="space-y-6">
                  {/* Stickers */}
                  <div>
                    <h3 className="font-nunito font-bold text-gray-700 mb-3 flex items-center gap-2">
                      <Award className="w-5 h-5 text-[#FFD93D]" />
                      Stickers ({stats?.stickersEarned || 0}/10)
                    </h3>
                    <div className="grid grid-cols-5 gap-2">
                      {STICKERS.map((sticker) => {
                        const isEarned = (stats?.totalInteractions || 0) >= sticker.unlockAt;
                        return (
                          <div
                            key={sticker.id}
                            className={`
                              aspect-square rounded-xl flex flex-col items-center justify-center text-2xl
                              ${isEarned ? 'bg-[#FFD93D]/20' : 'bg-gray-100 grayscale opacity-40'}
                            `}
                            title={isEarned ? sticker.name : `Unlock at ${sticker.unlockAt} interactions`}
                          >
                            {sticker.emoji}
                          </div>
                        );
                      })}
                    </div>
                    {stats?.nextStickerAt && (
                      <p className="text-sm text-gray-500 mt-2 text-center font-nunito">
                        Next sticker at {stats.nextStickerAt} interactions
                      </p>
                    )}
                  </div>

                  {/* Themes */}
                  <div>
                    <h3 className="font-nunito font-bold text-gray-700 mb-3 flex items-center gap-2">
                      <Palette className="w-5 h-5 text-[#9B59B6]" />
                      Themes ({stats?.themesUnlocked || 1}/4)
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {THEMES.map((theme) => {
                        const isUnlocked = (stats?.totalInteractions || 0) >= theme.unlockAt;
                        const isActive = stats?.currentTheme === theme.id;
                        return (
                          <button
                            key={theme.id}
                            onClick={() => isUnlocked && onSetTheme && onSetTheme(theme.id)}
                            disabled={!isUnlocked}
                            className={`
                              p-3 rounded-xl border-2 transition-all text-left
                              ${isActive ? 'border-[#4D96FF] ring-2 ring-[#4D96FF]/30' : 'border-gray-200'}
                              ${!isUnlocked ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer hover:border-[#4D96FF]/50'}
                            `}
                          >
                            <div className="flex gap-1 mb-2">
                              {Object.values(theme.colors).slice(0, 3).map((color, i) => (
                                <div 
                                  key={i}
                                  className="w-4 h-4 rounded-full"
                                  style={{ backgroundColor: color }}
                                />
                              ))}
                            </div>
                            <div className="font-nunito font-bold text-sm text-[#2D3436]">{theme.name}</div>
                            {!isUnlocked && (
                              <div className="text-xs text-gray-400">Unlock at {theme.unlockAt}</div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="space-y-6">
                  {/* Daily Limit */}
                  <div className="bg-[#FFFDF5] rounded-2xl p-4">
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
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        Today: {stats?.dailyUsage || 0} / {stats?.dailyLimit || 30} min
                      </span>
                      <Button 
                        data-testid="save-limit-btn"
                        onClick={handleSaveLimit}
                        className="bg-[#4D96FF] hover:bg-[#4D96FF]/90 text-white"
                        size="sm"
                      >
                        Save
                      </Button>
                    </div>
                  </div>

                  {/* Reset Progress */}
                  <div className="bg-red-50 rounded-2xl p-4">
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
                        <p className="text-sm text-red-600">This will reset all progress. Are you sure?</p>
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
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ParentDashboard;
