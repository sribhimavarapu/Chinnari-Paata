// Shared Data - Stickers and Themes (language-independent)

export const STICKERS = [
  { id: 'star', emoji: '⭐', name: 'Star', unlockAt: 5 },
  { id: 'heart', emoji: '❤️', name: 'Heart', unlockAt: 10 },
  { id: 'sun', emoji: '☀️', name: 'Sun', unlockAt: 15 },
  { id: 'rainbow', emoji: '🌈', name: 'Rainbow', unlockAt: 20 },
  { id: 'flower', emoji: '🌸', name: 'Flower', unlockAt: 30 },
  { id: 'butterfly', emoji: '🦋', name: 'Butterfly', unlockAt: 40 },
  { id: 'rocket', emoji: '🚀', name: 'Rocket', unlockAt: 50 },
  { id: 'crown', emoji: '👑', name: 'Crown', unlockAt: 75 },
  { id: 'sparkle', emoji: '✨', name: 'Sparkle', unlockAt: 100 },
  { id: 'trophy', emoji: '🏆', name: 'Trophy', unlockAt: 150 }
];

export const THEMES = [
  { 
    id: 'default', 
    name: 'Sunny Day', 
    unlockAt: 0,
    colors: {
      primary: '#FF6B6B',
      secondary: '#FFD93D',
      accent: '#4D96FF',
      background: '#FFFDF5'
    }
  },
  { 
    id: 'ocean', 
    name: 'Ocean Blue', 
    unlockAt: 20,
    colors: {
      primary: '#4D96FF',
      secondary: '#6BCB77',
      accent: '#FFD93D',
      background: '#F0F8FF'
    }
  },
  { 
    id: 'forest', 
    name: 'Forest Green', 
    unlockAt: 50,
    colors: {
      primary: '#6BCB77',
      secondary: '#FFD93D',
      accent: '#FF6B6B',
      background: '#F5FFF5'
    }
  },
  { 
    id: 'sunset', 
    name: 'Sunset Orange', 
    unlockAt: 100,
    colors: {
      primary: '#FF9F45',
      secondary: '#FF6B6B',
      accent: '#FFD93D',
      background: '#FFF8F0'
    }
  }
];

// Gamification milestones
export const MILESTONES = {
  STICKER_UNLOCK: 5,      // Every 5 interactions unlock a sticker
  THEME_UNLOCK: 20,       // Every 20 interactions can unlock themes
  DAILY_GOAL: 10,         // Daily interaction goal
  WEEKLY_STREAK: 7        // Days for weekly streak
};

export default { STICKERS, THEMES, MILESTONES };
