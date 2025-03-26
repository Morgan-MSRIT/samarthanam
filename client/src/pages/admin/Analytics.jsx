import axios from "axios";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { useEffect, useState } from "react";
import { Chart } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaChartBar,
  FaUsers,
  FaHandsHelping,
  FaCalendar,
  FaEye,
  FaMapMarkerAlt,
} from "react-icons/fa";

// Register required ChartJS components
ChartJS.register(BarElement, CategoryScale, LinearScale);

export default function AnalyticsPage() {
  const [eventData, setEventData] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const [eventName, setEventName] = useState([]);
  const [numParticipants, setNumParticipants] = useState([]);
  const [registeredParticipants, setRegisteredParticipants] = useState([]);
  const [totalParticipants, setTotalParticipants] = useState(0);
  const [totalVolunteers, setTotalVolunteers] = useState(0);
  const [tags, setTags] = useState([]);
  const [totalVolunteersWithTag, setTotalVolunteersWithTag] = useState([]);
  const [registeredVolunteersWithTag, setRegisteredVolunteersWithTag] =
    useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const API_URL = "http://localhost:4000/api/v1";
  const API_ANALYTICS = "http://localhost:4003";
  const api = axios.create({ baseURL: API_URL });
  const apiAnalytics = axios.create({ baseURL: API_ANALYTICS });

  // Fetch events
  const getEvents = async () => {
    setLoading(true);
    setError("");
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const token = localStorage.getItem("token");
      const response = await api.get("/event/get-events", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response?.data?.success) {
        setEventData(response?.data?.data);
      } else {
        setError(response?.data?.message);
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "An error occurred while fetching events"
      );
    } finally {
      setLoading(false);
    }
  };

  // Fetch organizer analytics
  const getOrganizerAnalytics = async () => {
    setLoading(true);
    setError("");
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const token = localStorage.getItem("token");
      const response = await apiAnalytics.post(
        "/analytics/get-organizer-analytics",
        { id: user._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response?.data?.success) {
        const data = response?.data?.data;
        setAllEvents(data?.events || []);
        setEventName(data?.eventName || []);
        setNumParticipants(data?.numParticipants || []);
        setRegisteredParticipants(data?.registeredParticipants || []);
        setTotalParticipants(data?.totalParticipants || 0);
        setTotalVolunteers(data?.totalVolunteers || 0);
        setTags(data?.tags || []);
        setTotalVolunteersWithTag(data?.totalVolunteersWithTag || []);
        setRegisteredVolunteersWithTag(data?.registeredVolunteersWithTag || []);
      } else {
        setError(response?.data?.message);
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "An error occurred while fetching analytics"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEvents();
    getOrganizerAnalytics();
  }, []);

  // Chart data for Event Participants Analytics
  const data1 = {
    labels: eventName.length > 0 ? eventName : ["No Data"],
    datasets: [
      {
        type: "bar",
        label: "Registered Participants",
        data: registeredParticipants.length > 0 ? registeredParticipants : [0],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
      {
        type: "bar",
        label: "Number of Participants",
        data: numParticipants.length > 0 ? numParticipants : [0],
        backgroundColor: "rgba(255, 99, 132, 0.6)", // Fixed from line chart properties
      },
    ],
  };

  // Chart data for Volunteers Tag Analytics
  const data2 = {
    labels: tags.length > 0 ? tags : ["No Data"],
    datasets: [
      {
        type: "bar",
        label: "Total Volunteers With Tag",
        data: totalVolunteersWithTag.length > 0 ? totalVolunteersWithTag : [0],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
      {
        type: "bar",
        label: "Registered Volunteers With Tag",
        data:
          registeredVolunteersWithTag.length > 0
            ? registeredVolunteersWithTag
            : [0],
        backgroundColor: "rgba(255, 99, 132, 0.6)", // Fixed from line chart properties
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, position: "top" },
    },
    scales: {
      x: {
        title: { display: true, text: "Categories" },
        ticks: { display: true },
      },
      y: { title: { display: true, text: "Count" }, beginAtZero: true },
    },
  };

  // Loading state
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

  // Error state
  // if (error) {
  //   return (
  //     <div className="min-h-screen bg-tertiary-100 flex items-center justify-center">
  //       <motion.div
  //         initial={{ opacity: 0 }}
  //         animate={{ opacity: 1 }}
  //         transition={{ duration: 0.4 }}
  //         className="text-center p-8 text-accent-500"
  //       >
  //         Error: {error}
  //       </motion.div>
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen bg-tertiary-100 p-8">
      {/* Event Participants Analytics */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-tertiary-800 mb-6 text-center flex items-center justify-center gap-2">
          <FaChartBar className="text-primary-600" /> Event Participants
          Analytics
        </h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex space-x-4 mb-4">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-blue-400"></div>
              <span className="ml-2 text-gray-700">
                Registered Participants
              </span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-pink-400"></div>
              <span className="ml-2 text-gray-700">Number of Participants</span>
            </div>
          </div>
          <div className="h-64">
            <Chart type="bar" data={data1} options={options} />
          </div>
        </div>
      </motion.div>

      {/* Volunteers Tag Analytics */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-tertiary-800 mb-6 text-center flex items-center justify-center gap-2">
          <FaChartBar className="text-primary-600" /> Volunteers Tag Analytics
        </h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex space-x-4 mb-4">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-blue-400"></div>
              <span className="ml-2 text-gray-700">
                Total Volunteers with Tag
              </span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-pink-400"></div>
              <span className="ml-2 text-gray-700">
                Registered Volunteers with Tag
              </span>
            </div>
          </div>
          <div className="h-64">
            <Chart type="bar" data={data2} options={options} />
          </div>
        </div>
      </motion.div>

      {/* Totals */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.4 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-tertiary-800 mb-6 text-center">
          Totals
        </h1>
        <div className="bg-white p-6 rounded-lg shadow-md grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <FaUsers className="text-primary-600 text-2xl" />
            <div>
              <p className="text-tertiary-800 font-bold">Total Participants</p>
              <p className="text-tertiary-600">{totalParticipants}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <FaHandsHelping className="text-primary-600 text-2xl" />
            <div>
              <p className="text-tertiary-800 font-bold">Total Volunteers</p>
              <p className="text-tertiary-600">{totalVolunteers}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Past Events */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-tertiary-800 mb-6 text-center">
          Past Events
        </h1>
        <div className="space-y-4">
          {eventData?.map((event) => (
            <div key={event?._id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-bold text-tertiary-900">
                  {event?.name}
                </h3>
                <div className="flex items-center space-x-2">
                  <FaCalendar className="text-primary-600" />
                  <span>{event?.startDate?.substr(0, 10)}</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <FaMapMarkerAlt className="text-primary-600" />
                  <span>{event?.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaUsers className="text-primary-600" />
                  <span>
                    Participants: {event?.registeredParticipants?.length}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaHandsHelping className="text-primary-600" />
                  <span>Volunteers: {event?.volunteers?.length}</span>
                </div>
              </div>
              <div className="mt-4">
                <button
                  onClick={() => navigate("/feedback/" + event?._id)}
                  className="flex items-center space-x-2 bg-primary-500 text-white px-4 py-2 rounded-md hover:bg-primary-600 transition duration-300 cursor-pointer"
                >
                  <FaEye />
                  <span>Show All Feedback</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
