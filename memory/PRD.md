# Chinnari Paata (చిన్నారి పాట) - Multi-Language Learning Platform for Toddlers

## Original Problem Statement
Build a scalable toddler-friendly language learning web app starting with Telugu, with multi-language support, gamification, and parent analytics.

## Architecture

### Frontend Structure
```
/app/frontend/src/
├── config/
│   └── languages.js         # Language configuration
├── context/
│   └── LanguageContext.jsx  # Language state management
├── data/
│   ├── telugu/              # Telugu language data
│   │   ├── vowels.js
│   │   ├── words.js
│   │   ├── rhymes.js
│   │   ├── strings.js
│   │   └── index.js
│   ├── hindi/               # Hindi language data
│   │   └── ... (same structure)
│   ├── shared/
│   │   └── rewards.js       # Stickers, themes, milestones
│   └── index.js             # Data loader
├── hooks/
│   ├── useAudio.js          # Audio playback with no overlap
│   └── useProgress.js       # Gamification & analytics
├── components/
│   ├── LanguageSwitcher.jsx
│   ├── ParentDashboard.jsx
│   ├── RewardModal.jsx
│   └── WordCard.jsx
└── pages/
    ├── HomePage.jsx
    ├── LettersPage.jsx
    ├── WordsPage.jsx
    └── RhymesPage.jsx
```

### Tech Stack
- React 19 + Tailwind CSS + framer-motion
- FastAPI + MongoDB (backend ready for future features)
- Web Speech API for TTS
- YouTube embed for rhymes
- localStorage for progress (no auth required yet)
- Service Worker for PWA offline support

## User Personas
1. **Primary**: Toddlers 2-5 years - Large touch targets, audio-first
2. **Secondary**: Parents - Hidden dashboard, progress tracking

## What's Been Implemented (March 2026)

### Multi-Language System ✅
- Telugu (default) + Hindi support
- Language switcher in header
- Modular data structure per language
- Easy to add Tamil, Kannada, etc.

### Gamification ✅
- Track: lettersTappedCount, wordsExploredCount, rhymesPlayedCount
- 10 stickers unlocked at milestones (5, 10, 15, 20...)
- 4 themes unlocked at (0, 20, 50, 100 interactions)
- Streak tracking for daily usage

### Parent Dashboard ✅
- Hidden behind 3-sec long press OR 4-corner tap
- Progress tab: Stats, time tracking, progress bars
- Rewards tab: Stickers & themes collection
- Settings tab: Daily time limit, reset progress

### Audio System ✅
- Web Speech API with language detection
- No overlapping playback
- Slow/Normal speed toggle
- Fallback beep when TTS unavailable

### PWA Support ✅
- Service Worker for offline caching
- Manifest for home screen install
- Image caching for offline use

### Responsive UI ✅
- 2-column grid on mobile
- 3-column on tablet
- 5-column on desktop
- Large touch targets (100px+)

## Prioritized Backlog

### P0 (Next Sprint)
- [ ] Add letter tracing for writing practice
- [ ] Tamil language data
- [ ] Consonants (hallulu) module

### P1 (Important)
- [ ] Audio file preloading
- [ ] Enhanced offline mode
- [ ] Notification for daily learning reminder

### P2 (Nice to Have)
- [ ] Cloud sync with authentication
- [ ] More word categories (Numbers, Body Parts)
- [ ] Parent email reports

## Next Tasks
1. Add interactive letter tracing feature
2. Create Tamil language data files
3. Add consonants to letters module
4. Implement audio file caching for better TTS
5. Add daily learning reminder notifications

## Metrics to Track
- Total interactions per language
- Daily active sessions
- Letter completion rate
- Sticker unlock rate
