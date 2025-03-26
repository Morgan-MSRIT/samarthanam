import { useContext, useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Notifications from "../../pages/Notifications"; // Adjust path as needed
import { FaBell, FaUniversalAccess, FaGlobe } from "react-icons/fa"; // Added FaGlobe

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated, logout } = useContext(AuthContext);
  const [highContrastMode, setHighContrastMode] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isAccessibilityOpen, setIsAccessibilityOpen] = useState(false);

  useEffect(() => {
    if (highContrastMode) {
      document.body.classList.add("high-contrast");
    } else {
      document.body.classList.remove("high-contrast");
    }
  }, [highContrastMode]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setIsNotificationsOpen(false);
    setDropdownOpen(false);
    setIsAccessibilityOpen(false);
  };

  const toggleHighContrastMode = () => setHighContrastMode(!highContrastMode);

  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
    setIsOpen(false);
    setDropdownOpen(false);
    setIsAccessibilityOpen(false);
  };

  const toggleProfileDropdown = () => {
    setDropdownOpen(!dropdownOpen);
    setIsNotificationsOpen(false);
    setIsOpen(false);
    setIsAccessibilityOpen(false);
  };

  const toggleAccessibility = () => {
    setIsAccessibilityOpen(!isAccessibilityOpen);
    setIsOpen(false);
    setIsNotificationsOpen(false);
    setDropdownOpen(false);
  };

  const getDesktopLinkClass = ({ isActive }) => {
    const baseClass =
      "inline-flex items-center px-2 py-1 text-sm font-medium transition duration-200 ease-in-out hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-accent-300";
    return highContrastMode
      ? isActive
        ? `${baseClass} text-yellow-100 bg-gray-800`
        : `${baseClass} text-yellow-300 hover:text-yellow-100 hover:bg-gray-800`
      : isActive
      ? `${baseClass} text-secondary-500 bg-tertiary-400`
      : `${baseClass} text-primary-700 hover:text-secondary-500 hover:bg-tertiary-400`;
  };

  const getMobileLinkClass = ({ isActive }) => {
    const baseClass =
      "block px-4 py-3 rounded-md text-lg font-medium transition duration-200 ease-in-out hover:scale-105 active:scale-95";
    return highContrastMode
      ? isActive
        ? `${baseClass} text-yellow-100 bg-gray-800`
        : `${baseClass} text-yellow-300 hover:text-yellow-100 hover:bg-gray-800`
      : isActive
      ? `${baseClass} text-secondary-500 bg-tertiary-400`
      : `${baseClass} text-primary-700 hover:text-secondary-500 hover:bg-accent-200`;
  };

  return (
    <nav
      className={`shadow fixed w-full z-50 ${
        highContrastMode
          ? "bg-black text-yellow-300 border-white border-2"
          : "bg-tertiary-300"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 md:h-16">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link to="/">
              <img
                className={`h-16 md:h-12 w-auto ${
                  highContrastMode ? "filter invert" : ""
                }`}
                src="/samarthanam-logo.png"
                alt="Samarthanam Trust"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
              <NavLink to="/" className={getDesktopLinkClass}>
                Home
              </NavLink>
              {isAuthenticated && user?.role === "organiser" && (
                <NavLink
                  to="/organizer/dashboard"
                  className={getDesktopLinkClass}
                >
                  Dashboard
                </NavLink>
              )}
              {isAuthenticated && user?.role === "admin" && (
                <NavLink to="/admin/dashboard" className={getDesktopLinkClass}>
                  Dashboard
                </NavLink>
              )}
              <NavLink to="/events" className={getDesktopLinkClass}>
                Events
              </NavLink>
              {(!isAuthenticated ||
                (user?.role !== "admin" && user?.role !== "organiser")) && (
                <>
                  <NavLink to="/about" className={getDesktopLinkClass}>
                    About Us
                  </NavLink>
                  <NavLink to="/contact" className={getDesktopLinkClass}>
                    Contact Us
                  </NavLink>
                </>
              )}
            </div>
          </div>

          {/* Desktop Right Section */}
          <div className="hidden md:flex md:items-center md:space-x-2 flex-wrap">
            {/* Google Translate Icon */}

            <div
              id="google_translate_element"
              className="text-accent-200 hover:text-secondary-500 focus:outline-none cursor-pointer p-1"
              aria-label="Translate"
            ></div>

            {/* Accessibility Dropdown */}
            <div className="relative">
              <button
                onClick={toggleAccessibility}
                className="text-primary-700 hover:text-secondary-500 focus:outline-none cursor-pointer p-1"
                aria-label="Accessibility features"
              >
                <FaUniversalAccess size={24} />
              </button>
              {isAccessibilityOpen && (
                <div
                  className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg ${
                    highContrastMode
                      ? "bg-black border-yellow-300 border-2"
                      : "bg-tertiary-300"
                  } z-50 p-2`}
                >
                  <div className="space-y-2">
                    <button
                      onClick={toggleHighContrastMode}
                      className={`w-full text-left px-2 py-1 text-sm font-medium rounded-md transition duration-200 ease-in-out hover:-translate-y-1 hover:shadow-md active:scale-95 cursor-pointer ${
                        highContrastMode
                          ? "bg-yellow-300 text-black hover:bg-yellow-100"
                          : "bg-primary-500 text-accent-100 hover:bg-secondary-500"
                      }`}
                    >
                      {highContrastMode ? "Contrast Off" : "Contrast On"}
                    </button>
                  </div>
                </div>
              )}
            </div>
            {isAuthenticated ? (
              <>
                {/* Notifications Button and Dropdown */}
                <div className="relative">
                  <button
                    onClick={toggleNotifications}
                    className="text-primary-700 hover:text-secondary-500 focus:outline-none cursor-pointer p-1"
                    aria-label="Toggle notifications"
                  >
                    <FaBell size={24} />
                  </button>
                  {isNotificationsOpen && (
                    <div
                      className={`absolute right-0 mt-2 w-64 rounded-md shadow-lg ${
                        highContrastMode
                          ? "bg-black border-yellow-300 border-2"
                          : "bg-tertiary-300"
                      } z-50 p-2`}
                    >
                      <Notifications />
                    </div>
                  )}
                </div>
                {/* Profile Dropdown */}
                <div className="relative">
                  <button
                    onClick={toggleProfileDropdown}
                    className="flex items-center space-x-2 text-sm font-medium text-primary-700 hover:text-secondary-500 focus:outline-none cursor-pointer hover:scale-101 active:scale-95"
                  >
                    <span className="w-8 h-8 rounded-full bg-primary-500 text-accent-100 flex items-center justify-center">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                    <span>{user.name}</span>
                  </button>
                  {dropdownOpen && (
                    <div
                      className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg ${
                        highContrastMode
                          ? "bg-black border-yellow-300 border-2"
                          : "bg-tertiary-300"
                      } z-50`}
                    >
                      <div className="py-1">
                        <button
                          onClick={() => {
                            logout();
                            setDropdownOpen(false);
                          }}
                          className={`block w-full text-left px-4 py-2 text-sm cursor-pointer ${
                            highContrastMode
                              ? "text-yellow-300 hover:bg-gray-800"
                              : "text-primary-700 hover:bg-accent-200"
                          }`}
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/volunteer"
                  className="inline-flex items-center px-2 py-1 text-sm font-medium rounded-md text-accent-100 bg-primary-500 hover:bg-secondary-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-300 transition duration-200 ease-in-out hover:-translate-y-1 hover:shadow-md active:scale-95 cursor-pointer"
                >
                  Volunteer
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center px-2 py-1 text-sm font-medium rounded-md text-accent-100 bg-primary-500 hover:bg-secondary-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-300 transition duration-200 ease-in-out hover:-translate-y-1 hover:shadow-md active:scale-95 cursor-pointer"
                >
                  Sign in
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button and Icons */}
          <div className="md:hidden flex items-center space-x-2">
            <div
              id="google_translate_element"
              className="text-accent-200 hover:text-secondary-500 focus:outline-none cursor-pointer p-1"
              aria-label="Translate"
            ></div>
            <button
              onClick={toggleAccessibility}
              className="text-primary-700 hover:text-secondary-500 focus:outline-none cursor-pointer p-1"
              aria-label="Accessibility features"
            >
              <FaUniversalAccess size={24} />
            </button>
            {isAuthenticated && (
              <button
                onClick={toggleNotifications}
                className="text-primary-700 hover:text-secondary-500 focus:outline-none cursor-pointer p-1"
                aria-label="Toggle notifications"
              >
                <FaBell size={24} />
              </button>
            )}
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-primary-700 hover:text-secondary-500 hover:bg-tertiary-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent-300 cursor-pointer"
              aria-expanded="false"
              aria-controls="mobile-menu"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg
                  className="block h-8 w-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
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
                  className="block h-8 w-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed w-full ${
          isOpen
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "-translate-y-full opacity-0 pointer-events-none"
        } ${
          highContrastMode
            ? "bg-black border-yellow-300 border-2"
            : "bg-tertiary-300"
        } shadow-lg z-40 transition-all duration-300`}
        style={{ top: "5rem", left: 0, right: 0 }}
      >
        <div className="px-4 py-4 space-y-2">
          <NavLink
            to="/"
            className={getMobileLinkClass}
            onClick={() => setIsOpen(false)}
          >
            Home
          </NavLink>
          {isAuthenticated && user?.role === "organiser" && (
            <NavLink
              to="/organizer/dashboard"
              className={getMobileLinkClass}
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </NavLink>
          )}
          {isAuthenticated && user?.role === "admin" && (
            <NavLink
              to="/admin/dashboard"
              className={getMobileLinkClass}
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </NavLink>
          )}
          <NavLink
            to="/events"
            className={getMobileLinkClass}
            onClick={() => setIsOpen(false)}
          >
            Events
          </NavLink>
          {(!isAuthenticated ||
            (user?.role !== "admin" && user?.role !== "organiser")) && (
            <>
              <NavLink
                to="/about"
                className={getMobileLinkClass}
                onClick={() => setIsOpen(false)}
              >
                About Us
              </NavLink>
              <NavLink
                to="/contact"
                className={getMobileLinkClass}
                onClick={() => setIsOpen(false)}
              >
                Contact Us
              </NavLink>
            </>
          )}
          {isAuthenticated ? (
            <>
              <span className="block px-4 py-3 text-lg text-primary-700">
                Welcome, {user.name}
              </span>
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="block w-full text-left px-4 py-3 rounded-md text-lg font-medium text-accent-100 bg-primary-500 hover:bg-secondary-500 transition duration-200 ease-in-out hover:-translate-y-1 hover:shadow-md active:scale-95 cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/volunteer"
                className="block px-4 py-3 rounded-md text-lg font-medium text-accent-100 bg-primary-500 hover:bg-secondary-500 transition duration-200 ease-in-out hover:-translate-y-1 hover:shadow-md active:scale-95 cursor-pointer"
                onClick={() => setIsOpen(false)}
              >
                Register as Volunteer
              </Link>
              <Link
                to="/login"
                className="block px-4 py-3 rounded-md text-lg font-medium text-accent-100 bg-primary-500 hover:bg-secondary-500 transition duration-200 ease-in-out hover:-translate-y-1 hover:shadow-md active:scale-95 cursor-pointer"
                onClick={() => setIsOpen(false)}
              >
                Sign in
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Accessibility Dropdown */}
      {isAccessibilityOpen && (
        <div
          className={`md:hidden fixed w-full ${
            highContrastMode
              ? "bg-black border-yellow-300 border-2"
              : "bg-tertiary-300"
          } shadow-lg z-40 p-4`}
          style={{ top: "5rem", left: 0, right: 0 }}
        >
          <div className="space-y-2">
            <button
              onClick={toggleHighContrastMode}
              className={`w-full text-left px-4 py-3 rounded-md text-lg font-medium text-accent-100 bg-primary-500 hover:bg-secondary-500 transition duration-200 ease-in-out hover:-translate-y-1 hover:shadow-md active:scale-95 cursor-pointer ${
                highContrastMode ? "bg-yellow-300 text-black" : ""
              }`}
            >
              {highContrastMode
                ? "Disable High Contrast"
                : "Enable High Contrast"}
            </button>
          </div>
        </div>
      )}

      {/* Mobile Notifications Dropdown */}
      {isAuthenticated && isNotificationsOpen && (
        <div
          className={`md:hidden fixed w-full ${
            highContrastMode
              ? "bg-black border-yellow-300 border-2"
              : "bg-tertiary-300"
          } shadow-lg z-40 p-4`}
          style={{ top: "5rem", left: 0, right: 0 }}
        >
          <Notifications />
        </div>
      )}
    </nav>
  );
}
