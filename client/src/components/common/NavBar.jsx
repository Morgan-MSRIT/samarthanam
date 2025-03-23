import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ScreenReader from '../accessibility/ScreenReader';

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [highContrastMode, setHighContrastMode] = useState(false);

  useEffect(() => {
    if (highContrastMode) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  }, [highContrastMode]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleHighContrastMode = () => {
    setHighContrastMode(!highContrastMode);
  };

  return (
    <nav className={`shadow fixed w-full z-50 ${highContrastMode ? 'bg-black text-yellow-300 border-white border-2' : 'bg-tertiary-300'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img
                className="h-12 w-auto ${highContrastMode ? 'filter invert' : ''}"
                src="/samarthanam-logo.png"
                alt="Samarthanam Trust"
              />
            </div>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <Link to="/" className="nav-link ${highContrastMode ? 'text-yellow-300 font-bold' : ''}">Home</Link>
              <Link to="/events" className="nav-link ${highContrastMode ? 'text-yellow-300 font-bold' : ''}">Events</Link>
              <Link to="/about" className="nav-link ${highContrastMode ? 'text-yellow-300 font-bold' : ''}">About Us</Link>
              <Link to="/contact" className="nav-link ${highContrastMode ? 'text-yellow-300 font-bold' : ''}">Contact Us</Link>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button onClick={toggleHighContrastMode} className="contrast-button ${highContrastMode ? 'bg-yellow-300 text-black' : ''}">
              {highContrastMode ? 'Disable High Contrast' : 'Enable High Contrast'}
            </button>
            <div className="translate-button">
              <div id="google_translate_element"></div>
              <span>Translate</span>
            </div>
            <Link to="/volunteer" className="btn-primary">Register as Volunteer</Link>
            <Link to="/login" className="btn-primary">Sign in</Link>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="hamburger-menu" aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}>
              <span className="sr-only">{isOpen ? 'Close menu' : 'Open menu'}</span>
              {isOpen ? (
                <svg className="h-6 w-6 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className={`md:hidden ${highContrastMode ? 'bg-black border-yellow-300 border-2' : 'bg-tertiary-300'} border-t border-gray-400 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link to="/" className="mobile-nav-link ${highContrastMode ? 'text-yellow-300 font-bold' : ''}" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/events" className="mobile-nav-link ${highContrastMode ? 'text-yellow-300 font-bold' : ''}" onClick={() => setIsOpen(false)}>Events</Link>
          <Link to="/about" className="mobile-nav-link ${highContrastMode ? 'text-yellow-300 font-bold' : ''}" onClick={() => setIsOpen(false)}>About Us</Link>
          <Link to="/contact" className="mobile-nav-link ${highContrastMode ? 'text-yellow-300 font-bold' : ''}" onClick={() => setIsOpen(false)}>Contact Us</Link>
          <button onClick={toggleHighContrastMode} className="contrast-button w-full ${highContrastMode ? 'bg-yellow-300 text-black' : ''}">
            {highContrastMode ? 'Disable High Contrast' : 'Enable High Contrast'}
          </button>
          <div id="google_translate_element" className="block w-full"></div>
          <Link to="/volunteer" className="btn-primary w-full" onClick={() => setIsOpen(false)}>Register as Volunteer</Link>
          <Link to="/login" className="btn-primary w-full" onClick={() => setIsOpen(false)}>Sign in</Link>
        </div>
      </div>
    </nav>
  );
}
