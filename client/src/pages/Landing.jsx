import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Landing() {
  const [activeTab, setActiveTab] = useState('recommended');
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);

  const carouselData = [
    {
      image: '/images/carousel_1.jpeg',
      title: 'Empowering Lives',
      description: 'Supporting visually impaired and disabled individuals through education and sports',
    },
    {
      image: '/images/carousel_2.jpeg',
      title: 'Sports Excellence',
      description: 'Promoting blind cricket and other sports activities',
    },
    {
      image: '/images/carousel_3.jpeg',
      title: 'Education Support',
      description: 'Providing quality education and vocational training',
    },
  ];

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

  const EventCard = ({ event }) => (
    <div className="bg-accent rounded-lg shadow-md overflow-hidden">
      <img src={event.image} alt={event.title} className="w-full h-48 sm:h-64 object-cover" />
      <div className="p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-semibold text-primary">{event.title}</h3>
        <p className="mt-2 text-sm sm:text-base text-secondary">{event.description}</p>
        <div className="mt-3 flex items-center text-xs sm:text-sm text-secondary">
          <svg className="flex-shrink-0 mr-1.5 h-4 w-4 sm:h-5 sm:w-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>{new Date(event.date).toLocaleDateString()}</span>
        </div>
        <div className="mt-2 flex items-center text-xs sm:text-sm text-secondary">
          <svg className="flex-shrink-0 mr-1.5 h-4 w-4 sm:h-5 sm:w-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{event.location}</span>
        </div>
        <div className="mt-3 sm:mt-4">
          <h4 className="text-xs sm:text-sm font-medium text-primary">Required Skills:</h4>
          <div className="mt-2 flex flex-wrap gap-2">
            {event.requiredSkills.map((skill) => (
              <span key={skill} className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-4 sm:mt-6 flex justify-between items-center">
          <div className="text-xs sm:text-sm text-secondary">{event.volunteersNeeded} volunteers needed</div>
          <div className="space-x-2">
            <Link
              to={`/event/${event.id}`}
              className="inline-flex items-center px-2.5 py-1.5 sm:px-3 sm:py-2 border border-transparent text-sm font-medium rounded-md text-accent bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
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
      <div className="container mx-auto">
        {/* Carousel Section */}
        <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
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
                    e.target.src = '/samarthanam-logo.png';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40 flex items-center justify-center">
                  <div className="text-center text-white px-4 max-w-4xl">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 drop-shadow-lg">
                      {slide.title}
                    </h2>
                    <p className="text-lg sm:text-xl md:text-2xl drop-shadow-lg">{slide.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <button
            onClick={goToPrevious}
            className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 sm:p-3 rounded-full hover:bg-black/75 transition-all duration-300"
            aria-label="Previous slide"
          >
            <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={goToNext}
            className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 sm:p-3 rounded-full hover:bg-black/75 transition-all duration-300"
            aria-label="Next slide"
          >
            <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <div className="absolute bottom-4 sm:bottom-6 left-0 right-0 flex justify-center space-x-2 sm:space-x-3">
            {carouselData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentCarouselIndex(index)}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                  index === currentCarouselIndex ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Mission Section */}
        <div className="py-8 sm:py-12 bg-tertiary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-primary">
                Our Mission
              </h2>
              <p className="mt-4 max-w-2xl text-base sm:text-lg md:text-xl text-secondary mx-auto">
                To empower visually impaired, disabled and underprivileged people through developmental initiatives focusing on educational, social, economic, cultural and technological aspects.
              </p>
            </div>
          </div>
        </div>

        {/* Initiatives Section */}
        <div className="py-8 sm:py-12 bg-accent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mt-6 sm:mt-10">
              <div className="space-y-8 sm:space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                {[
                  {
                    title: 'Education Support',
                    description: 'Providing quality education and accommodation to visually impaired and disabled students.',
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
                    <div className="p-4 sm:p-6 bg-tertiary rounded-lg shadow">
                      <h3 className="text-base sm:text-lg font-medium text-primary">{initiative.title}</h3>
                      <p className="mt-2 text-sm sm:text-base text-secondary">{initiative.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Events Section */}
        <div className="py-8 sm:py-12 bg-tertiary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-primary">
                Upcoming Events
              </h2>
              <p className="mt-4 max-w-2xl text-base sm:text-lg md:text-xl text-secondary mx-auto">
                Join us in making a difference. Participate in our upcoming events and activities.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
              {mockEvents.slice(0, 2).map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
            <div className="mt-6 sm:mt-8 text-center">
              <Link
                to="/events"
                className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 border border-transparent text-sm sm:text-base font-medium rounded-md text-accent bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                View All Events
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-primary">
          <div className="max-w-7xl mx-auto py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
              <div>
                <img src="/samarthanam-logo.png" alt="Samarthanam Trust" className="h-20 sm:h-24 w-auto mb-4" />
                <h3 className="text-accent text-base sm:text-lg font-semibold">Contact Us</h3>
                <p className="mt-4 text-tertiary text-sm sm:text-base">
                  CA Site No. 1, 16th B Cross
                  <br />
                  Koramangala 2nd Block
                  <br />
                  Bangalore - 560034
                </p>
              </div>
              <div>
                <h3 className="text-accent text-base sm:text-lg font-semibold">Quick Links</h3>
                <ul className="mt-4 space-y-2">
                  <li>
                    <a href="#about" className="text-tertiary hover:text-accent text-sm sm:text-base">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="#volunteer" className="text-tertiary hover:text-accent text-sm sm:text-base">
                      Volunteer
                    </a>
                  </li>
                  <li>
                    <a href="#donate" className="text-tertiary hover:text-accent text-sm sm:text-base">
                      Donate
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-accent text-base sm:text-lg font-semibold">Connect With Us</h3>
                <div className="mt-4 flex space-x-4 sm:space-x-6">
                  <a href="#" className="text-tertiary hover:text-accent">
                    <span className="sr-only">Facebook</span>
                    <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                  </a>
                  <a href="#" className="text-tertiary hover:text-accent">
                    <span className="sr-only">Twitter</span>
                    <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
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