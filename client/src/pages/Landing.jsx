import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Landing() {
  const [activeTab, setActiveTab] = useState('recommended');
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);

  // Carousel images with their titles and descriptions
  const carouselData = [
    {
      image: '/images/carousel_1.jpeg',
      title: 'Empowering Lives',
      description: 'Supporting visually impaired and disabled individuals through education and sports'
    },
    {
      image: '/images/carousel_2.jpeg',
      title: 'Sports Excellence',
      description: 'Promoting blind cricket and other sports activities'
    },
    {
      image: '/images/carousel_3.jpeg',
      title: 'Education Support',
      description: 'Providing quality education and vocational training'
    }
  ];

  // Mock data for demonstration
  const mockEvents = [
    {
      id: 1,
      title: 'Educational Workshop',
      date: '2024-04-15',
      location: 'Bangalore',
      description: 'Workshop on digital literacy for visually impaired students',
      type: 'Education',
      requiredSkills: ['Teaching', 'Computer Knowledge'],
      volunteersNeeded: 5,
      image: '/images/educational_workshop.jpg',
    },
    {
      id: 2,
      title: 'Sports Day',
      date: '2024-04-20',
      location: 'Bangalore',
      description: 'Annual sports day event for blind cricket',
      type: 'Sports',
      requiredSkills: ['Sports Training', 'Event Management'],
      volunteersNeeded: 10,
      image: '/images/sports.jpg',
    },
    {
      id: 3,
      title: 'Art Workshop',
      date: '2024-04-25',
      location: 'Bangalore',
      description: 'Creative arts workshop for children with disabilities',
      type: 'Arts',
      requiredSkills: ['Art Teaching', 'Patience'],
      volunteersNeeded: 8,
      image: '/images/art_workshop.jpg',
    },
    {
      id: 4,
      title: 'Music Therapy',
      date: '2024-05-01',
      location: 'Bangalore',
      description: 'Music therapy session for special needs children',
      type: 'Music',
      requiredSkills: ['Music Knowledge', 'Therapy Experience'],
      volunteersNeeded: 6,
      image: '/images/music_therapy.jpg',
    },
  ];

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentCarouselIndex((prevIndex) => 
        prevIndex === carouselData.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, []);

  // Navigation functions
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

  const EventCard = ({ event }) => (
    <div className="bg-accent rounded-lg shadow-md overflow-hidden">
      <img src={event.image} alt={event.title} className="w-full h-64 object-cover" />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-primary">{event.title}</h3>
        <p className="mt-2 text-secondary">{event.description}</p>
        <div className="mt-4 flex items-center text-sm text-secondary">
          <svg
            className="flex-shrink-0 mr-1.5 h-5 w-5 text-secondary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span>{new Date(event.date).toLocaleDateString()}</span>
        </div>
        <div className="mt-2 flex items-center text-sm text-secondary">
          <svg
            className="flex-shrink-0 mr-1.5 h-5 w-5 text-secondary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span>{event.location}</span>
        </div>
        <div className="mt-4">
          <h4 className="text-sm font-medium text-primary">Required Skills:</h4>
          <div className="mt-2 flex flex-wrap gap-2">
            {event.requiredSkills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-6 flex justify-between items-center">
          <div className="text-sm text-secondary">{event.volunteersNeeded} volunteers needed</div>
          <div className="space-x-2">
            <Link
              to={`/event/${event.id}`}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-accent bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              View Event
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-tertiary">
      {/* Navigation */}
      <nav className="bg-tertiary shadow fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <img
                  className="h-16 w-auto"
                  src="/samarthanam-logo.png"
                  alt="Samarthanam Trust"
                />
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link
                  to="/"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-primary hover:text-secondary"
                >
                  Home
                </Link>
                <Link
                  to="/events"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-primary hover:text-secondary"
                >
                  Events
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-primary hover:text-secondary"
                >
                  About Us
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-primary hover:text-secondary"
                >
                  Contact Us
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/volunteer"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-accent bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Register as Volunteer
              </Link>
              <Link
                to="/login"
                className="ml-8 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-accent bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Add padding to account for fixed navbar */}
      <div className="pt-16">
        {/* Carousel Section */}
        <div className="relative h-[600px] overflow-hidden">
          {carouselData.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentCarouselIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="relative w-full h-full">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.error(`Error loading image: ${slide.image}`);
                    e.target.src = '/samarthanam-logo.png'; // Fallback image
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40 flex items-center justify-center">
                  <div className="text-center text-white px-4 max-w-4xl">
                    <h2 className="text-5xl font-bold mb-6 drop-shadow-lg">{slide.title}</h2>
                    <p className="text-2xl drop-shadow-lg">{slide.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/75 transition-all duration-300"
            aria-label="Previous slide"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/75 transition-all duration-300"
            aria-label="Next slide"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Carousel Indicators */}
          <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-3">
            {carouselData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentCarouselIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentCarouselIndex
                    ? 'bg-white scale-125'
                    : 'bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Mission Section */}
        <div className="py-12 bg-tertiary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
                Our Mission
              </h2>
              <p className="mt-4 max-w-2xl text-xl text-secondary lg:mx-auto">
                To empower visually impaired, disabled and underprivileged people through developmental initiatives focusing on educational, social, economic, cultural and technological aspects.
              </p>
            </div>
          </div>
        </div>

        {/* Initiatives Section */}
        <div className="py-12 bg-accent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mt-10">
              <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                {[
                  {
                    title: 'Education Support',
                    description:
                      'Providing quality education and accommodation to visually impaired and disabled students.',
                  },
                  {
                    title: 'Vocational Training',
                    description: 'Offering skill development and placement-based rehabilitation programs.',
                  },
                  {
                    title: 'Sports Initiatives',
                    description: 'Supporting blind cricket and other sports activities through CABI.',
                  },
                  {
                    title: 'Social Enterprises',
                    description: 'Creating employment opportunities through sustainable social enterprises.',
                  },
                ].map((initiative, index) => (
                  <div key={index} className="relative">
                    <div className="p-6 bg-tertiary rounded-lg shadow">
                      <h3 className="text-lg font-medium text-primary">{initiative.title}</h3>
                      <p className="mt-2 text-base text-secondary">{initiative.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Events Section */}
        <div className="py-12 bg-tertiary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center mb-8">
              <h2 className="text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
                Upcoming Events
              </h2>
              <p className="mt-4 max-w-2xl text-xl text-secondary lg:mx-auto">
                Join us in making a difference. Participate in our upcoming events and activities.
              </p>
            </div>

            {/* Events grid - Show only first 2 events */}
            <div className="grid gap-6 lg:grid-cols-2">
              {mockEvents.slice(0, 2).map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>

            {/* View All Button */}
            <div className="mt-8 text-center">
              <Link
                to="/events"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-accent bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                View All Events
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-primary">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <img
                  src="/samarthanam-logo.png"
                  alt="Samarthanam Trust"
                  className="h-24 w-auto mb-4"
                />
                <h3 className="text-accent text-lg font-semibold">Contact Us</h3>
                <p className="mt-4 text-tertiary">
                  CA Site No. 1, 16th B Cross
                  <br />
                  Koramangala 2nd Block
                  <br />
                  Bangalore - 560034
                </p>
              </div>
              <div>
                <h3 className="text-accent text-lg font-semibold">Quick Links</h3>
                <ul className="mt-4 space-y-2">
                  <li>
                    <a href="#about" className="text-tertiary hover:text-accent">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="#volunteer" className="text-tertiary hover:text-accent">
                      Volunteer
                    </a>
                  </li>
                  <li>
                    <a href="#donate" className="text-tertiary hover:text-accent">
                      Donate
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-accent text-lg font-semibold">Connect With Us</h3>
                <div className="mt-4 flex space-x-6">
                  <a href="#" className="text-tertiary hover:text-accent">
                    <span className="sr-only">Facebook</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                  </a>
                  <a href="#" className="text-tertiary hover:text-accent">
                    <span className="sr-only">Twitter</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-8 border-t border-tertiary pt-8">
              <p className="text-base text-tertiary text-center">
                © 2024 Samarthanam Trust for the Disabled. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}