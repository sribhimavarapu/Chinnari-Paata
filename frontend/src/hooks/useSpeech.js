import { useCallback, useRef } from 'react';

export const useSpeech = () => {
  const synth = useRef(window.speechSynthesis);

  const speak = useCallback((text, options = {}) => {
    if (!synth.current) {
      console.warn('Speech synthesis not supported');
      return;
    }

    // Cancel any ongoing speech
    synth.current.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Try to find Telugu voice
    const voices = synth.current.getVoices();
    const teluguVoice = voices.find(voice => 
      voice.lang.includes('te') || 
      voice.lang.includes('Telugu') ||
      voice.name.toLowerCase().includes('telugu')
    );
    
    // Fallback to Indian English if no Telugu voice
    const indianVoice = voices.find(voice => 
      voice.lang.includes('en-IN') ||
      voice.name.toLowerCase().includes('india')
    );

    if (teluguVoice) {
      utterance.voice = teluguVoice;
    } else if (indianVoice) {
      utterance.voice = indianVoice;
    }

    // Configure speech
    utterance.rate = options.slow ? 0.6 : 0.8; // Slower for kids
    utterance.pitch = options.pitch || 1.1; // Slightly higher pitch for friendly tone
    utterance.volume = 1;
    utterance.lang = 'te-IN';

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

  return { speak, stop, getVoices };
};

export default useSpeech;
