import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { getEvents, getRecommendedEvents } from '../services/apiService';
import { AuthContext } from '../context/AuthContext';
import { formatDate } from '../utils/dateFormatter';

export default function Events() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [events, setEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPastEvents, setShowPastEvents] = useState(false);
  const { user, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        let response;
        if (activeTab === 'recommended' && isAuthenticated) {
          response = await getRecommendedEvents(user?._id);
        } else {
          response = await getEvents();
        }
        console.log(response);

        if (response.success) {
          const now = new Date();
          const mappedEvents = response.data.map(event => ({
            id: event._id,
            title: event.name,
            startDate: new Date(event.startDate),
            endDate: new Date(event.endDate),
            date: formatDate(event.startDate),
            time: `${new Date(event.startDate).toLocaleTimeString()} - ${new Date(event.endDate).toLocaleTimeString()}`,
            location: event.location,
            description: event.description,
            image: event.image || '/images/event-placeholder.jpg',
            requiredSkills: event.tags.map(tag => tag.name),
            maxParticipants: event.maxParticipants || 50,
            currentParticipants: event.registeredParticipants?.length || 0,
            maxVolunteers: event.totalVolunteerReq,
            currentVolunteers: event.volunteers?.length || 0,
            isRecommended: event.isRecommended || false
          }));

          // Separate past and upcoming events
          const upcoming = mappedEvents.filter(event => event.endDate > now);
          const past = mappedEvents.filter(event => event.endDate <= now);

          setEvents(upcoming);
          setPastEvents(past);
        } else {
          setError(response.message);
        }
      } catch (err) {
        setError(err.message || "Failed to fetch events");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [activeTab, isAuthenticated, user?.id]);

  const filteredEvents = (showPastEvents ? pastEvents : events).filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const EventCard = ({ event }) => {
    const handleViewEvent = () => {
      navigate(`/event/${event.id}`);
    };

    return (
      <div className="bg-accent rounded-lg shadow-md overflow-hidden">
        <div className="relative">
          <img src={event.image} alt={event.title} className="w-full h-64 object-cover" />
          {event.isRecommended && (
            <div className="absolute top-2 right-2 bg-primary text-accent px-2 py-1 rounded-full text-xs font-medium">
              Recommended
            </div>
          )}
        </div>
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
            <span>Starts: {formatDate(event.startDate)}</span>
          </div>
          <div className="mt-1 flex items-center text-sm text-secondary">
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
            <span>Ends: {formatDate(event.endDate)}</span>
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
            <div className="text-sm text-secondary">
              {event.maxVolunteers - event.currentVolunteers} volunteers needed
            </div>
            <div className="space-x-2">
              <button
                onClick={handleViewEvent}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-accent bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary cursor-pointer"
              >
                View Event
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-tertiary-100">
      <div className="container-fluid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
                    activeTab === 'all' && !showPastEvents
                      ? 'bg-primary text-accent'
                      : 'text-primary hover:text-secondary'
                  } px-4 py-2 font-medium text-sm rounded-md cursor-pointer`}
                  onClick={() => {
                    setActiveTab('all');
                    setShowPastEvents(false);
                  }}
                >
                  All Events
                </button>
                <button
                  className={`${
                    activeTab === 'recommended' && !showPastEvents
                      ? 'bg-primary text-accent'
                      : 'text-primary hover:text-secondary'
                  } px-4 py-2 font-medium text-sm rounded-md cursor-pointer`}
                  onClick={() => {
                    if (!isAuthenticated) {
                      setShowSignInModal(true);
                    } else {
                      setActiveTab('recommended');
                      setShowPastEvents(false);
                    }
                  }}
                >
                  Recommended Events
                </button>
                <button
                  className={`${
                    showPastEvents
                      ? 'bg-primary text-accent'
                      : 'text-primary hover:text-secondary'
                  } px-4 py-2 font-medium text-sm rounded-md cursor-pointer`}
                  onClick={() => {
                    setShowPastEvents(!showPastEvents);
                    if (showPastEvents) {
                      setActiveTab('all');
                    }
                  }}
                >
                  Past Events
                </button>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-12">
              <p className="text-red-500">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="mt-4 px-4 py-2 bg-primary text-accent rounded-md hover:bg-secondary"
              >
                Retry
              </button>
            </div>
          )}

          {/* Events grid */}
          {!loading && !error && (
            <>
              <div className="grid gap-6 lg:grid-cols-2">
                {filteredEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>

              {filteredEvents.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-xl text-secondary">
                    {showPastEvents 
                      ? "No past events found matching your criteria."
                      : "No upcoming events found matching your criteria."}
                  </p>
                </div>
              )}
            </>
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
