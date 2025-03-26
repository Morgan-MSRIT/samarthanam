import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getEventById,
  createTask,
  deleteTask,
  getAllRegisterVolunteer,
  updateVolunteer,
  updateEvent,
} from "../services/apiService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaPencilAlt,
  FaParagraph,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaCheck,
  FaUsers,
  FaTasks,
  FaClock,
  FaPlus,
  FaTrash,
  FaSearch,
  FaUser,
  FaEnvelope,
  FaSave,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";

export default function EventManagement() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [newTask, setNewTask] = useState({
    name: "",
    startTime: "",
    endTime: "",
    maxVolunteerNeeded: 0,
    currentVolunteerCount: 0,
  });
  const [editingTask, setEditingTask] = useState(null);
  const [editEvent, setEditEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [taskSearchTerms, setTaskSearchTerms] = useState({});

  // Fetch event and volunteer data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventResponse, volunteerResponse] = await Promise.all([
          getEventById(eventId),
          getAllRegisterVolunteer({ event_id: eventId }),
        ]);
        if (eventResponse.success) {
          setEvent(eventResponse.data);
          setTasks(eventResponse.data.tasks);
          setEditEvent({
            _id: eventResponse.data._id,
            name: eventResponse.data.name,
            description: eventResponse.data.description,
            location: eventResponse.data.location,
            startDate: eventResponse.data.startDate.slice(0, 16),
            endDate: eventResponse.data.endDate.slice(0, 16),
            isRegistrationRequired: eventResponse.data.isRegistrationRequired,
            totalVolunteerReq: eventResponse.data.totalVolunteerReq,
          });
        } else {
          setError("Failed to fetch event details");
        }
        if (volunteerResponse.success) {
          setVolunteers(volunteerResponse.data);
        } else {
          setError((prev) => prev + " Failed to fetch volunteers");
        }
      } catch (err) {
        setError("Error fetching data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [eventId]);

  // Reset currentPage when searchTerm changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Handlers
  const handleTaskChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleEventChange = (e) => {
    const { name, value } = e.target;
    setEditEvent((prev) => ({
      ...prev,
      [name]: name === "isRegistrationRequired" ? value === "true" : value,
    }));
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      const taskData = {
        name: newTask.name,
        startTime: newTask.startTime,
        endTime: newTask.endTime,
        maxVolunteerNeeded: newTask.maxVolunteerNeeded,
        currentVolunteerCount: 0,
      };
      const response = await createTask(taskData);
      if (response.success) {
        const updatedTasks = [...tasks, response.data];
        setTasks(updatedTasks);
        const updatedEvent = {
          _id: event._id,
          name: event.name,
          description: event.description,
          tag: event.tag,
          location: event.location,
          startDate: event.startDate,
          endDate: event.endDate,
          isRegistrationRequired: event.isRegistrationRequired,
          registeredParticipants: event.registeredParticipants,
          tasks: updatedTasks.map((t) => t._id),
          volunteers: event.volunteers,
          totalVolunteerReq: event.totalVolunteerReq,
          image: event.image,
        };
        const updateResponse = await updateEvent(event._id, updatedEvent);
        if (updateResponse.success) {
          setEvent(updateResponse.data);
          setNewTask({
            name: "",
            startTime: "",
            endTime: "",
            maxVolunteerNeeded: 0,
            currentVolunteerCount: 0,
          });
          toast.success("Task created and event updated successfully!");
        } else {
          setError("Failed to update event after adding task");
          toast.error("Failed to update event");
        }
      } else {
        setError("Failed to create task");
        toast.error("Failed to create task");
      }
    } catch (err) {
      setError("Error creating task: " + err.message);
      toast.error("Error creating task");
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        const response = await deleteTask(taskId);
        if (response.success) {
          const updatedTasks = tasks.filter((t) => t._id !== taskId);
          setTasks(updatedTasks);
          setEvent((prev) => ({
            ...prev,
            tasks: updatedTasks,
          }));
          toast.success("Task deleted successfully!");
        } else {
          setError("Failed to delete task");
          toast.error("Failed to delete task");
        }
      } catch (err) {
        setError("Error deleting task: " + err.message);
        toast.error("Error deleting task");
      }
    }
  };

  const handleUpdateEvent = async (e) => {
    e.preventDefault();
    try {
      const response = await updateEvent(eventId, editEvent);
      if (response.success) {
        setEvent(response.data);
        toast.success("Event updated successfully!");
      } else {
        setError("Failed to update event");
        toast.error("Failed to update event");
      }
    } catch (err) {
      setError("Error updating event");
      toast.error("Error updating event");
    }
  };

  const handleAssignVolunteer = async (taskId, volunteerId) => {
    const task = tasks.find((t) => t._id === taskId);
    const volunteer = volunteers.find((v) => v._id === volunteerId);
    if (
      !task ||
      !volunteer ||
      task.currentVolunteerCount >= task.maxVolunteerNeeded
    )
      return;
    try {
      const updatedTaskAllocated = [...volunteer.taskAllocated, taskId];
      const volunteerResponse = await updateVolunteer({
        volunteerId: volunteer._id,
        taskAllocated: updatedTaskAllocated,
        taskPreferred: volunteer.taskPreferred,
        status: volunteer.status,
        volunteerHrs: volunteer.volunteerHrs,
      });
      if (volunteerResponse.success) {
        setTasks((prev) =>
          prev.map((t) =>
            t._id === taskId
              ? { ...t, currentVolunteerCount: t.currentVolunteerCount + 1 }
              : t
          )
        );
        setVolunteers((prev) =>
          prev.map((v) =>
            v._id === volunteerId
              ? { ...v, taskAllocated: updatedTaskAllocated }
              : v
          )
        );
        toast.success("Volunteer assigned successfully!");
      } else {
        setError("Failed to assign volunteer");
        toast.error("Failed to assign volunteer");
      }
    } catch (err) {
      setError("Error assigning volunteer to task");
      toast.error("Error assigning volunteer");
    }
  };

  const handleRemoveVolunteerFromTask = async (taskId, volunteerId) => {
    const volunteer = volunteers.find((v) => v._id === volunteerId);
    if (!volunteer || !volunteer.taskAllocated.includes(taskId)) return;
    try {
      const updatedTaskAllocated = volunteer.taskAllocated.filter(
        (t) => t !== taskId
      );
      const volunteerResponse = await updateVolunteer({
        volunteerId: volunteer._id,
        taskAllocated: updatedTaskAllocated,
        taskPreferred: volunteer.taskPreferred,
        status: volunteer.status,
        volunteerHrs: volunteer.volunteerHrs,
      });
      if (volunteerResponse.success) {
        setTasks((prev) =>
          prev.map((t) =>
            t._id === taskId
              ? { ...t, currentVolunteerCount: t.currentVolunteerCount - 1 }
              : t
          )
        );
        setVolunteers((prev) =>
          prev.map((v) =>
            v._id === volunteerId
              ? { ...v, taskAllocated: updatedTaskAllocated }
              : v
          )
        );
        toast.success("Volunteer removed successfully!");
      } else {
        setError("Failed to remove volunteer");
        toast.error("Failed to remove volunteer");
      }
    } catch (err) {
      setError("Error removing volunteer from task");
      toast.error("Error removing volunteer");
    }
  };

  const getAvailableVolunteers = (taskId) => {
    return volunteers.filter((v) => !v.taskAllocated.includes(taskId));
  };

  if (loading)
    return (
      <div className="text-center py-12 text-tertiary-500">Loading...</div>
    );
  if (error)
    return <div className="text-center py-12 text-accent-500">{error}</div>;

  const filteredVolunteers = volunteers.filter(
    (v) =>
      (v.user.name &&
        v.user.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      v.user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalPages = Math.ceil(filteredVolunteers.length / pageSize);
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  const paginatedVolunteers = filteredVolunteers.slice(start, end);

  return (
    <div className="min-h-screen bg-tertiary-100 py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer />
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-tertiary-800 mb-8">
          Manage Event: {event.name}
        </h1>

        {/* Event Details Update Card */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold text-tertiary-800 mb-4">
            Update Event Details
          </h2>
          <form onSubmit={handleUpdateEvent} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-tertiary-700 flex items-center gap-2">
                <FaPencilAlt /> Event Name
              </label>
              <input
                type="text"
                name="name"
                value={editEvent?.name || ""}
                onChange={handleEventChange}
                className="w-full p-2 border border-tertiary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-tertiary-700 flex items-center gap-2">
                <FaParagraph /> Description
              </label>
              <textarea
                name="description"
                value={editEvent?.description || ""}
                onChange={handleEventChange}
                className="w-full p-2 border border-tertiary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-tertiary-700 flex items-center gap-2">
                <FaMapMarkerAlt /> Location
              </label>
              <input
                type="text"
                name="location"
                value={editEvent?.location || ""}
                onChange={handleEventChange}
                className="w-full p-2 border border-tertiary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>
            {/* Start Date and End Date in one row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-tertiary-700 flex items-center gap-2">
                  <FaCalendarAlt /> Start Date
                </label>
                <input
                  type="datetime-local"
                  name="startDate"
                  value={editEvent?.startDate || ""}
                  onChange={handleEventChange}
                  className="w-full p-2 border border-tertiary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-tertiary-700 flex items-center gap-2">
                  <FaCalendarAlt /> End Date
                </label>
                <input
                  type="datetime-local"
                  name="endDate"
                  value={editEvent?.endDate || ""}
                  onChange={handleEventChange}
                  className="w-full p-2 border border-tertiary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>
            </div>
            {/* Total Volunteers Required and Registration Required in one row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-tertiary-700 flex items-center gap-2">
                  <FaUsers /> Total Volunteers Required
                </label>
                <input
                  type="number"
                  name="totalVolunteerReq"
                  value={editEvent?.totalVolunteerReq || 0}
                  onChange={handleEventChange}
                  className="w-full p-2 border border-tertiary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  min="0"
                  required
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-tertiary-700 flex items-center gap-2">
                  <FaCheck /> Registration Required
                </label>
                <select
                  name="isRegistrationRequired"
                  value={editEvent?.isRegistrationRequired ? "true" : "false"}
                  onChange={handleEventChange}
                  className="w-full p-2 border border-tertiary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="flex items-center gap-2 bg-primary-600 text-accent-100 px-4 py-2 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer"
            >
              <FaSave /> Update Event
            </button>
          </form>
        </div>

        {/* Tasks Section with Searchable Dropdown */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold text-tertiary-800 mb-4">
            Tasks
          </h2>
          <div className="space-y-4">
            {tasks.map((task) => (
              <div key={task._id} className="p-4 bg-tertiary-50 rounded-md">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-medium text-tertiary-800 flex items-center gap-2">
                      <FaTasks /> {task.name}
                    </h3>
                    <div className="space-y-1">
                      <p className="text-tertiary-600 flex items-center gap-2">
                        <FaClock /> Start:{" "}
                        {new Date(task.startTime).toLocaleString()}
                      </p>
                      <p className="text-tertiary-600 flex items-center gap-2">
                        <FaClock /> End:{" "}
                        {new Date(task.endTime).toLocaleString()}
                      </p>
                      <p className="text-tertiary-600 flex items-center gap-2">
                        <FaUsers /> Volunteers: {task.currentVolunteerCount}/
                        {task.maxVolunteerNeeded}
                      </p>
                    </div>
                  </div>
                  <div className="space-x-2 flex items-center">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search volunteers..."
                        value={taskSearchTerms[task._id] || ""}
                        onChange={(e) =>
                          setTaskSearchTerms((prev) => ({
                            ...prev,
                            [task._id]: e.target.value,
                          }))
                        }
                        className={`px-3 py-2 bg-white border border-tertiary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                          task.currentVolunteerCount >= task.maxVolunteerNeeded
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                        disabled={
                          task.currentVolunteerCount >= task.maxVolunteerNeeded
                        }
                      />
                      {taskSearchTerms[task._id] && (
                        <ul className="absolute w-full bg-white border border-tertiary-300 rounded-md mt-1 max-h-60 overflow-auto z-10">
                          {getAvailableVolunteers(task._id)
                            .filter(
                              (v) =>
                                (v.user.name &&
                                  v.user.name
                                    .toLowerCase()
                                    .includes(
                                      taskSearchTerms[task._id].toLowerCase()
                                    )) ||
                                v.user.email
                                  .toLowerCase()
                                  .includes(
                                    taskSearchTerms[task._id].toLowerCase()
                                  )
                            )
                            .map((v) => (
                              <li
                                key={v._id}
                                onClick={() => {
                                  handleAssignVolunteer(task._id, v._id);
                                  setTaskSearchTerms((prev) => ({
                                    ...prev,
                                    [task._id]: "",
                                  }));
                                }}
                                className="px-4 py-2 hover:bg-tertiary-100 cursor-pointer"
                              >
                                {v.user.name || v.user.email}
                              </li>
                            ))}
                        </ul>
                      )}
                    </div>
                    <button
                      onClick={() => handleDeleteTask(task._id)}
                      className="flex items-center gap-2 bg-primary-500 text-accent-100 px-4 py-2 rounded-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-accent-500 cursor-pointer"
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
                <div className="mt-2">
                  <h4 className="text-sm font-semibold text-tertiary-700">
                    Assigned Volunteers:
                  </h4>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {volunteers
                      .filter((v) => v.taskAllocated.includes(task._id))
                      .map((v) => (
                        <div
                          key={v._id}
                          className="inline-flex items-center bg-blue-100 px-3 py-1 rounded-full"
                        >
                          <span className="text-gray-700">
                            {v.user.name || v.user.email}
                          </span>
                          <button
                            onClick={() =>
                              handleRemoveVolunteerFromTask(task._id, v._id)
                            }
                            className="ml-2 text-accent-500 hover:text-accent-600 focus:outline-none focus:ring-2 focus:ring-accent-500 cursor-pointer"
                            aria-label={`Remove ${
                              v.user.name || v.user.email
                            } from task`}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add New Task Form */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-tertiary-800 mb-2">
              Add New Task
            </h3>
            <form onSubmit={handleAddTask} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-tertiary-700 flex items-center gap-2">
                  <FaPencilAlt /> Task Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={newTask.name}
                  onChange={handleTaskChange}
                  className="w-full p-2 border border-tertiary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>
              {/* Start Time and End Time in one row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-tertiary-700 flex items-center gap-2">
                    <FaClock /> Start Time
                  </label>
                  <input
                    type="datetime-local"
                    name="startTime"
                    value={newTask.startTime}
                    onChange={handleTaskChange}
                    className="w-full p-2 border border-tertiary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-tertiary-700 flex items-center gap-2">
                    <FaClock /> End Time
                  </label>
                  <input
                    type="datetime-local"
                    name="endTime"
                    value={newTask.endTime}
                    onChange={handleTaskChange}
                    className="w-full p-2 border border-tertiary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-tertiary-700 flex items-center gap-2">
                  <FaUsers /> Max Volunteers Needed
                </label>
                <input
                  type="number"
                  name="maxVolunteerNeeded"
                  value={newTask.maxVolunteerNeeded}
                  onChange={handleTaskChange}
                  className="w-full p-2 border border-tertiary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  min="0"
                  required
                />
              </div>
              <button
                type="submit"
                className="flex items-center gap-2 bg-primary-600 text-accent-100 px-4 py-2 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer"
              >
                <FaPlus /> Add Task
              </button>
            </form>
          </div>
        </div>

        {/* Volunteers Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-tertiary-800 mb-4">
            Volunteers
          </h2>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name or email"
            className="w-full p-2 mb-4 border border-tertiary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <table className="min-w-full divide-y divide-tertiary-200">
            <thead className="bg-tertiary-50">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-semibold text-tertiary-700">
                  Name
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-tertiary-700">
                  Email
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-tertiary-700">
                  Assigned Tasks
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-tertiary-200">
              {paginatedVolunteers.map((volunteer) => (
                <tr key={volunteer._id} className="hover:bg-tertiary-50">
                  <td className="px-4 py-2 text-tertiary-700">
                    {volunteer.user.name || "N/A"}
                  </td>
                  <td className="px-4 py-2 text-tertiary-700">
                    {volunteer.user.email}
                  </td>
                  <td className="px-4 py-2 text-tertiary-700">
                    {volunteer.taskAllocated.length > 0
                      ? volunteer.taskAllocated
                          .map((taskId) => {
                            const task = tasks.find((t) => t._id === taskId);
                            return task ? task.name : "Unknown";
                          })
                          .join(", ")
                      : "None"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-2 bg-primary-600 text-accent-100 px-4 py-2 rounded-md hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary-500 enabled:cursor-pointer"
            >
              <FaArrowLeft /> Previous
            </button>
            <span className="text-tertiary-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="flex items-center gap-2 bg-primary-600 text-accent-100 px-4 py-2 rounded-md hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary-500 enabled:cursor-pointer"
            >
              Next <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
