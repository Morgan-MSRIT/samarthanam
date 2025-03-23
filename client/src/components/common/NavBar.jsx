import { Link } from 'react-router-dom';
import { useState } from 'react';
import ScreenReader from '../accessibility/ScreenReader';

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-tertiary-300 shadow fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6">
        <div className="flex justify-between h-16">
          {/* Left Section: Logo and Links */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img
                className="h-12 w-auto"
                src="/samarthanam-logo.png"
                alt="Samarthanam Trust"
              />
            </div>
            {/* Desktop Navigation Links */}
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <Link
                to="/"
                className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium text-primary-700 hover:text-secondary-500 hover:bg-tertiary-400 focus:outline-none focus:ring-2 focus:ring-primary-600 transition duration-200 ease-in-out hover:scale-105 active:scale-95"
              >
                Home
              </Link>
              <Link
                to="/events"
                className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium text-primary-700 hover:text-secondary-500 hover:bg-tertiary-400 focus:outline-none focus:ring-2 focus:ring-primary-600 transition duration-200 ease-in-out hover:scale-105 active:scale-95"
              >
                Events
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium text-primary-700 hover:text-secondary-500 hover:bg-tertiary-400 focus:outline-none focus:ring-2 focus:ring-primary-600 transition duration-200 ease-in-out hover:scale-105 active:scale-95"
              >
                About Us
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium text-primary-700 hover:text-secondary-500 hover:bg-tertiary-400 focus:outline-none focus:ring-2 focus:ring-primary-600 transition duration-200 ease-in-out hover:scale-105 active:scale-95"
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* Right Section: Accessibility Features and Buttons (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            {/* <ScreenReader /> */}
            <div className="inline-flex items-center px-2 border border-transparent text-sm font-medium rounded-md text-accent-100 bg-primary-500 hover:bg-secondary-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600 transition duration-200 ease-in-out hover:-translate-y-1 hover:shadow-md active:scale-95">
              <div id="google_translate_element" className="inline-flex items-center"></div>
              <span>Translate</span>
            </div>
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
          </div>

          {/* Hamburger Menu Button (Mobile) */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className={`inline-flex items-center justify-center p-2 rounded-md text-primary-700 hover:text-secondary-500 hover:bg-accent-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600 transition duration-300 ease-in-out hover:scale-110 ${isOpen ? 'rotate-90' : ''}`}
              aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              <span className="sr-only">{isOpen ? 'Close menu' : 'Open menu'}</span>
              {isOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (Collapsible) */}
      <div
        className={`md:hidden bg-tertiary-300 border-t border-gray-400 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
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
          {/* <div className="px-3 py-2">
            <ScreenReader />
          </div> */}
          <div id="google_translate_element" className="block w-full"></div>
          <Link
            to="/volunteer"
            className="block px-3 py-2 rounded-md text-base font-medium text-accent-100 bg-primary-500 hover:bg-secondary-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600 transition duration-200 ease-in-out hover:-translate-y-1 hover:shadow-md active:scale-95"
            onClick={() => setIsOpen(false)}
          >
            Register as Volunteer
          </Link>
          <Link
            to="/login"
            className="block px-3 py-2 rounded-md text-base font-medium text-accent-100 bg-primary-500 hover:bg-secondary-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600 transition duration-200 ease-in-out hover:-translate-y-1 hover:shadow-md active:scale-95"
            onClick={() => setIsOpen(false)}
          >
            Sign in
          </Link>

          <Link to="/organizer/create-events" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-primary hover:text-secondary">
  Create Events
</Link>
<Link to="/organizer/manage-events" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-primary hover:text-secondary">
  Manage Events
</Link>
<Link to="/organizer/analytics" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-primary hover:text-secondary">
  Analytics
</Link>


<Link
    to="/organizer/create-tasks"
    className="inline-block px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
>
    Create Tasks
</Link> 

<Link to="/admin/dashboard">Admin Dashboard</Link>



        </div>
      </div>
    </nav>
  );
}