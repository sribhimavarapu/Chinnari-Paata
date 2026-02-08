import { useCallback, useRef, useEffect, useState } from 'react';

export const useSpeech = () => {
  const synth = useRef(typeof window !== 'undefined' ? window.speechSynthesis : null);
  const [voicesLoaded, setVoicesLoaded] = useState(false);

  // Load voices on mount - this is crucial for speech to work
  useEffect(() => {
    if (!synth.current) return;

    const loadVoices = () => {
      const voices = synth.current.getVoices();
      if (voices.length > 0) {
        setVoicesLoaded(true);
        console.log('Voices loaded:', voices.length);
      }
    };

    // Load immediately if already available
    loadVoices();

    // Also listen for voiceschanged event (needed for Chrome)
    synth.current.addEventListener('voiceschanged', loadVoices);

    return () => {
      if (synth.current) {
        synth.current.removeEventListener('voiceschanged', loadVoices);
      }
    };
  }, []);

  const speak = useCallback((text, options = {}) => {
    if (!synth.current) {
      console.warn('Speech synthesis not supported');
      // Fallback: Play a beep sound to indicate tap registered
      playFallbackSound();
      return;
    }

    // Cancel any ongoing speech
    synth.current.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Get voices
    const voices = synth.current.getVoices();
    console.log('Available voices:', voices.length);
    
    // Try to find Telugu voice
    const teluguVoice = voices.find(voice => 
      voice.lang === 'te-IN' ||
      voice.lang.startsWith('te') || 
      voice.name.toLowerCase().includes('telugu')
    );
    
    // Fallback to Hindi if no Telugu
    const hindiVoice = voices.find(voice => 
      voice.lang === 'hi-IN' ||
      voice.lang.startsWith('hi')
    );
    
    // Fallback to Indian English
    const indianVoice = voices.find(voice => 
      voice.lang === 'en-IN' ||
      voice.name.toLowerCase().includes('india')
    );

    // Use Google voices if available (better quality)
    const googleVoice = voices.find(voice => 
      voice.name.toLowerCase().includes('google') &&
      (voice.lang.startsWith('te') || voice.lang.startsWith('hi') || voice.lang === 'en-IN')
    );

    if (googleVoice) {
      utterance.voice = googleVoice;
      console.log('Using Google voice:', googleVoice.name);
    } else if (teluguVoice) {
      utterance.voice = teluguVoice;
      console.log('Using Telugu voice:', teluguVoice.name);
    } else if (hindiVoice) {
      utterance.voice = hindiVoice;
      console.log('Using Hindi voice:', hindiVoice.name);
    } else if (indianVoice) {
      utterance.voice = indianVoice;
      console.log('Using Indian English voice:', indianVoice.name);
    } else if (voices.length > 0) {
      // Use default voice
      console.log('Using default voice');
    }

    // Configure speech for toddler-friendly experience
    utterance.rate = options.slow ? 0.5 : 0.7; // Even slower for kids
    utterance.pitch = options.pitch || 1.0;
    utterance.volume = 1;
    utterance.lang = 'te-IN';

    // Log for debugging
    utterance.onstart = () => console.log('Speech started:', text);
    utterance.onend = () => console.log('Speech ended');
    utterance.onerror = (e) => console.error('Speech error:', e);

    // Speak
    synth.current.speak(utterance);

    return utterance;
  }, []);

  const stop = useCallback(() => {
    if (synth.current) {
      synth.current.cancel();
    }
  }, []);

  const getVoices = useCallback(() => {
    return synth.current ? synth.current.getVoices() : [];
  }, []);

  return { speak, stop, getVoices, voicesLoaded };
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
    gainNode.gain.value = 0.3;
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.1);
  } catch (e) {
    console.log('Fallback sound failed:', e);
  }
};

export default useSpeech;
