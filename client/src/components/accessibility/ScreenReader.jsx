import React, { useState, useEffect } from 'react';
import './styles.css';

const ScreenReader = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [voice, setVoice] = useState(null);

  // Initialize voice when component mounts
  useEffect(() => {
    const initVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      console.log('Available voices:', voices.map(v => `${v.name} (${v.lang})`));

      // Prioritize Google voices or similar
      const selectedVoice =
        voices.find(v => v.name.includes('Google')) || // Google Text Reader voice
        voices.find(v => v.lang.startsWith('en')) || // Any English voice
        voices[0]; // Fallback to first available voice

      if (selectedVoice) {
        console.log('Selected voice:', selectedVoice.name);
        setVoice(selectedVoice);
      }
    };

    // Try to get voices immediately
    initVoice();

    // Also listen for voices to be loaded
    window.speechSynthesis.onvoiceschanged = initVoice;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const speak = (text) => {
    if (!text || !voice) return;

    // Always cancel previous speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voice;
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 0.8;

    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (!isEnabled) {
      window.speechSynthesis.cancel();
      return;
    }

    let lastText = '';
    let timeout;

    const handleMouseOver = (event) => {
      if (event.target.closest('.screen-reader-controls')) return;

      const text = event.target.getAttribute('aria-label') ||
                  (event.target.tagName === 'IMG' && event.target.getAttribute('alt')) ||
                  event.target.textContent?.trim();

      if (text && text !== lastText) {
        clearTimeout(timeout);
        lastText = text;
        timeout = setTimeout(() => speak(text), 200);
      }
    };

    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      clearTimeout(timeout);
      window.speechSynthesis.cancel();
    };
  }, [isEnabled, voice]);

  return (
    <div className="screen-reader-controls">
      <button
        onClick={() => {
          window.speechSynthesis.cancel();
          setIsEnabled(!isEnabled);
        }}
        className="accessibility-btn"
      >
        {isEnabled ? "🔇 Disable Voice Reader" : "🔊 Enable Voice Reader"}
      </button>
    </div>
  );
};

export default ScreenReader;
