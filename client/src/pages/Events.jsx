import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Events() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showSignInModal, setShowSignInModal] = useState(false);

  // Mock data for demonstration
  const events = [
    {
      id: 1,
      title: 'Sports Day for Differently Abled Children',
      date: '2024-04-15',
      time: '9:00 AM - 4:00 PM',
      location: 'Bangalore',
      description: 'A day of sports and fun activities for differently abled children.',
      image: '/images/events/sports-day.jpg',
      requiredSkills: ['Sports Training', 'Child Care', 'First Aid'],
      maxParticipants: 50,
      currentParticipants: 30,
      maxVolunteers: 20,
      currentVolunteers: 12,
      isRecommended: true
    },
    {
      id: 2,
      title: 'Art Workshop for Visually Impaired',
      date: '2024-04-20',
      time: '10:00 AM - 2:00 PM',
      location: 'Bangalore',
      description: 'A creative workshop exploring different art forms accessible to visually impaired participants.',
      image: '/images/events/art-workshop.jpg',
      requiredSkills: ['Art Teaching', 'Accessibility', 'Patience'],
      maxParticipants: 30,
      currentParticipants: 15,
      maxVolunteers: 15,
      currentVolunteers: 8,
      isRecommended: true
    },
    {
      id: 3,
      title: 'Music Therapy Session',
      date: '2024-04-25',
      time: '11:00 AM - 1:00 PM',
      location: 'Bangalore',
      description: 'A therapeutic music session for children with special needs.',
      image: '/images/events/music-therapy.jpg',
      requiredSkills: ['Music', 'Therapy', 'Child Care'],
      maxParticipants: 20,
      currentParticipants: 12,
      maxVolunteers: 10,
      currentVolunteers: 5,
      isRecommended: false
    },
    {
      id: 4,
      title: 'Computer Training for Visually Impaired',
      date: '2024-05-01',
      time: '2:00 PM - 5:00 PM',
      location: 'Bangalore',
      description: 'Basic computer skills training using screen readers and accessibility tools.',
      image: '/images/events/computer-training.jpg',
      requiredSkills: ['Computer Teaching', 'Accessibility', 'Patience'],
      maxParticipants: 15,
      currentParticipants: 8,
      maxVolunteers: 8,
      currentVolunteers: 4,
      isRecommended: false
    },
    {
      id: 5,
      title: 'Dance Workshop for Differently Abled',
      date: '2024-05-05',
      time: '3:00 PM - 5:00 PM',
      location: 'Bangalore',
      description: 'An inclusive dance workshop celebrating movement and expression.',
      image: '/images/events/dance-workshop.jpg',
      requiredSkills: ['Dance', 'Inclusivity', 'Movement'],
      maxParticipants: 25,
      currentParticipants: 15,
      maxVolunteers: 12,
      currentVolunteers: 6,
      isRecommended: true
    },
    {
      id: 6,
      title: 'Cooking Class for Visually Impaired',
      date: '2024-05-10',
      time: '10:00 AM - 1:00 PM',
      location: 'Bangalore',
      description: 'Learn cooking techniques adapted for visually impaired individuals.',
      image: '/images/events/cooking-class.jpg',
      requiredSkills: ['Cooking', 'Safety', 'Teaching'],
      maxParticipants: 12,
      currentParticipants: 6,
      maxVolunteers: 6,
      currentVolunteers: 3,
      isRecommended: false
    }
  ];

  const filteredEvents = events.filter(event => {
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
                    className="h-16 w-auto"
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
                  onClick={() => setShowSignInModal(true)}
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

      {/* Sign In Modal */}
      {showSignInModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-accent rounded-lg p-8 max-w-md w-full mx-4">
            <h3 className="text-2xl font-bold text-primary mb-4">Sign In Required</h3>
            <p className="text-secondary mb-6">
              Please sign in to view recommended events.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowSignInModal(false)}
                className="px-4 py-2 text-sm font-medium text-secondary hover:text-primary"
              >
                Cancel
              </button>
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-accent bg-primary rounded-md hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}