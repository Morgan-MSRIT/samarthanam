import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getEvents } from "../services/apiService";
import { formatDate } from "../utils/dateFormatter";
import { motion } from "framer-motion";
import {
  FaArrowLeft,
  FaArrowRight,
  FaCalendar,
  FaClock,
  FaMapMarkerAlt,
  FaEye,
  FaInfoCircle,
  FaLightbulb,
  FaHandshake,
  FaHandsHelping,
  FaPaintBrush,
  FaFacebookF,
  FaTwitter,
} from "react-icons/fa";

export default function Landing() {
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUpcomingEvents = async () => {
      try {
        const response = await getEvents();
        if (response.success) {
          const sortedEvents = response.data
            .filter((event) => new Date(event.startDate) > new Date())
            .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
            .slice(0, 2)
            .map((event) => ({
              id: event._id,
              title: event.name,
              startDate: new Date(event.startDate),
              endDate: new Date(event.endDate),
              date: formatDate(event.startDate),
              time: `${new Date(
                event.startDate
              ).toLocaleTimeString()} - ${new Date(
                event.endDate
              ).toLocaleTimeString()}`,
              location: event.location,
              description: event.description,
              image: event.image || "/images/event-placeholder.jpg",
              requiredSkills: event.tags?.map((tag) => tag.name) || [],
              maxParticipants: event.maxParticipants || 50,
              currentParticipants: event.registeredParticipants?.length || 0,
              maxVolunteers: event.totalVolunteerReq,
              currentVolunteers: event.volunteers?.length || 0,
            }));
          setUpcomingEvents(sortedEvents);
        } else {
          setError(response.message);
        }
      } catch (err) {
        setError(err.message || "Failed to fetch upcoming events");
      } finally {
        setLoading(false);
      }
    };

    fetchUpcomingEvents();
  }, []);

  const carouselData = [
    {
      image: "/images/carousel_1.jpeg",
      title: "Empowering Lives",
      description:
        "Supporting visually impaired and disabled individuals through education and sports",
    },
    {
      image: "/images/carousel_2.jpeg",
      title: "Sports Excellence",
      description: "Promoting blind cricket and other sports activities",
    },
    {
      image: "/images/carousel_3.jpeg",
      title: "Education Support",
      description: "Providing quality education and vocational training",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentCarouselIndex((prevIndex) =>
        prevIndex === carouselData.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToPrevious = () => {
    setCurrentCarouselIndex((prevIndex) =>
      prevIndex === 0 ? carouselData.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentCarouselIndex((prevIndex) =>
      prevIndex === carouselData.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="min-h-screen bg-tertiary-100">
      <div className="container mx-auto">
        {/* Carousel Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden"
        >
          {carouselData.map((slide, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: index === currentCarouselIndex ? 1 : 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <div className="relative w-full h-full">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.error(`Error loading image: ${slide.image}`);
                    e.target.src = "/samarthanam-logo.png";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40 flex items-center justify-center">
                  <div className="text-center text-white px-4 max-w-4xl">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 drop-shadow-lg">
                      {slide.title}
                    </h2>
                    <p className="text-lg sm:text-xl md:text-2xl drop-shadow-lg">
                      {slide.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          <button
            onClick={goToPrevious}
            className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 sm:p-3 rounded-full hover:bg-black/75 transition-all duration-300"
            aria-label="Previous slide"
          >
            <FaArrowLeft className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 sm:p-3 rounded-full hover:bg-black/75 transition-all duration-300"
            aria-label="Next slide"
          >
            <FaArrowRight className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>
          <div className="absolute bottom-4 sm:bottom-6 left-0 right-0 flex justify-center space-x-2 sm:space-x-3">
            {carouselData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentCarouselIndex(index)}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                  index === currentCarouselIndex
                    ? "bg-white scale-125"
                    : "bg-white/50 hover:bg-white/75"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="py-8 sm:py-12 bg-tertiary-100"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-primary flex items-center justify-center gap-2">
                <FaInfoCircle className="text-primary-600" /> Our Mission
              </h2>
              <p className="mt-4 max-w-2xl text-base sm:text-lg md:text-xl text-secondary mx-auto">
                To empower visually impaired, disabled, and underprivileged
                people through developmental initiatives focusing on
                educational, social, economic, cultural, and technological
                aspects.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Initiatives Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="py-8 sm:py-12 bg-accent"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mt-6 sm:mt-10">
              <div className="space-y-8 sm:space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                {[
                  {
                    title: "Education Support",
                    description:
                      "Providing quality education and accommodation to visually impaired and disabled students.",
                    icon: <FaLightbulb className="text-primary-600 text-3xl" />,
                  },
                  {
                    title: "Vocational Training",
                    description:
                      "Offering skill development and placement-based rehabilitation programs to all.",
                    icon: <FaHandshake className="text-primary-600 text-3xl" />,
                  },
                  {
                    title: "Sports Initiatives",
                    description:
                      "Supporting blind cricket and other sports activities through CABI.",
                    icon: (
                      <FaHandsHelping className="text-primary-600 text-3xl" />
                    ),
                  },
                  {
                    title: "Social Enterprises",
                    description:
                      "Creating employment opportunities through sustainable social enterprises.",
                    icon: (
                      <FaPaintBrush className="text-primary-600 text-3xl" />
                    ),
                  },
                ].map((initiative, index) => (
                  <div key={index} className="relative">
                    <div className="p-4 sm:p-6 bg-tertiary-100 rounded-lg shadow">
                      <div className="flex items-center gap-2 mb-2">
                        {initiative.icon}
                        <h3 className="text-base sm:text-lg font-medium text-primary">
                          {initiative.title}
                        </h3>
                      </div>
                      <p className="mt-2 text-sm sm:text-base text-secondary">
                        {initiative.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Upcoming Events Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="container mx-auto px-16 py-16"
        >
          <h2 className="text-3xl font-bold text-primary mb-8 text-center flex items-center justify-center gap-2">
            <FaCalendar className="text-primary-600" /> Upcoming Events
          </h2>
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"
              />
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500 text-lg">{error}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-accent rounded-lg shadow-md overflow-hidden"
                >
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-primary mb-2">
                      {event.title}
                    </h3>
                    <p className="text-secondary mb-4">{event.description}</p>
                    <div className="space-y-2 text-sm text-secondary">
                      <div className="flex items-center">
                        <FaCalendar className="mr-2" /> Starts:{" "}
                        {formatDate(event.startDate)}
                      </div>
                      <div className="flex items-center">
                        <FaCalendar className="mr-2" /> Ends:{" "}
                        {formatDate(event.endDate)}
                      </div>
                      <div className="flex items-center">
                        <FaClock className="mr-2" /> {event.time}
                      </div>
                      <div className="flex items-center">
                        <FaMapMarkerAlt className="mr-2" /> {event.location}
                      </div>
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                      <div className="text-sm text-secondary">
                        {event.maxVolunteers - event.currentVolunteers}{" "}
                        volunteers needed
                      </div>
                      <Link
                        to={`/event/${event.id}`}
                        className="flex items-center space-x-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-accent bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                      >
                        <FaEye /> <span>View Event</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="mt-6 sm:mt-8 text-center">
            <Link
              to="/events"
              className="inline-flex items-center space-x-2 px-6 py-3 border border-transparent text-base font-medium rounded-md text-accent bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              <FaEye /> <span>View All Events</span>
            </Link>
          </div>
        </motion.div>

        {/* Footer */}
        <footer className="bg-primary">
          <div className="max-w-7xl mx-auto py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
              <div>
                <img
                  src="/samarthanam-logo.png"
                  alt="Samarthanam Trust"
                  className="h-20 sm:h-24 w-auto mb-4"
                />
                <h3 className="text-accent text-base sm:text-lg font-semibold">
                  Contact Us
                </h3>
                <p className="mt-4 text-tertiary text-sm sm:text-base">
                  CA Site No. 1, 16th B Cross
                  <br />
                  Koramangala 2nd Block
                  <br />
                  Bangalore - 560034
                </p>
              </div>
              <div>
                <h3 className="text-accent text-base sm:text-lg font-semibold">
                  Quick Links
                </h3>
                <ul className="mt-4 space-y-2">
                  <li>
                    <Link
                      to="/about"
                      className="text-tertiary hover:text-accent text-sm sm:text-base"
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/volunteer"
                      className="text-tertiary hover:text-accent text-sm sm:text-base"
                    >
                      Volunteer
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/contact"
                      className="text-tertiary hover:text-accent text-sm sm:text-base"
                    >
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-accent text-base sm:text-lg font-semibold">
                  Connect With Us
                </h3>
                <div className="mt-4 flex space-x-4 sm:space-x-6">
                  <a
                    href="#"
                    className="text-tertiary hover:text-accent"
                    aria-label="Facebook"
                  >
                    <FaFacebookF className="h-5 w-5 sm:h-6 sm:w-6" />
                  </a>
                  <a
                    href="#"
                    className="text-tertiary hover:text-accent"
                    aria-label="Twitter"
                  >
                    <FaTwitter className="h-5 w-5 sm:h-6 sm:w-6" />
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-6 sm:mt-8 border-t border-tertiary pt-6 sm:pt-8">
              <p className="text-sm sm:text-base text-tertiary text-center">
                © 2024 Samarthanam Trust for the Disabled. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
