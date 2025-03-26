import React, { useState, useEffect, useRef } from 'react';
import './styles.css';

const ScreenReader = () => {
  const [isEnabled, setIsEnabled] = useState(false); // Screen reader disbaled by default
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [isKeyboardNavigation, setIsKeyboardNavigation] = useState(false);
  const enableButtonRef = useRef(null);

  // Initialize voices when the component mounts
  useEffect(() => {
    const initVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      // Try to find Google UK English Female voice
      const voice =
        voices.find((voice) => voice.name === 'Google UK English Female') ||
        voices.find((v) => v.lang === 'en-GB') ||
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
    utterance.lang = 'en-GB';
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    // Announce instructions when screen reader is enabled
    if (isEnabled) {
      readAloud('Press Enter if you want to enable screen reader');
    }

    if (!isEnabled) return;

    // Focus the "Enable Screen Reader" button when screen reader is enabled
    if (enableButtonRef.current) {
      enableButtonRef.current.focus();
      // Announce the button's name using the aria-label or the button text content
      const buttonText = enableButtonRef.current.getAttribute('aria-label') || enableButtonRef.current.textContent;
      readAloud(buttonText);
    }

    const handleMouseOver = (event) => {
      // Skip if element is part of controls
      if (event.target.closest('.screen-reader-controls')) return;

      // If the user is navigating via keyboard, don't read mouseover events
      if (isKeyboardNavigation) return;

      const text =
        event.target.getAttribute('aria-label') ||
        (event.target.tagName === 'IMG' && event.target.getAttribute('alt')) ||
        event.target.textContent?.trim();

      if (text) {
        readAloud(text);
      }
    };

    const handleFocus = (event) => {
      // Skip if element is part of controls
      if (event.target.closest('.screen-reader-controls')) return;

      // Announce the focused element only if keyboard navigation is happening
      if (!isKeyboardNavigation) return;

      let text = '';

      // For input fields, announce the label or placeholder
      if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
        // Try to get the label associated with the input field
        const label = document.querySelector(`label[for="${event.target.id}"]`);
        if (label) {
          text = label.textContent.trim();
        } else if (event.target.getAttribute('aria-label')) {
          text = event.target.getAttribute('aria-label');
        } else if (event.target.placeholder) {
          text = `Field: ${event.target.placeholder}`;
        }
      } 
      // Handle dropdown (select) elements
      else if (event.target.tagName === 'SELECT') {
        // Get the label associated with the dropdown, if available
        const label = document.querySelector(`label[for="${event.target.id}"]`);
        if (label) {
          text = label.textContent.trim();
        } else if (event.target.getAttribute('aria-label')) {
          text = event.target.getAttribute('aria-label');
        }

        // Announce the number of options in the dropdown
        const optionsCount = event.target.options.length;
        const selectedOptionText = event.target.options[event.target.selectedIndex]?.text;
        text += selectedOptionText ? `, selected option: ${selectedOptionText}` : '';
        text += `, with ${optionsCount} options.`;
      } 
      // For other elements, read the aria-label, alt text (for images), or text content
      else {
        text =
          event.target.getAttribute('aria-label') ||
          (event.target.tagName === 'IMG' && event.target.getAttribute('alt')) ||
          event.target.textContent?.trim();
      }

      if (text) {
        readAloud(text);
      }
    };

    // Detect keyboard navigation start
    const handleKeyDown = (event) => {
      // Detect Tab key press
      if (event.key === 'Tab') {
        setIsKeyboardNavigation(true);
      }

      // Handle left and right arrow keys for navigating between focusable elements
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        // You can customize the navigation behavior based on your needs, like focusing the previous or next element
        const focusableElements = Array.from(document.querySelectorAll('button, input, a, select, textarea'));
        let currentIndex = focusableElements.indexOf(document.activeElement);
        if (event.key === 'ArrowLeft') {
          currentIndex = currentIndex > 0 ? currentIndex - 1 : focusableElements.length - 1;
        } else if (event.key === 'ArrowRight') {
          currentIndex = currentIndex < focusableElements.length - 1 ? currentIndex + 1 : 0;
        }
        focusableElements[currentIndex].focus();
        readAloud(focusableElements[currentIndex].textContent || 'Focusable element');
      }
    };

    const handleMouseMove = () => {
      // Once mouse is moved, it should stop keyboard navigation and revert to mouseover
      if (isKeyboardNavigation) {
        setIsKeyboardNavigation(false);
      }
    };

    // Add event listeners for mouseover, focus, and keydown
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('focus', handleFocus, true); // Capture focus events in the capturing phase
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('focus', handleFocus, true);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousemove', handleMouseMove);
      window.speechSynthesis.cancel();
    };
  }, [isEnabled, selectedVoice, isKeyboardNavigation]);

  return (
    <div className="screen-reader-controls">
      <button
        ref={enableButtonRef}
        onClick={() => {
          if (isEnabled) {
            window.speechSynthesis.cancel();
          }
          setIsEnabled(!isEnabled);
        }}
        className="accessibility-btn"
        aria-label={isEnabled ? 'Disable screen reader' : 'Enable screen reader'}
      >
        {isEnabled ? '🔇 Disable Screen Reader' : '🔊 Enable Screen Reader'}
      </button>
    </div>
  );
};

export default ScreenReader;