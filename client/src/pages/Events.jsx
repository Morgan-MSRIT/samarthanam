import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Landing() {
  const [activeTab, setActiveTab] = useState('recommended');

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
      image: '/workshop.jpg'
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
      image: '/sports.jpg'
    }
  ];

  const EventCard = ({ event }) => (
    <div className="bg-tertiary rounded-lg shadow-md overflow-hidden">
      <img
        src={event.image}
        alt={event.title}
        className="w-full h-48 object-cover"
      />
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
        <div className="mt-4">
          <h4 className="text-sm font-medium text-primary">Required Skills:</h4>
          <div className="mt-2 flex flex-wrap gap-2">
            {event.requiredSkills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent text-primary"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-6 flex justify-between items-center">
          <div className="text-sm text-secondary">
            {event.volunteersNeeded} volunteers needed
          </div>
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
      <nav className="bg-accent shadow fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <img
                  className="h-12 w-auto"
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
              </div>
            </div>
            <div className="flex items-center">
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
        {/* Hero Section */}
        <div className="relative bg-tertiary overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="relative z-10 pb-8 bg-tertiary sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
              <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                <div className="sm:text-center lg:text-left">
                  <h1 className="text-4xl tracking-tight font-extrabold text-primary sm:text-5xl md:text-6xl">
                    <span className="block">Empowering Lives</span>
                    <span className="block text-secondary">Through Inclusion</span>
                  </h1>
                  <p className="mt-3 text-base text-secondary sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                    Samarthanam Trust for the Disabled is a National Award-winning NGO working for the empowerment of persons with disabilities and the underserved through diverse initiatives.
                  </p>
                </div>
              </main>
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="py-12 bg-accent">
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
        <div className="py-12 bg-tertiary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mt-10">
              <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                {[
                  {
                    title: 'Education Support',
                    description: 'Providing quality education and accommodation to visually impaired and disabled students.'
                  },
                  {
                    title: 'Vocational Training',
                    description: 'Offering skill development and placement-based rehabilitation programs.'
                  },
                  {
                    title: 'Sports Initiatives',
                    description: 'Supporting blind cricket and other sports activities through CABI.'
                  },
                  {
                    title: 'Social Enterprises',
                    description: 'Creating employment opportunities through sustainable social enterprises.'
                  }
                ].map((initiative, index) => (
                  <div key={index} className="relative">
                    <div className="p-6 bg-accent rounded-lg shadow">
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
        <div className="py-12 bg-accent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center mb-8">
              <h2 className="text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
                Upcoming Events
              </h2>
              <p className="mt-4 max-w-2xl text-xl text-secondary lg:mx-auto">
                Join us in making a difference. Participate in our upcoming events and activities.
              </p>
            </div>

            {/* Tabs */}
            <div className="mt-4 mb-8">
              <div className="sm:hidden">
                <select
                  className="block w-full rounded-md border-tertiary focus:border-primary focus:ring-primary text-primary bg-accent"
                  value={activeTab}
                  onChange={(e) => setActiveTab(e.target.value)}
                >
                  <option value="recommended">Recommended Events</option>
                  <option value="all">All Events</option>
                </select>
              </div>
              <div className="hidden sm:block">
                <nav className="flex justify-center space-x-4" aria-label="Tabs">
                  <button
                    className={`${
                      activeTab === 'recommended'
                        ? 'bg-tertiary text-primary'
                        : 'text-secondary hover:text-primary'
                    } px-3 py-2 font-medium text-sm rounded-md`}
                    onClick={() => setActiveTab('recommended')}
                  >
                    Recommended Events
                  </button>
                  <button
                    className={`${
                      activeTab === 'all'
                        ? 'bg-tertiary text-primary'
                        : 'text-secondary hover:text-primary'
                    } px-3 py-2 font-medium text-sm rounded-md`}
                    onClick={() => setActiveTab('all')}
                  >
                    All Events
                  </button>
                </nav>
              </div>
            </div>

            {/* Events grid */}
            <div className="grid gap-6 lg:grid-cols-2">
              {mockEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-primary">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-accent text-lg font-semibold">Contact Us</h3>
                <p className="mt-4 text-tertiary">
                  CA Site No. 1, 16th B Cross<br />
                  Koramangala 2nd Block<br />
                  Bangalore - 560034
                </p>
              </div>
              <div>
                <h3 className="text-accent text-lg font-semibold">Quick Links</h3>
                <ul className="mt-4 space-y-2">
                  <li>
                    <a href="#about" className="text-tertiary hover:text-accent">About Us</a>
                  </li>
                  <li>
                    <a href="#volunteer" className="text-black hover:text-accent">Volunteer</a>
                  </li>
                  <li>
                    <a href="#donate" className="text-tertiary hover:text-accent">Donate</a>
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