import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
<<<<<<< HEAD
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
=======
import { AuthContext } from '../../context/AuthContext';

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated, logout } = useContext(AuthContext);
>>>>>>> main

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
<<<<<<< HEAD
            <button onClick={toggleHighContrastMode} className="contrast-button ${highContrastMode ? 'bg-yellow-300 text-black' : ''}">
              {highContrastMode ? 'Disable High Contrast' : 'Enable High Contrast'}
            </button>
            <div className="translate-button">
              <div id="google_translate_element"></div>
              <span>Translate</span>
            </div>
            <Link to="/volunteer" className="btn-primary">Register as Volunteer</Link>
            <Link to="/login" className="btn-primary">Sign in</Link>
=======
            <div className="inline-flex items-center px-2 border border-transparent text-sm font-medium rounded-md text-accent-100 bg-primary-500 hover:bg-secondary-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600 transition duration-200 ease-in-out hover:-translate-y-1 hover:shadow-md active:scale-95">
              <div id="google_translate_element" className="inline-flex items-center"></div>
              <span>Translate</span>
            </div>
            {isAuthenticated ? (
              <>
                <span className="text-primary-700">Welcome, {user.name}</span>
                {user.role === 'organiser' && (
                  <>
                    <Link
                      to="/organizer/create-events"
                      className="inline-flex items-center px-4 py-2 text-sm font-medium text-accent-100 bg-primary-500 hover:bg-secondary-500 rounded-md"
                    >
                      Create Events
                    </Link>
                    <Link
                      to="/organizer/manage-events"
                      className="inline-flex items-center px-4 py-2 text-sm font-medium text-accent-100 bg-primary-500 hover:bg-secondary-500 rounded-md"
                    >
                      Manage Events
                    </Link>
                  </>
                )}
                <button
                  onClick={logout}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-accent-100 bg-primary-500 hover:bg-secondary-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600 transition duration-200 ease-in-out hover:-translate-y-1 hover:shadow-md active:scale-95"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/volunteer"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-accent-100 bg-primary-500 hover:bg-secondary-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600 transition duration-200 ease-in-out hover:-translate-y-1 hover:shadow-md active:scale-95"
                >
                  Register as Volunteer
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-accent-100 bg-primary-500 hover:bg-secondary-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600 transition duration-200 ease-in-out hover:-translate-y-1 hover:shadow-md active:scale-95"
                >
                  Sign in
                </Link>
              </>
            )}
>>>>>>> main
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
<<<<<<< HEAD
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
=======
          <Link
            to="/"
            className="block px-3 py-2 rounded-md text-base font-medium text-primary-700 hover:text-secondary-500 hover:bg-accent-200 transition duration-200 ease-in-out hover:scale-105 active:scale-95"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/events"
            className="block px-3 py-2 rounded-md text-base font-medium text-primary-700 hover:text-secondary-500 hover:bg-accent-200 transition duration-200 ease-in-out hover:scale-105 active:scale-95"
            onClick={() => setIsOpen(false)}
          >
            Events
          </Link>
          <Link
            to="/about"
            className="block px-3 py-2 rounded-md text-base font-medium text-primary-700 hover:text-secondary-500 hover:bg-accent-200 transition duration-200 ease-in-out hover:scale-105 active:scale-95"
            onClick={() => setIsOpen(false)}
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className="block px-3 py-2 rounded-md text-base font-medium text-primary-700 hover:text-secondary-500 hover:bg-accent-200 transition duration-200 ease-in-out hover:scale-105 active:scale-95"
            onClick={() => setIsOpen(false)}
          >
            Contact Us
          </Link>
          {isAuthenticated ? (
            <>
              <span className="block px-3 py-2 text-base text-primary-700">
                Welcome, {user.name}
              </span>
              {user.role === 'organiser' && (
                <>
                  <Link
                    to="/organizer/create-events"
                    className="block px-3 py-2 rounded-md text-base font-medium text-accent-100 bg-primary-500 hover:bg-secondary-500 transition duration-200 ease-in-out hover:-translate-y-1 hover:shadow-md active:scale-95"
                    onClick={() => setIsOpen(false)}
                  >
                    Create Events
                  </Link>
                  <Link
                    to="/organizer/manage-events"
                    className="block px-3 py-2 rounded-md text-base font-medium text-accent-100 bg-primary-500 hover:bg-secondary-500 transition duration-200 ease-in-out hover:-translate-y-1 hover:shadow-md active:scale-95"
                    onClick={() => setIsOpen(false)}
                  >
                    Manage Events
                  </Link>
                </>
              )}
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="block px-3 py-2 rounded-md text-base font-medium text-accent-100 bg-primary-500 hover:bg-secondary-500 transition duration-200 ease-in-out hover:-translate-y-1 hover:shadow-md active:scale-95"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/volunteer"
                className="block px-3 py-2 rounded-md text-base font-medium text-accent-100 bg-primary-500 hover:bg-secondary-500 transition duration-200 ease-in-out hover:-translate-y-1 hover:shadow-md active:scale-95"
                onClick={() => setIsOpen(false)}
              >
                Register as Volunteer
              </Link>
              <Link
                to="/login"
                className="block px-3 py-2 rounded-md text-base font-medium text-accent-100 bg-primary-500 hover:bg-secondary-500 transition duration-200 ease-in-out hover:-translate-y-1 hover:shadow-md active:scale-95"
                onClick={() => setIsOpen(false)}
              >
                Sign in
              </Link>
            </>
          )}
>>>>>>> main
        </div>
      </div>
    </nav>
  );
}
