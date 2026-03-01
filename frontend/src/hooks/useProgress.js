import { useState, useEffect, useCallback, useRef } from 'react';
import { STICKERS, THEMES, MILESTONES } from '../data';

const STORAGE_KEY = 'chinnari_paata_progress';
const SESSION_KEY = 'chinnari_paata_session';

const getDefaultProgress = () => ({
  // Interaction tracking
  lettersHeard: [],
  lettersTappedCount: 0,
  wordsTapped: [],
  wordsExploredCount: 0,
  rhymesWatched: [],
  rhymesPlayedCount: 0,
  
  // Gamification
  totalInteractions: 0,
  stickersEarned: [],
  themesUnlocked: ['default'],
  currentTheme: 'default',
  
  // Time tracking
  totalTimeSpent: 0, // in seconds
  dailyUsage: 0,
  lastUsageDate: null,
  dailyLimit: 30, // minutes
  
  // Streaks
  currentStreak: 0,
  longestStreak: 0,
  lastActiveDate: null,
  
  // Meta
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
});

export const useProgress = () => {
  const [progress, setProgress] = useState(getDefaultProgress);
  const [newReward, setNewReward] = useState(null);
  const sessionStartRef = useRef(Date.now());
  const saveTimeoutRef = useRef(null);

  // Load progress from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        const today = new Date().toDateString();
        
        // Reset daily usage if it's a new day
        if (parsed.lastUsageDate !== today) {
          parsed.dailyUsage = 0;
          parsed.lastUsageDate = today;
          
          // Update streak
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          if (parsed.lastActiveDate === yesterday.toDateString()) {
            parsed.currentStreak = (parsed.currentStreak || 0) + 1;
            parsed.longestStreak = Math.max(parsed.longestStreak || 0, parsed.currentStreak);
          } else if (parsed.lastActiveDate !== today) {
            parsed.currentStreak = 1;
          }
        }
        
        setProgress({ ...getDefaultProgress(), ...parsed });
      }
    } catch (e) {
      console.error('Failed to load progress:', e);
    }
  }, []);

  // Debounced save to localStorage
  const saveProgress = useCallback((newProgress) => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    saveTimeoutRef.current = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
      } catch (e) {
        console.error('Failed to save progress:', e);
      }
    }, 500);
  }, []);

  // Check and unlock rewards
  const checkRewards = useCallback((totalInteractions) => {
    const newStickers = [];
    const newThemes = [];
    
    // Check stickers
    STICKERS.forEach(sticker => {
      if (totalInteractions >= sticker.unlockAt && !progress.stickersEarned.includes(sticker.id)) {
        newStickers.push(sticker);
      }
    });
    
    // Check themes
    THEMES.forEach(theme => {
      if (totalInteractions >= theme.unlockAt && !progress.themesUnlocked.includes(theme.id)) {
        newThemes.push(theme);
      }
    });
    
    return { newStickers, newThemes };
  }, [progress.stickersEarned, progress.themesUnlocked]);

  // Record letter interaction
  const recordLetterHeard = useCallback((letter) => {
    setProgress(prev => {
      const newTotal = prev.totalInteractions + 1;
      const { newStickers, newThemes } = checkRewards(newTotal);
      
      const updated = {
        ...prev,
        lettersHeard: [...new Set([...prev.lettersHeard, letter])],
        lettersTappedCount: prev.lettersTappedCount + 1,
        totalInteractions: newTotal,
        stickersEarned: [...prev.stickersEarned, ...newStickers.map(s => s.id)],
        themesUnlocked: [...prev.themesUnlocked, ...newThemes.map(t => t.id)],
        lastActiveDate: new Date().toDateString(),
        updatedAt: new Date().toISOString()
      };
      
      // Set new reward for modal
      if (newStickers.length > 0) {
        setNewReward({ type: 'sticker', item: newStickers[0] });
      } else if (newThemes.length > 0) {
        setNewReward({ type: 'theme', item: newThemes[0] });
      }
      
      saveProgress(updated);
      return updated;
    });
  }, [checkRewards, saveProgress]);

  // Record word interaction
  const recordWordTapped = useCallback((word) => {
    setProgress(prev => {
      const newTotal = prev.totalInteractions + 1;
      const { newStickers, newThemes } = checkRewards(newTotal);
      
      const updated = {
        ...prev,
        wordsTapped: [...new Set([...prev.wordsTapped, word])],
        wordsExploredCount: prev.wordsExploredCount + 1,
        totalInteractions: newTotal,
        stickersEarned: [...prev.stickersEarned, ...newStickers.map(s => s.id)],
        themesUnlocked: [...prev.themesUnlocked, ...newThemes.map(t => t.id)],
        lastActiveDate: new Date().toDateString(),
        updatedAt: new Date().toISOString()
      };
      
      if (newStickers.length > 0) {
        setNewReward({ type: 'sticker', item: newStickers[0] });
      } else if (newThemes.length > 0) {
        setNewReward({ type: 'theme', item: newThemes[0] });
      }
      
      saveProgress(updated);
      return updated;
    });
  }, [checkRewards, saveProgress]);

  // Record rhyme interaction
  const recordRhymeWatched = useCallback((rhymeId) => {
    setProgress(prev => {
      const newTotal = prev.totalInteractions + 1;
      const { newStickers, newThemes } = checkRewards(newTotal);
      
      const updated = {
        ...prev,
        rhymesWatched: [...new Set([...prev.rhymesWatched, rhymeId])],
        rhymesPlayedCount: prev.rhymesPlayedCount + 1,
        totalInteractions: newTotal,
        stickersEarned: [...prev.stickersEarned, ...newStickers.map(s => s.id)],
        themesUnlocked: [...prev.themesUnlocked, ...newThemes.map(t => t.id)],
        lastActiveDate: new Date().toDateString(),
        updatedAt: new Date().toISOString()
      };
      
      if (newStickers.length > 0) {
        setNewReward({ type: 'sticker', item: newStickers[0] });
      } else if (newThemes.length > 0) {
        setNewReward({ type: 'theme', item: newThemes[0] });
      }
      
      saveProgress(updated);
      return updated;
    });
  }, [checkRewards, saveProgress]);

  // Update time spent
  const updateTimeSpent = useCallback((seconds) => {
    setProgress(prev => {
      const today = new Date().toDateString();
      const updated = {
        ...prev,
        totalTimeSpent: prev.totalTimeSpent + seconds,
        dailyUsage: prev.lastUsageDate === today ? prev.dailyUsage + Math.floor(seconds / 60) : Math.floor(seconds / 60),
        lastUsageDate: today
      };
      saveProgress(updated);
      return updated;
    });
  }, [saveProgress]);

  // Set daily limit
  const setDailyLimit = useCallback((minutes) => {
    setProgress(prev => {
      const updated = { ...prev, dailyLimit: minutes };
      saveProgress(updated);
      return updated;
    });
  }, [saveProgress]);

  // Set current theme
  const setCurrentTheme = useCallback((themeId) => {
    if (progress.themesUnlocked.includes(themeId)) {
      setProgress(prev => {
        const updated = { ...prev, currentTheme: themeId };
        saveProgress(updated);
        return updated;
      });
    }
  }, [progress.themesUnlocked, saveProgress]);

  // Clear new reward notification
  const clearNewReward = useCallback(() => {
    setNewReward(null);
  }, []);

  // Reset progress
  const resetProgress = useCallback(() => {
    const fresh = getDefaultProgress();
    setProgress(fresh);
    saveProgress(fresh);
    setNewReward(null);
  }, [saveProgress]);

  // Get analytics stats
  const getStats = useCallback(() => ({
    // Counts
    uniqueLetters: progress.lettersHeard.length,
    lettersTapped: progress.lettersTappedCount,
    uniqueWords: progress.wordsTapped.length,
    wordsExplored: progress.wordsExploredCount,
    uniqueRhymes: progress.rhymesWatched.length,
    rhymesPlayed: progress.rhymesPlayedCount,
    totalInteractions: progress.totalInteractions,
    
    // Gamification
    stickersEarned: progress.stickersEarned.length,
    themesUnlocked: progress.themesUnlocked.length,
    currentTheme: progress.currentTheme,
    
    // Time
    totalTimeSpent: progress.totalTimeSpent,
    dailyUsage: progress.dailyUsage,
    dailyLimit: progress.dailyLimit,
    remainingTime: Math.max(0, progress.dailyLimit - progress.dailyUsage),
    
    // Streaks
    currentStreak: progress.currentStreak,
    longestStreak: progress.longestStreak,
    
    // Progress percentages
    lettersProgress: Math.round((progress.lettersHeard.length / 15) * 100), // 15 vowels
    wordsProgress: Math.round((progress.wordsTapped.length / 24) * 100), // 24 total words
    
    // Next rewards
    nextStickerAt: STICKERS.find(s => !progress.stickersEarned.includes(s.id))?.unlockAt || null,
    nextThemeAt: THEMES.find(t => !progress.themesUnlocked.includes(t.id))?.unlockAt || null
  }), [progress]);

  // Track session time on unmount
  useEffect(() => {
    return () => {
      const sessionTime = Math.floor((Date.now() - sessionStartRef.current) / 1000);
      if (sessionTime > 10) { // Only record if > 10 seconds
        updateTimeSpent(sessionTime);
      }
    };
  }, [updateTimeSpent]);

  return {
    progress,
    newReward,
    recordLetterHeard,
    recordWordTapped,
    recordRhymeWatched,
    updateTimeSpent,
    setDailyLimit,
    setCurrentTheme,
    clearNewReward,
    resetProgress,
    getStats
  };
};

export default useProgress;
