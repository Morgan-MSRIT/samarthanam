import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated, logout } = useContext(AuthContext);
  const [highContrastMode, setHighContrastMode] = useState(false);

  useEffect(() => {
    if (highContrastMode) {
      document.body.classList.add("high-contrast");
    } else {
      document.body.classList.remove("high-contrast");
    }
  }, [highContrastMode]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleHighContrastMode = () => {
    setHighContrastMode(!highContrastMode);
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
        <div className="flex justify-between h-20 md:h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img
                className={`h-16 md:h-12 w-auto ${
                  highContrastMode ? "filter invert" : ""
                }`}
                src="/samarthanam-logo.png"
                alt="Samarthanam Trust"
              />
            </div>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <Link
                to="/"
                className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium text-primary-700 hover:text-secondary-500 hover:bg-tertiary-400 focus:outline-none focus:ring-2 focus:ring-primary-600 transition duration-200 ease-in-out hover:scale-105 active:scale-95"
              >
                Home
              </Link>
              {isAuthenticated && user.role === "admin" ? (
                <>
                  <Link
                    to="/admin/dashboard"
                    className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium text-primary-700 hover:text-secondary-500 hover:bg-tertiary-400 focus:outline-none focus:ring-2 focus:ring-primary-600 transition duration-200 ease-in-out hover:scale-105 active:scale-95"
                  >
                    Admin Dashboard
                  </Link>
                </>
              ) : (
                <>
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
                </>
              )}
              <Link
                to="/events"
                className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium text-primary-700 hover:text-secondary-500 hover:bg-tertiary-400 focus:outline-none focus:ring-2 focus:ring-primary-600 transition duration-200 ease-in-out hover:scale-105 active:scale-95"
              >
                Events
              </Link>
              {user.role !== "organiser" && user.role !== "admin" && (
                <>
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
                </>
              )}
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <div className="inline-flex items-center px-2 border border-transparent text-sm font-medium rounded-md text-accent-100 bg-primary-500 hover:bg-secondary-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600 transition duration-200 ease-in-out hover:-translate-y-1 hover:shadow-md active:scale-95">
              <div
                id="google_translate_element"
                className="inline-flex items-center"
              ></div>
              <span>Translate</span>
            <button
              onClick={toggleHighContrastMode}
              className={`inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-accent-100 bg-primary-500 hover:bg-secondary-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600 transition duration-200 ease-in-out hover:-translate-y-1 hover:shadow-md active:scale-95 ${
                highContrastMode ? "bg-yellow-300 text-black" : ""
              }`}
            >
              {highContrastMode
                ? "Disable High Contrast"
                : "Enable High Contrast"}
            </button>
            <div className="inline-flex items-center h-[38px] px-3 py-2 border border-transparent text-sm font-medium rounded-md text-accent-100 bg-primary-500 hover:bg-secondary-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600 transition duration-200 ease-in-out hover:-translate-y-1 hover:shadow-md active:scale-95">
              <div
                id="google_translate_element"
                className="inline-flex items-center h-full"
              ></div>
              <span className="ml-2">Translate</span>
            </div>
            {isAuthenticated ? (
              <>
                <span className="text-primary-700">Welcome, {user.name}</span>
                {user.role === "organiser" && (
                  <>
                    <Link
                      to="/organizer/create-events"
                      className="inline-flex items-center px-4 py-2 text-sm font-medium text-accent-100 bg-primary-500 hover:bg-secondary-500 rounded-md transition duration-200 ease-in-out hover:-translate-y-1 hover:shadow-md active:scale-95"
                    >
                      Create Events
                    </Link>
                    <Link
                      to="/organizer/manage-events"
                      className="inline-flex items-center px-4 py-2 text-sm font-medium text-accent-100 bg-primary-500 hover:bg-secondary-500 rounded-md transition duration-200 ease-in-out hover:-translate-y-1 hover:shadow-md active:scale-95"
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
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-primary-700 hover:text-secondary-500 hover:bg-tertiary-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-600"
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

      {/* Mobile menu */}
      <div
        className={`md:hidden fixed w-full ${isOpen ? "block" : "hidden"} ${
          highContrastMode
            ? "bg-black border-yellow-300 border-2"
            : "bg-tertiary-300"
        } shadow-lg z-40`}
        style={{ top: "5rem", left: 0, right: 0 }}
      >
        <div className="px-4 py-4 space-y-2">
          <Link
            to="/"
            className="block px-4 py-3 rounded-md text-lg font-medium text-primary-700 hover:text-secondary-500 hover:bg-accent-200 transition duration-200 ease-in-out hover:scale-105 active:scale-95"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          {user.role === "organiser" && (
            <Link
              to="/organizer/dashboard"
              className="block px-3 py-2 rounded-md text-base font-medium text-primary-700 hover:text-secondary-500 hover:bg-accent-200 transition duration-200 ease-in-out hover:scale-105 active:scale-95"
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </Link>
          )}
          <Link
            to="/events"
            className="block px-4 py-3 rounded-md text-lg font-medium text-primary-700 hover:text-secondary-500 hover:bg-accent-200 transition duration-200 ease-in-out hover:scale-105 active:scale-95"
            onClick={() => setIsOpen(false)}
          >
            Events
          </Link>
          {isAuthenticated && user.role === "admin" ? (
            <>
              <>
                <Link
                  to="/admin/dashboard"
                  className="block px-4 py-3 rounded-md text-lg font-medium text-primary-700 hover:text-secondary-500 hover:bg-accent-200 transition duration-200 ease-in-out hover:scale-105 active:scale-95"
                  onClick={() => setIsOpen(false)}
                >
                  Admin Dashboard
                </Link>
              </>
            </>
          ) : (
            <>
              <Link
                to="/about"
                className="block px-4 py-3 rounded-md text-lg font-medium text-primary-700 hover:text-secondary-500 hover:bg-accent-200 transition duration-200 ease-in-out hover:scale-105 active:scale-95"
                onClick={() => setIsOpen(false)}
              >
                About Us
              </Link>
              <Link
                to="/contact"
                className="block px-4 py-3 rounded-md text-lg font-medium text-primary-700 hover:text-secondary-500 hover:bg-accent-200 transition duration-200 ease-in-out hover:scale-105 active:scale-95"
                onClick={() => setIsOpen(false)}
              >
                Contact Us
              </Link>
            </>
          )}
          <button
            onClick={toggleHighContrastMode}
            className={`w-full text-left px-4 py-3 rounded-md text-lg font-medium text-accent-100 bg-primary-500 hover:bg-secondary-500 transition duration-200 ease-in-out hover:-translate-y-1 hover:shadow-md active:scale-95 ${
              highContrastMode ? "bg-yellow-300 text-black" : ""
            }`}
          >
            {highContrastMode
              ? "Disable High Contrast"
              : "Enable High Contrast"}
          </button>
          <div className="px-4 py-3">
            <div id="google_translate_element" className="w-full"></div>
          </div>
          {isAuthenticated ? (
            <>
              <span className="block px-4 py-3 text-lg text-primary-700">
                Welcome, {user.name}
              </span>
              {user.role === "organiser" && (
                <>
                  <Link
                    to="/organizer/create-events"
                    className="block px-4 py-3 rounded-md text-lg font-medium text-accent-100 bg-primary-500 hover:bg-secondary-500 transition duration-200 ease-in-out hover:-translate-y-1 hover:shadow-md active:scale-95"
                    onClick={() => setIsOpen(false)}
                  >
                    Create Events
                  </Link>
                  <Link
                    to="/organizer/manage-events"
                    className="block px-4 py-3 rounded-md text-lg font-medium text-accent-100 bg-primary-500 hover:bg-secondary-500 transition duration-200 ease-in-out hover:-translate-y-1 hover:shadow-md active:scale-95"
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
                className="block w-full text-left px-4 py-3 rounded-md text-lg font-medium text-accent-100 bg-primary-500 hover:bg-secondary-500 transition duration-200 ease-in-out hover:-translate-y-1 hover:shadow-md active:scale-95"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/volunteer"
                className="block px-4 py-3 rounded-md text-lg font-medium text-accent-100 bg-primary-500 hover:bg-secondary-500 transition duration-200 ease-in-out hover:-translate-y-1 hover:shadow-md active:scale-95"
                onClick={() => setIsOpen(false)}
              >
                Register as Volunteer
              </Link>
              <Link
                to="/login"
                className="block px-4 py-3 rounded-md text-lg font-medium text-accent-100 bg-primary-500 hover:bg-secondary-500 transition duration-200 ease-in-out hover:-translate-y-1 hover:shadow-md active:scale-95"
                onClick={() => setIsOpen(false)}
              >
                Sign in
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
