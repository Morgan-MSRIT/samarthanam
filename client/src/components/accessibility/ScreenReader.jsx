import React, { useState, useEffect } from 'react';
import './styles.css';

const ScreenReader = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState(null);

  // Initialize voices when component mounts
  useEffect(() => {
    const initVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      
      // Try to find an Indian or neutral English voice
      const voice = voices.find(voice => voice.name.toLowerCase().includes('india')) ||
                   voices.find(voice => voice.lang === 'en-IN') ||
                   voices.find(voice => voice.name === 'Google UK English Male') ||
                   voices.find(voice => voice.name === 'Google US English') ||
                   voices[0];
      
      if (voice) {
        setSelectedVoice(voice);
        console.log('Selected voice:', voice.name);
      }
    };

    // Load voices when they become available
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = initVoices;
    }
    initVoices();
  }, []);

  const readAloud = (text) => {
    // Stop any ongoing speech
    window.speechSynthesis.cancel();

    if (!text || !selectedVoice) return;

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set voice properties
    utterance.voice = selectedVoice;
    utterance.lang = 'en-IN';  // Use Indian English language
    utterance.rate = 0.9;      // Slightly slower for better clarity
    utterance.pitch = 1.0;     // Natural pitch
    utterance.volume = 1.0;    // Full volume

    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (!isEnabled) return;

    const handleMouseOver = (event) => {
      // Skip if element is part of controls
      if (event.target.closest('.screen-reader-controls')) return;

      const text = event.target.getAttribute('aria-label') ||
                  (event.target.tagName === 'IMG' && event.target.getAttribute('alt')) ||
                  event.target.textContent?.trim();

      if (text) {
        readAloud(text);
      }
    };

    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      window.speechSynthesis.cancel();
    };
  }, [isEnabled, selectedVoice]);

  return (
    <div className="screen-reader-controls">
      <button 
        onClick={() => {
          if (isEnabled) {
            window.speechSynthesis.cancel();
          }
          setIsEnabled(!isEnabled);
        }}
        className="accessibility-btn"
        aria-label={isEnabled ? "Disable screen reader" : "Enable screen reader"}
      >
        {isEnabled ? "🔇 Disable Screen Reader" : "🔊 Enable Screen Reader"}
      </button>
    </div>
  );
};

export default ScreenReader;