import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getEventById, volunteerRegistration } from "../services/apiService";
import {
  FaClock,
  FaTasks,
  FaCommentDots,
  FaPaperPlane,
  FaSpinner,
} from "react-icons/fa";

export default function EventVolunteerForm() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    availableHours: "",
    preferredTasks: [],
    additionalNotes: "",
  });

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await getEventById(eventId);
        if (response.success) {
          setEvent(response.data);
        } else {
          setError("Failed to fetch event details");
        }
      } catch (err) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  const handleTaskSelection = (taskId) => {
    setFormData((prev) => ({
      ...prev,
      preferredTasks: prev.preferredTasks.includes(taskId)
        ? prev.preferredTasks.filter((id) => id !== taskId)
        : [...prev.preferredTasks, taskId],
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!user || !user._id) {
      setError("User information is missing");
      return;
    }

    if (formData.preferredTasks.length === 0) {
      setError("Please select at least one task");
      return;
    }

    if (!formData.availableHours || formData.availableHours <= 0) {
      setError("Please enter valid available hours");
      return;
    }

    try {
      console.log("User object:", user); // Debug log
      const response = await volunteerRegistration(eventId, {
        user: user,
        email: user.email,
        preferredTasks: formData.preferredTasks,
        availableHours: parseInt(formData.availableHours),
        phone: user.phone || "",
        address: user.address || "",
        skills: user.skills || [],
        availability: user.availability || "flexible",
      });

      if (response.success) {
        navigate(`/event/${eventId}`);
      } else {
        setError(response.message || "Registration failed");
      }
    } catch (err) {
      console.error("Error in form submission:", err); // Debug log
      setError(err.message || "An error occurred");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-tertiary-100 flex items-center justify-center">
        <div className="flex items-center gap-2">
          <FaSpinner className="animate-spin text-primary text-3xl" />
          <p className="text-primary">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-tertiary-100 flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-tertiary-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-primary flex items-center justify-center gap-2">
            <FaCommentDots /> Volunteer Registration
          </h2>
          <p className="mt-2 text-sm text-secondary">
            Register as a volunteer for {event?.name}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-accent p-8 rounded-lg shadow-md max-w-2xl mx-auto"
        >
          {/* Available Hours */}
          <div>
            <label
              htmlFor="availableHours"
              className="block text-sm font-medium text-primary flex items-center gap-2"
            >
              <FaClock /> Available Hours *
            </label>
            <input
              type="number"
              id="availableHours"
              name="availableHours"
              value={formData.availableHours}
              onChange={handleChange}
              required
              min="1"
              className="mt-1 block w-full p-2 rounded-md border-primary-300 shadow-sm focus:border-primary focus:ring-primary text-primary bg-accent"
            />
          </div>

          {/* Preferred Tasks */}
          <div>
            <p className="block text-sm font-medium text-primary mb-2 flex items-center gap-2">
              <FaTasks /> Preferred Tasks *
            </p>
            {event?.tasks && event.tasks.length > 0 ? (
              <div className="space-y-2">
                {event.tasks.map((task) => (
                  <div key={task._id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`task-${task._id}`}
                      checked={formData.preferredTasks.includes(task._id)}
                      onChange={() => handleTaskSelection(task._id)}
                      className="h-4 w-4 text-primary focus:ring-primary border-primary-300 rounded"
                    />
                    <label
                      htmlFor={`task-${task._id}`}
                      className="ml-2 block text-sm text-primary cursor-pointer"
                    >
                      {task.name} ({new Date(task.startTime).toLocaleString()} -{" "}
                      {new Date(task.endTime).toLocaleString()})
                      <br />
                      <span className="text-xs text-secondary">
                        Volunteers needed: {task.currentVolunteerCount}/
                        {task.maxVolunteerNeeded}
                      </span>
                    </label>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-secondary">
                No tasks available for this event
              </p>
            )}
          </div>

          {/* Additional Notes */}
          <div>
            <label
              htmlFor="additionalNotes"
              className="block text-sm font-medium text-primary flex items-center gap-2"
            >
              <FaCommentDots /> Additional Notes
            </label>
            <textarea
              id="additionalNotes"
              name="additionalNotes"
              value={formData.additionalNotes}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full p-2 rounded-md border-primary-300 shadow-sm focus:border-primary focus:ring-primary text-primary bg-accent"
              placeholder="Any additional information you'd like to share..."
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center items-center gap-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-accent bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary cursor-pointer"
            >
              <FaPaperPlane /> Register as Volunteer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
