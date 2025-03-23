import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

// Mock events data (same as in Events.jsx)
const events = [
  {
    id: 1,
    title: 'Sports Day for Differently Abled Children',
    date: '2024-04-15',
    time: '9:00 AM - 4:00 PM',
    location: 'Bangalore',
    description: 'A day of sports and fun activities for differently abled children.',
    image: '/images/sports.jpg',
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
      { time: '4:00 PM', activity: 'Closing Ceremony and Prize Distribution' },
    ],
  },
  {
    id: 2,
    title: 'Art Workshop for Visually Impaired',
    date: '2024-04-20',
    time: '10:00 AM - 2:00 PM',
    location: 'Bangalore',
    description: 'A creative workshop exploring different art forms accessible to visually impaired participants.',
    image: '/images/art.jpg',
    requiredSkills: ['Art Teaching', 'Accessibility', 'Patience'],
    maxParticipants: 30,
    currentParticipants: 15,
    maxVolunteers: 15,
    currentVolunteers: 8,
    schedule: [
      { time: '10:00 AM', activity: 'Introduction to Art Forms' },
      { time: '11:00 AM', activity: 'Hands-on Art Activities' },
      { time: '12:30 PM', activity: 'Lunch Break' },
      { time: '1:00 PM', activity: 'Art Showcase' },
    ],
  },
  {
    id: 3,
    title: 'Music Therapy Session',
    date: '2024-04-25',
    time: '11:00 AM - 1:00 PM',
    location: 'Bangalore',
    description: 'A therapeutic music session for children with special needs.',
    image: '/images/music_therapy.jpg',
    requiredSkills: ['Music', 'Therapy', 'Child Care'],
    maxParticipants: 20,
    currentParticipants: 12,
    maxVolunteers: 10,
    currentVolunteers: 5,
    schedule: [
      { time: '11:00 AM', activity: 'Welcome and Introduction' },
      { time: '11:30 AM', activity: 'Music Therapy Activities' },
      { time: '12:30 PM', activity: 'Group Discussion' },
      { time: '1:00 PM', activity: 'Closing' },
    ],
  },
  {
    id: 4,
    title: 'Computer Training for Visually Impaired',
    date: '2024-05-01',
    time: '2:00 PM - 5:00 PM',
    location: 'Bangalore',
    description: 'Basic computer skills training using screen readers and accessibility tools.',
    image: '/images/educational_workshop.jpg',
    requiredSkills: ['Computer Teaching', 'Accessibility', 'Patience'],
    maxParticipants: 15,
    currentParticipants: 8,
    maxVolunteers: 8,
    currentVolunteers: 4,
    schedule: [
      { time: '2:00 PM', activity: 'Introduction to Computer Basics' },
      { time: '3:00 PM', activity: 'Screen Reader Training' },
      { time: '4:00 PM', activity: 'Hands-on Practice' },
      { time: '5:00 PM', activity: 'Q&A and Closing' },
    ],
  },
  {
    id: 5,
    title: 'Dance Workshop for Differently Abled',
    date: '2024-05-05',
    time: '3:00 PM - 5:00 PM',
    location: 'Bangalore',
    description: 'An inclusive dance workshop celebrating movement and expression.',
    image: '/images/dance-workshop.avif',
    requiredSkills: ['Dance', 'Inclusivity', 'Movement'],
    maxParticipants: 25,
    currentParticipants: 15,
    maxVolunteers: 12,
    currentVolunteers: 6,
    schedule: [
      { time: '3:00 PM', activity: 'Warm-up and Introduction' },
      { time: '3:30 PM', activity: 'Dance Techniques' },
      { time: '4:30 PM', activity: 'Group Performance' },
      { time: '5:00 PM', activity: 'Cool Down and Feedback' },
    ],
  },
  {
    id: 6,
    title: 'Cooking Class for Visually Impaired',
    date: '2024-05-10',
    time: '10:00 AM - 1:00 PM',
    location: 'Bangalore',
    description: 'Learn cooking techniques adapted for visually impaired individuals.',
    image: '/images/cooking-class.jpg',
    requiredSkills: ['Cooking', 'Safety', 'Teaching'],
    maxParticipants: 12,
    currentParticipants: 6,
    maxVolunteers: 6,
    currentVolunteers: 3,
    schedule: [
      { time: '10:00 AM', activity: 'Safety Briefing' },
      { time: '10:30 AM', activity: 'Cooking Techniques' },
      { time: '12:00 PM', activity: 'Cooking Practice' },
      { time: '1:00 PM', activity: 'Tasting and Feedback' },
    ],
  },
];

export default function EventDetails() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user, isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    // Simulate fetching event data based on eventId
    const id = parseInt(eventId); // Convert string eventId from URL to number
    const foundEvent = events.find((e) => e.id === id);
    setEvent(foundEvent); // Set the event or null if not found
    setIsLoading(false);
  }, [eventId]);

  // Display loading spinner while "fetching" data
  if (isLoading) {
    return (
      <div className="min-h-screen bg-tertiary flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Handle case where event is not found
  if (!event) {
    return (
      <div className="min-h-screen bg-tertiary flex items-center justify-center">
        <p className="text-xl text-secondary">Event not found.</p>
      </div>
    );
  }

  // Render event details
  return (
    <div className="min-h-screen bg-tertiary">
      <div className="container">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-accent rounded-lg shadow-lg overflow-hidden">
            <div className="relative h-96">
              <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-8">
              <h1 className="text-3xl font-bold text-primary mb-4">{event.title}</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="space-y-4">
                    <div className="flex items-center text-secondary">
                      <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      {event.date}
                    </div>
                    <div className="flex items-center text-secondary">
                      <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {event.time}
                    </div>
                    <div className="flex items-center text-secondary">
                      <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
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
                {isAuthenticated && user.role === 'volunteer' && (
                  <Link
                    to={`/volunteer/${eventId}`}
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-accent bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    Register as Volunteer
                  </Link>
                )}
                <Link
                  to={`/participant/${eventId}`}
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-accent bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Register as Participant
                </Link>
                {isAuthenticated && user.role === 'organizer' && (
                  <Link
                    to="/organizer/manage-events"
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-accent bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    Back to Manage Events
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}