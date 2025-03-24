import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { getUserEvents } from "../services/apiService";
import OrganizerEventDetailsPopup from "../components/organizer/OrganizerEventDetailsPopup";

export default function OrganizerDashboard() {
  const { user } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedEventId, setSelectedEventId] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        if (!user?._id) throw new Error("User ID not found");
        const response = await getUserEvents(user._id);
        if (response.success) {
          setEvents(response.data);
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
  }, [user]);

  if (loading)
    return <div className="text-center p-8 text-tertiary-600">Loading...</div>;
  if (error)
    return (
      <div className="text-center p-8 text-accent-500">Error: {error}</div>
    );

  return (
    <div className="min-h-screen bg-tertiary-100 p-8">
      <h1 className="text-3xl font-bold text-tertiary-800 mb-6">
        Organizer Dashboard
      </h1>
      <p className="text-tertiary-600 mb-4">Welcome, {user.name}!</p>
      <div className="mb-8">
        <Link
          to="/organizer/create-events"
          className="bg-primary-600 text-accent-100 px-4 py-2 rounded-md hover:bg-primary-700"
        >
          Create New Event
        </Link>
      </div>
      <h2 className="text-2xl font-bold text-tertiary-800 mb-4">Your Events</h2>
      {events.length === 0 ? (
        <p className="text-tertiary-600">You haven't created any events yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div key={event._id} className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-tertiary-800">
                {event.name}
              </h3>
              <p className="text-tertiary-600">
                Date: {new Date(event.startDate).toLocaleDateString()}
              </p>
              <p className="text-tertiary-600">
                Participants: {event.registeredParticipants?.length}
              </p>
              <p className="text-tertiary-600">
                Volunteers: {event.volunteers?.length}
              </p>
              <div className="mt-4">
                <button
                  onClick={() => setSelectedEventId(event._id)}
                  className="text-primary-600 hover:underline"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <OrganizerEventDetailsPopup
        eventId={selectedEventId}
        isOpen={!!selectedEventId}
        onClose={() => setSelectedEventId(null)}
      />
    </div>
  );
}
