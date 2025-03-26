import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthContext } from "../../context/AuthContext";
import {
  FaCalendar,
  FaUserTie,
  FaHandsHelping,
  FaUserPlus,
  FaUserMinus,
  FaChartBar,
} from "react-icons/fa";

export default function AdminDashboard() {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-tertiary-100 p-8">
      {/* Welcome Message */}
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="text-3xl font-bold text-tertiary-800 mb-6"
      >
        Welcome, {user.name || "Admin"}!
      </motion.h1>

      {/* Quick Stats */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="mb-8"
      >
        <h2 className="text-2xl font-bold text-tertiary-800 mb-4">
          Quick Stats
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="bg-white p-4 rounded-lg shadow-md"
          >
            <div className="flex items-center space-x-2">
              <FaCalendar className="text-primary-600 text-2xl" />
              <div>
                <p className="text-tertiary-800 font-bold">12</p>
                <p className="text-tertiary-600">Total Events</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="bg-white p-4 rounded-lg shadow-md"
          >
            <div className="flex items-center space-x-2">
              <FaUserTie className="text-primary-600 text-2xl" />
              <div>
                <p className="text-tertiary-800 font-bold">8</p>
                <p className="text-tertiary-600">Total Organizers</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            className="bg-white p-4 rounded-lg shadow-md"
          >
            <div className="flex items-center space-x-2">
              <FaHandsHelping className="text-primary-600 text-2xl" />
              <div>
                <p className="text-tertiary-800 font-bold">145</p>
                <p className="text-tertiary-600">Total Volunteers</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.6 }}
        className="flex flex-wrap space-x-4"
      >
        <Link
          to="/admin/create-organizer"
          className="flex items-center space-x-2 bg-primary-600 text-accent-100 px-4 py-2 rounded-md hover:bg-primary-700 transition duration-300"
        >
          <FaUserPlus />
          <span>Create Organizer</span>
        </Link>
        <Link
          to="/admin/remove-organizer"
          className="flex items-center space-x-2 bg-primary-600 text-accent-100 px-4 py-2 rounded-md hover:bg-primary-700 transition duration-300"
        >
          <FaUserMinus />
          <span>Remove Organizer</span>
        </Link>
        <Link
          to="/admin/analytics"
          className="flex items-center space-x-2 bg-primary-600 text-accent-100 px-4 py-2 rounded-md hover:bg-primary-700 transition duration-300"
        >
          <FaChartBar />
          <span>View Analytics</span>
        </Link>
      </motion.div>
    </div>
  );
}
