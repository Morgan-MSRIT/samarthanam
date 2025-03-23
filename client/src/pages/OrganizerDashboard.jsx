import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { getUserEvents } from '../services/apiService';

export default function OrganizerDashboard() {
  const { user } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        if (!user?._id) {
          throw new Error('User ID not found');
        }
        const response = await getUserEvents(user._id);
        if (response.success) {
          setEvents(response.data);
        } else {
          setError(response.message);
        }
      } catch (err) {
        setError(err.message || 'Failed to fetch events');
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [user]);

  if (loading) return <div className="text-center p-8">Loading...</div>;
  if (error) return <div className="text-center p-8 text-red-500">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-tertiary p-8">
      <h1 className="text-3xl font-bold text-primary mb-6">Organizer Dashboard</h1>
      <p className="text-secondary mb-4">Welcome, {user.name}!</p>
      <div className="mb-8">
        <Link
          to="/organizer/create-events"
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary"
        >
          Create New Event
        </Link>
      </div>
      <h2 className="text-2xl font-bold text-primary mb-4">Your Events</h2>
      {events.length === 0 ? (
        <p className="text-secondary">You haven't created any events yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div key={event._id} className="bg-accent p-4 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-primary">{event.name}</h3>
              <p className="text-secondary">
                Date: {new Date(event.startDate).toLocaleDateString()}
              </p>
              <p className="text-secondary">
                Participants: {event.registeredParticipants?.length}
              </p>
              <p className="text-secondary">Volunteers: {event.volunteers?.length}</p>
              <div className="mt-4">
                <Link
                  to={`/event/${event._id}`}
                  className="text-primary hover:underline"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="mt-8 space-x-4">
        <Link
          to="/organizer/manage-events"
          className="bg-secondary text-white px-4 py-2 rounded-md hover:bg-primary"
        >
          Manage Events
        </Link>
        <Link
          to="/organizer/analytics"
          className="bg-secondary text-white px-4 py-2 rounded-md hover:bg-primary"
        >
          View Analytics
        </Link>
      </div>
    </div>
  );
}