# Chinnari Paata (చిన్నారి పాట) - Telugu Language Learning App for Toddlers

## Original Problem Statement
Build a toddler-friendly interactive language learning web application focused on teaching Telugu as the first language. Target: Toddlers aged 2-5 years with parents as supervisors.

## Architecture
- **Frontend**: React 19 with Tailwind CSS, framer-motion animations
- **Backend**: FastAPI with MongoDB
- **Audio**: Web Speech API (free TTS for Telugu pronunciation)
- **Video**: YouTube integration via react-player

## User Personas
1. **Primary**: Toddlers aged 2-5 years
   - Need: Large touch targets, bright colors, audio-first experience
   - No reading required
2. **Secondary**: Parents/Caregivers
   - Need: Hidden controls, progress tracking, time limits

## Core Requirements (Static)
- [x] Simple UI with large buttons (75px+ touch targets)
- [x] Audio-first learning (Web Speech API)
- [x] Three main modules: Letters, Words, Rhymes
- [x] Reward system with stickers
- [x] Parent controls behind long-press gate

## What's Been Implemented (Jan 2026)
### Letters Module
- 15 Telugu vowels (అ ఆ ఇ ఈ ఉ ఊ ఋ ఎ ఏ ఐ ఒ ఓ ఔ అం అః)
- Grid and single-letter view modes
- Tap-to-hear pronunciation
- Example words with images

### Words Module
- 3 categories: Animals (8 words), Fruits (8 words), Colors (8 words)
- Tap-to-hear Telugu word
- Confetti animation on interaction

### Rhymes Module
- 6 YouTube Telugu rhymes integrated
- Full-screen video player with controls
- Loop playback support

### Rewards System
- 10 stickers unlockable at milestones
- Progress stored in localStorage

### Parent Controls
- 3-second long press to access
- Daily time limit setting
- Progress statistics
- Reset option

## Prioritized Backlog

### P0 (Critical)
- [x] Core learning modules
- [x] Audio playback
- [x] Basic navigation

### P1 (Important)
- [ ] Telugu consonants (hallulu) module
- [ ] Offline audio caching (Service Worker)
- [ ] Better Telugu TTS voice (if available)

### P2 (Nice to Have)
- [ ] Hindi/Tamil language support
- [ ] More word categories
- [ ] Interactive tracing for letter writing
- [ ] Achievement badges

## Next Tasks
1. Add consonants (hallulu) to Letters module
2. Implement Service Worker for offline audio
3. Add more rhymes and songs
4. Enhanced progress tracking with charts
5. Multi-language support framework

## Tech Stack
- React 19, Tailwind CSS, framer-motion
- FastAPI, Motor (async MongoDB)
- react-player for YouTube
- Web Speech API for TTS
- localStorage for progress
