import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { getUserEvents } from "../services/apiService";
import OrganizerEventDetailsPopup from "../components/organizer/OrganizerEventDetailsPopup";
import { formatDate } from "../utils/dateFormatter";
import { motion } from "framer-motion";
import {
  FaChartBar,
  FaPlus,
  FaCalendar,
  FaUsers,
  FaHandsHelping,
  FaEye,
} from "react-icons/fa"; // Import icons

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

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-tertiary-100 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-center p-8 text-tertiary-600"
        >
          Loading...
        </motion.div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen bg-tertiary-100 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="text-center p-8 text-accent-500"
        >
          Error: {error}
        </motion.div>
      </div>
    );
  }

  // Main Dashboard Content
  return (
    <div className="min-h-screen bg-tertiary-100 p-8">
      {/* Dashboard Title */}
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="text-3xl font-bold text-tertiary-800 mb-6"
      >
        Organizer Dashboard
      </motion.h1>

      {/* Welcome Message */}
      <motion.p
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="text-tertiary-600 mb-4"
      >
        Welcome, {user.name}!
      </motion.p>

      {/* Action Buttons with Icons */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="mb-8 flex space-x-4"
      >
        <Link
          to="/organizer/analytics"
          className="flex items-center space-x-2 bg-primary-600 text-accent-100 px-4 py-2 rounded-md hover:bg-primary-700 transition duration-300"
        >
          <FaChartBar />
          <span>View Analytics</span>
        </Link>
        <Link
          to="/organizer/create-events"
          className="flex items-center space-x-2 bg-primary-600 text-accent-100 px-4 py-2 rounded-md hover:bg-primary-700 transition duration-300"
        >
          <FaPlus />
          <span>Create New Event</span>
        </Link>
      </motion.div>

      {/* Events Section */}
      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.6 }}
        className="text-2xl font-bold text-tertiary-800 mb-4"
      >
        Your Events
      </motion.h2>

      {events.length === 0 ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-tertiary-600"
        >
          You haven't created any events yet.
        </motion.p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={event._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 flex flex-col justify-between h-48 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              {/* Event Details with Icons */}
              <div>
                <h3 className="text-2xl font-bold text-tertiary-900 mb-2 truncate">
                  {event.name}
                </h3>
                <div className="space-y-1">
                  <p className="text-sm text-tertiary-600 flex items-center">
                    <FaCalendar className="mr-2" />
                    Date: {formatDate(event.startDate)}
                  </p>
                  <p className="text-sm text-tertiary-600 flex items-center">
                    <FaUsers className="mr-2" />
                    Participants: {event.registeredParticipants?.length}
                  </p>
                  <p className="text-sm text-tertiary-600 flex items-center">
                    <FaHandsHelping className="mr-2" />
                    Volunteers: {event.volunteers?.length}
                  </p>
                </div>
              </div>

              {/* View Details Button with Icon */}
              <div>
                <button
                  onClick={() => setSelectedEventId(event._id)}
                  className="mt-2 flex items-center space-x-2 bg-primary-500 text-white px-4 py-2 rounded-md hover:bg-primary-600 transition duration-300 cursor-pointer"
                >
                  <FaEye />
                  <span>View Details</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Event Details Popup */}
      <OrganizerEventDetailsPopup
        eventId={selectedEventId}
        isOpen={!!selectedEventId}
        onClose={() => setSelectedEventId(null)}
      />
    </div>
  );
}
