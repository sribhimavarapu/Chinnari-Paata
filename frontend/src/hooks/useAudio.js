import { useCallback, useRef, useEffect, useState } from 'react';

// Audio cache for offline support
const audioCache = new Map();

export const useAudio = () => {
  const currentAudioRef = useRef(null);
  const synthRef = useRef(typeof window !== 'undefined' ? window.speechSynthesis : null);
  const [voicesLoaded, setVoicesLoaded] = useState(false);
  const [playbackRate, setPlaybackRate] = useState('normal'); // 'slow' | 'normal'
  const [isPlaying, setIsPlaying] = useState(false);

  // Load voices on mount
  useEffect(() => {
    if (!synthRef.current) return;

    const loadVoices = () => {
      const voices = synthRef.current.getVoices();
      if (voices.length > 0) {
        setVoicesLoaded(true);
      }
    };

    loadVoices();
    synthRef.current.addEventListener('voiceschanged', loadVoices);

    return () => {
      if (synthRef.current) {
        synthRef.current.removeEventListener('voiceschanged', loadVoices);
      }
    };
  }, []);

  // Stop any current audio playback
  const stopAudio = useCallback(() => {
    // Stop Web Speech
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    // Stop HTML Audio
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current.currentTime = 0;
      currentAudioRef.current = null;
    }
    setIsPlaying(false);
  }, []);

  // Get voice for language
  const getVoiceForLanguage = useCallback((langCode) => {
    if (!synthRef.current) return null;
    
    const voices = synthRef.current.getVoices();
    
    // Try exact match first
    let voice = voices.find(v => v.lang === langCode);
    
    // Try prefix match
    if (!voice) {
      const prefix = langCode.split('-')[0];
      voice = voices.find(v => v.lang.startsWith(prefix));
    }
    
    // Try Google voices (better quality)
    if (!voice) {
      voice = voices.find(v => 
        v.name.toLowerCase().includes('google') &&
        v.lang.startsWith(langCode.split('-')[0])
      );
    }
    
    return voice;
  }, []);

  // Speak text using Web Speech API
  const speak = useCallback((text, options = {}) => {
    // Stop any current playback first
    stopAudio();

    if (!synthRef.current) {
      console.warn('Speech synthesis not supported');
      playFallbackSound();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Get voice for the specified language
    const langCode = options.lang || 'te-IN';
    const voice = getVoiceForLanguage(langCode);
    
    if (voice) {
      utterance.voice = voice;
    }

    // Set rate based on playback mode
    const rate = options.slow || playbackRate === 'slow' ? 0.5 : 0.7;
    utterance.rate = rate;
    utterance.pitch = options.pitch || 1.0;
    utterance.volume = 1;
    utterance.lang = langCode;

    // Track state
    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    synthRef.current.speak(utterance);
    return utterance;
  }, [stopAudio, getVoiceForLanguage, playbackRate]);

  // Preload audio file
  const preloadAudio = useCallback((url) => {
    if (audioCache.has(url)) return Promise.resolve(audioCache.get(url));

    return new Promise((resolve, reject) => {
      const audio = new Audio();
      audio.preload = 'auto';
      audio.src = url;
      
      audio.oncanplaythrough = () => {
        audioCache.set(url, audio);
        resolve(audio);
      };
      
      audio.onerror = reject;
    });
  }, []);

  // Play audio file
  const playAudio = useCallback(async (url, options = {}) => {
    stopAudio();

    try {
      let audio;
      if (audioCache.has(url)) {
        audio = audioCache.get(url).cloneNode();
      } else {
        audio = new Audio(url);
        audioCache.set(url, audio);
      }

      audio.playbackRate = options.slow || playbackRate === 'slow' ? 0.7 : 1.0;
      audio.volume = options.volume || 1;
      
      currentAudioRef.current = audio;
      
      audio.onplay = () => setIsPlaying(true);
      audio.onended = () => {
        setIsPlaying(false);
        currentAudioRef.current = null;
      };
      audio.onerror = () => {
        setIsPlaying(false);
        currentAudioRef.current = null;
      };

      await audio.play();
    } catch (e) {
      console.error('Audio playback failed:', e);
      setIsPlaying(false);
    }
  }, [stopAudio, playbackRate]);

  // Toggle playback rate
  const togglePlaybackRate = useCallback(() => {
    setPlaybackRate(prev => prev === 'normal' ? 'slow' : 'normal');
  }, []);

  // Preload multiple audio files
  const preloadAudioBatch = useCallback((urls) => {
    return Promise.all(urls.map(url => preloadAudio(url).catch(() => null)));
  }, [preloadAudio]);

  return {
    speak,
    playAudio,
    stopAudio,
    preloadAudio,
    preloadAudioBatch,
    voicesLoaded,
    isPlaying,
    playbackRate,
    togglePlaybackRate,
    setPlaybackRate
  };
};

// Fallback sound when speech isn't available
const playFallbackSound = () => {
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    gainNode.gain.value = 0.2;
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.1);
  } catch (e) {
    // Silently fail
  }
};

export default useAudio;
