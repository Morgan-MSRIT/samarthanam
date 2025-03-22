import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Events() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

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
      image: '/images/sport.jpg',
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
      image: '/images/art.jpg',
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

  const filteredEvents = mockEvents.filter(event => {
    const matchesTab = activeTab === 'all' || (activeTab === 'recommended' && event.isRecommended);
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.type.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

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
                <Link to="/">
                  <img
                    className="h-12 w-auto"
                    src="/samarthanam-logo.png"
                    alt="Samarthanam Trust"
                  />
                </Link>
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-primary">Upcoming Events</h1>
            <p className="mt-4 text-xl text-secondary">
              Join us in making a difference. Participate in our upcoming events and activities.
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="w-full sm:w-96">
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 rounded-md border border-primary-300 focus:border-primary-500 focus:ring-primary-500 text-primary bg-accent"
                />
              </div>
              <div className="flex space-x-4">
                <button
                  className={`${
                    activeTab === 'all'
                      ? 'bg-primary text-accent'
                      : 'text-primary hover:text-secondary'
                  } px-4 py-2 font-medium text-sm rounded-md`}
                  onClick={() => setActiveTab('all')}
                >
                  All Events
                </button>
                <button
                  className={`${
                    activeTab === 'recommended'
                      ? 'bg-primary text-accent'
                      : 'text-primary hover:text-secondary'
                  } px-4 py-2 font-medium text-sm rounded-md`}
                  onClick={() => setActiveTab('recommended')}
                >
                  Recommended Events
                </button>
              </div>
            </div>
          </div>

          {/* Events grid */}
          <div className="grid gap-6 lg:grid-cols-2">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-secondary">No events found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}