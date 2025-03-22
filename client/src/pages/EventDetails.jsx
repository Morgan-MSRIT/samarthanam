import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function EventDetails() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch event details from API
    // Mock data for now
    setEvent({
      id: eventId,
      title: 'Sports Day for Differently Abled Children',
      date: '2024-04-15',
      time: '9:00 AM - 4:00 PM',
      location: 'Samarthanam Sports Complex, Bangalore',
      description: 'A day of sports and fun activities for differently abled children. The event includes various sports activities, games, and entertainment programs.',
      image: '/images/events/sports-day.jpg',
      requiredSkills: ['Sports Training', 'Child Care', 'First Aid'],
      maxParticipants: 50,
      currentParticipants: 30,
      maxVolunteers: 20,
      currentVolunteers: 12,
      schedule: [
        { time: '9:00 AM', activity: 'Registration and Welcome' },
        { time: '10:00 AM', activity: 'Opening Ceremony' },
        { time: '11:00 AM', activity: 'Sports Activities Begin' },
        { time: '1:00 PM', activity: 'Lunch Break' },
        { time: '2:00 PM', activity: 'More Sports Activities' },
        { time: '4:00 PM', activity: 'Closing Ceremony and Prize Distribution' }
      ]
    });
    setIsLoading(false);
  }, [eventId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-tertiary flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

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
          <div className="bg-accent rounded-lg shadow-lg overflow-hidden">
            <div className="relative h-96">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-8">
              <h1 className="text-3xl font-bold text-primary mb-4">{event.title}</h1>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="space-y-4">
                    <div className="flex items-center text-secondary">
                      <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {event.date}
                    </div>
                    <div className="flex items-center text-secondary">
                      <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {event.time}
                    </div>
                    <div className="flex items-center text-secondary">
                      <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {event.location}
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-primary mb-2">Required Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {event.requiredSkills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-primary text-accent rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <div className="bg-tertiary p-4 rounded-lg">
                      <p className="text-sm text-secondary">Participants</p>
                      <p className="text-2xl font-bold text-primary">
                        {event.currentParticipants}/{event.maxParticipants}
                      </p>
                    </div>
                    <div className="bg-tertiary p-4 rounded-lg">
                      <p className="text-sm text-secondary">Volunteers</p>
                      <p className="text-2xl font-bold text-primary">
                        {event.currentVolunteers}/{event.maxVolunteers}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-primary mb-4">Description</h3>
                  <p className="text-secondary">{event.description}</p>

                  <h3 className="text-lg font-semibold text-primary mt-6 mb-4">Schedule</h3>
                  <div className="space-y-2">
                    {event.schedule.map((item, index) => (
                      <div key={index} className="flex items-center text-secondary">
                        <span className="font-medium text-primary w-24">{item.time}</span>
                        <span>{item.activity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-end">
                <Link
                  to={`/volunteer/${eventId}`}
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-accent bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Register as Volunteer
                </Link>
                <Link
                  to={`/participant/${eventId}`}
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-accent bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Register as Participant
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 