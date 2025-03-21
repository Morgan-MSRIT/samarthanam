import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function EventDetails() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch event details from API
    // Mock data for now
    setEvent({
      id: eventId,
      title: 'Annual Sports Meet 2024',
      date: '2024-03-15',
      time: '9:00 AM',
      location: 'Samarthanam Sports Complex, Bangalore',
      description: 'Join us for our annual sports meet featuring various athletic events and competitions. This event brings together athletes of all abilities to compete and celebrate the spirit of inclusivity in sports.',
      requirements: {
        volunteers: [
          'Age 18 or above',
          'Commitment for full day',
          'Experience in sports events (preferred)',
          'Good communication skills'
        ],
        participants: [
          'Open to all age groups',
          'Must register at least 1 week before event',
          'Medical clearance required for certain events'
        ]
      },
      image: '/event-sports.jpg',
      registrationDeadline: '2024-03-10',
      volunteerCount: 50,
      participantCount: 200
    });
    setIsLoading(false);
  }, [eventId]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Event not found</h2>
          <p className="mt-2 text-gray-600">The event you're looking for doesn't exist.</p>
          <Link to="/" className="mt-4 inline-block text-primary-600 hover:text-primary-500">
            Return to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow overflow-hidden rounded-lg">
          {event.image && (
            <div className="h-64 w-full overflow-hidden">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-3xl font-bold text-gray-900">{event.title}</h2>
            <p className="mt-1 text-sm text-gray-500">
              Event ID: {event.id}
            </p>
          </div>

          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-medium text-gray-500">Date</dt>
                <dd className="mt-1 text-sm text-gray-900">{event.date}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Time</dt>
                <dd className="mt-1 text-sm text-gray-900">{event.time}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">Location</dt>
                <dd className="mt-1 text-sm text-gray-900">{event.location}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">Description</dt>
                <dd className="mt-1 text-sm text-gray-900">{event.description}</dd>
              </div>
            </dl>
          </div>

          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Volunteer Section */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900">Volunteer Requirements</h3>
                <ul className="mt-3 list-disc list-inside text-sm text-gray-600 space-y-2">
                  {event.requirements.volunteers.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
                <Link
                  to={`/volunteer/${event.id}`}
                  className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Register as Volunteer
                </Link>
              </div>

              {/* Participant Section */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900">Participant Requirements</h3>
                <ul className="mt-3 list-disc list-inside text-sm text-gray-600 space-y-2">
                  {event.requirements.participants.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
                <Link
                  to={`/participant/${event.id}`}
                  className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Register as Participant
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <span className="text-sm font-medium text-gray-500">Registration Deadline:</span>
                <p className="mt-1 text-sm text-gray-900">{event.registrationDeadline}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Spots Available:</span>
                <p className="mt-1 text-sm text-gray-900">
                  Volunteers: {event.volunteerCount} | Participants: {event.participantCount}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 