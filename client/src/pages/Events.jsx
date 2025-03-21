import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Events() {
  const [activeTab, setActiveTab] = useState('recommended');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with actual API call
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events');
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

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
    },
    // Add more mock events as needed
  ];

  const EventCard = ({ event }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={event.image}
        alt={event.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900">{event.title}</h3>
        <p className="mt-2 text-gray-600">{event.description}</p>
        <div className="mt-4 flex items-center text-sm text-gray-500">
          <svg
            className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
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
          <h4 className="text-sm font-medium text-gray-900">Required Skills:</h4>
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
          <div className="text-sm text-gray-500">
            {event.volunteersNeeded} volunteers needed
          </div>
          <div className="space-x-2">
            <button
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              onClick={() => {/* TODO: Implement volunteer signup */}}
            >
              Volunteer
            </button>
            <button
              className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              onClick={() => {/* TODO: Implement participant signup */}}
            >
              Participate
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="bg-white shadow">
          <div className="px-4 py-5 sm:px-6">
            <h1 className="text-2xl font-bold text-gray-900">Events</h1>
            <p className="mt-1 text-sm text-gray-500">
              Discover and join upcoming events at Samarthanam Trust
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-4">
          <div className="sm:hidden">
            <select
              className="block w-full rounded-md border-gray-300 focus:border-primary-500 focus:ring-primary-500"
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
            >
              <option value="recommended">Recommended Events</option>
              <option value="all">All Events</option>
            </select>
          </div>
          <div className="hidden sm:block">
            <nav className="flex space-x-4" aria-label="Tabs">
              <button
                className={`${
                  activeTab === 'recommended'
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-500 hover:text-gray-700'
                } px-3 py-2 font-medium text-sm rounded-md`}
                onClick={() => setActiveTab('recommended')}
              >
                Recommended Events
              </button>
              <button
                className={`${
                  activeTab === 'all'
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-500 hover:text-gray-700'
                } px-3 py-2 font-medium text-sm rounded-md`}
                onClick={() => setActiveTab('all')}
              >
                All Events
              </button>
            </nav>
          </div>
        </div>

        {/* Events grid */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {loading ? (
            <div className="text-center col-span-2">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary-600 border-r-transparent"></div>
              <p className="mt-2 text-gray-500">Loading events...</p>
            </div>
          ) : (
            mockEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))
          )}
        </div>
      </div>
    </div>
  );
} 