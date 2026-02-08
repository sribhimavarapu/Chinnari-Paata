import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'chinnari_paata_progress';

const getDefaultProgress = () => ({
  lettersHeard: [],
  wordsTapped: [],
  rhymesWatched: [],
  stickersEarned: [],
  totalInteractions: 0,
  lastActive: null,
  dailyLimit: 30, // minutes
  dailyUsage: 0,
  lastUsageDate: null
});

export const useProgress = () => {
  const [progress, setProgress] = useState(getDefaultProgress);

  // Load progress from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Reset daily usage if it's a new day
        const today = new Date().toDateString();
        if (parsed.lastUsageDate !== today) {
          parsed.dailyUsage = 0;
          parsed.lastUsageDate = today;
        }
        setProgress({ ...getDefaultProgress(), ...parsed });
      }
    } catch (e) {
      console.error('Failed to load progress:', e);
    }
  }, []);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.error('Failed to save progress:', e);
    }
  }, [progress]);

  const recordLetterHeard = useCallback((letter) => {
    setProgress(prev => ({
      ...prev,
      lettersHeard: [...new Set([...prev.lettersHeard, letter])],
      totalInteractions: prev.totalInteractions + 1,
      lastActive: new Date().toISOString()
    }));
  }, []);

  const recordWordTapped = useCallback((word) => {
    setProgress(prev => ({
      ...prev,
      wordsTapped: [...new Set([...prev.wordsTapped, word])],
      totalInteractions: prev.totalInteractions + 1,
      lastActive: new Date().toISOString()
    }));
  }, []);

  const recordRhymeWatched = useCallback((rhymeId) => {
    setProgress(prev => ({
      ...prev,
      rhymesWatched: [...new Set([...prev.rhymesWatched, rhymeId])],
      totalInteractions: prev.totalInteractions + 1,
      lastActive: new Date().toISOString()
    }));
  }, []);

  const earnSticker = useCallback((stickerId) => {
    setProgress(prev => {
      if (prev.stickersEarned.includes(stickerId)) return prev;
      return {
        ...prev,
        stickersEarned: [...prev.stickersEarned, stickerId],
        lastActive: new Date().toISOString()
      };
    });
  }, []);

  const setDailyLimit = useCallback((minutes) => {
    setProgress(prev => ({
      ...prev,
      dailyLimit: minutes
    }));
  }, []);

  const updateDailyUsage = useCallback((minutes) => {
    const today = new Date().toDateString();
    setProgress(prev => ({
      ...prev,
      dailyUsage: prev.lastUsageDate === today ? prev.dailyUsage + minutes : minutes,
      lastUsageDate: today
    }));
  }, []);

  const resetProgress = useCallback(() => {
    setProgress(getDefaultProgress());
  }, []);

  const getStats = useCallback(() => ({
    uniqueLetters: progress.lettersHeard.length,
    uniqueWords: progress.wordsTapped.length,
    rhymesWatched: progress.rhymesWatched.length,
    stickersEarned: progress.stickersEarned.length,
    totalInteractions: progress.totalInteractions,
    dailyUsage: progress.dailyUsage,
    dailyLimit: progress.dailyLimit,
    remainingTime: Math.max(0, progress.dailyLimit - progress.dailyUsage)
  }), [progress]);

  return {
    progress,
    recordLetterHeard,
    recordWordTapped,
    recordRhymeWatched,
    earnSticker,
    setDailyLimit,
    updateDailyUsage,
    resetProgress,
    getStats
  };
};

export default useProgress;
