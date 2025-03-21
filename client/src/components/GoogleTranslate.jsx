import React, { useEffect } from 'react';

const GoogleTranslate = () => {
  useEffect(() => {
    // Add Google Translate script to head
    const addScript = () => {
      const script = document.createElement('script');
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.head.appendChild(script);
    };

    // Initialize Google Translate
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages: 'en,kn,hi,ta,te,ml,bn,ur', // English, Kannada, Hindi, Tamil, Telugu, Malayalam, Bengali, Urdu
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE
        },
        'google_translate_element'
      );
    };

    addScript();

    // Cleanup
    return () => {
      delete window.googleTranslateElementInit;
    };
  }, []);

  return null; // This component doesn't render anything directly
};

export default GoogleTranslate; 