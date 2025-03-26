import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { createEvent, createTask, getTags } from "../services/apiService";
import {
  FaPencilAlt,
  FaParagraph,
  FaTags,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUsers,
  FaTasks,
  FaClock,
  FaPlus,
  FaTrash,
  FaUpload,
  FaTimes,
  FaCheck,
} from "react-icons/fa";

export default function CreateEvents() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [eventData, setEventData] = useState({
    name: "",
    description: "",
    tags: [],
    location: "",
    startDate: "",
    endDate: "",
    isRegistrationRequired: false,
    totalVolunteerRequirement: 0,
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [tasks, setTasks] = useState([
    { name: "", startTime: "", endTime: "", maxVolunteerNeeded: 0 },
  ]);
  const [availableTags, setAvailableTags] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await getTags();
        if (response.success) {
          setAvailableTags(response.data);
        }
      } catch (err) {
        console.error("Error fetching tags:", err);
      }
    };
    fetchTags();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEventData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const updateTask = (index, field, value) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, [field]: value } : task
    );
    setTasks(updatedTasks);
  };

  const addTask = () => {
    setTasks([
      ...tasks,
      { name: "", startTime: "", endTime: "", maxVolunteerNeeded: 0 },
    ]);
  };

  const removeTask = (index) => {
    if (tasks.length > 1) {
      setTasks(tasks.filter((_, i) => i !== index));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Please select an image file");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size should be less than 5MB");
        return;
      }
      setEventData((prev) => ({
        ...prev,
        image: file,
      }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setEventData((prev) => ({ ...prev, image: null }));
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const taskPromises = tasks.map((task) =>
        createTask({
          name: task.name,
          startTime: task.startTime,
          endTime: task.endTime,
          currentVolunteerCount: 0,
          maxVolunteerNeeded: Number(task.maxVolunteerNeeded),
        })
      );
      const taskResponses = await Promise.all(taskPromises);
      const taskIds = taskResponses.map((response) => response.data._id);
      const tagIds = eventData.tags.map((tag) => tag._id || tag);
      const eventPayload = {
        user: user._id,
        name: eventData.name,
        description: eventData.description,
        tags: tagIds,
        location: eventData.location,
        startDate: eventData.startDate,
        endDate: eventData.endDate,
        tasks: taskIds,
        isRegistrationRequired: eventData.isRegistrationRequired,
        totalVolunteerReq: Number(eventData.totalVolunteerRequirement),
        image: eventData.image,
      };
      const eventResponse = await createEvent(eventPayload);
      if (eventResponse.success) {
        navigate("/organizer/dashboard");
      } else {
        setError(eventResponse.message || "Failed to create event");
      }
    } catch (err) {
      setError(err.message || "An error occurred while creating the event");
    }
  };

  return (
    <div className="min-h-screen bg-tertiary-100 p-8">
      <div className="bg-accent p-8 rounded-lg shadow-md max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-primary mb-6 text-center">
          Create New Event
        </h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          {/* Event Details Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
              <FaCalendarAlt /> Event Details
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-1">
                  <FaPencilAlt className="text-primary" />
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-primary"
                  >
                    Event Name
                  </label>
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={eventData.name}
                  onChange={handleChange}
                  className="w-full p-2 border border-primary rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-1">
                  <FaParagraph className="text-primary" />
                  <label
                    htmlFor="description"
                    className="text-sm font-medium text-primary"
                  >
                    Description
                  </label>
                </div>
                <textarea
                  id="description"
                  name="description"
                  value={eventData.description}
                  onChange={handleChange}
                  className="w-full p-2 border border-primary rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-1">
                  <FaTags className="text-primary" />
                  <label
                    htmlFor="tags"
                    className="text-sm font-medium text-primary"
                  >
                    Tags
                  </label>
                </div>
                <select
                  id="tags"
                  name="tags"
                  multiple
                  value={eventData.tags}
                  onChange={(e) =>
                    setEventData({
                      ...eventData,
                      tags: Array.from(
                        e.target.selectedOptions,
                        (option) => option.value
                      ),
                    })
                  }
                  className="w-full p-2 border border-primary rounded-md"
                  required
                >
                  {availableTags.map((tag) => (
                    <option key={tag._id} value={tag._id}>
                      {tag.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-1">
                  <FaMapMarkerAlt className="text-primary" />
                  <label
                    htmlFor="location"
                    className="text-sm font-medium text-primary"
                  >
                    Location
                  </label>
                </div>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={eventData.location}
                  onChange={handleChange}
                  className="w-full p-2 border border-primary rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-1">
                  <FaCalendarAlt className="text-primary" />
                  <label
                    htmlFor="startDate"
                    className="text-sm font-medium text-primary"
                  >
                    Start Date
                  </label>
                </div>
                <input
                  type="datetime-local"
                  id="startDate"
                  name="startDate"
                  value={eventData.startDate}
                  onChange={handleChange}
                  className="w-full p-2 border border-primary rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-1">
                  <FaCalendarAlt className="text-primary" />
                  <label
                    htmlFor="endDate"
                    className="text-sm font-medium text-primary"
                  >
                    End Date
                  </label>
                </div>
                <input
                  type="datetime-local"
                  id="endDate"
                  name="endDate"
                  value={eventData.endDate}
                  onChange={handleChange}
                  className="w-full p-2 border border-primary rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-1">
                  <FaUsers className="text-primary" />
                  <label
                    htmlFor="totalVolunteerRequirement"
                    className="text-sm font-medium text-primary"
                  >
                    Total Volunteers Required
                  </label>
                </div>
                <input
                  type="number"
                  id="totalVolunteerRequirement"
                  name="totalVolunteerRequirement"
                  value={eventData.totalVolunteerRequirement}
                  onChange={handleChange}
                  className="w-full p-2 border border-primary rounded-md"
                  min="0"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-primary">
                  Registration Required
                  <input
                    type="checkbox"
                    name="isRegistrationRequired"
                    checked={eventData.isRegistrationRequired}
                    onChange={handleChange}
                    className="ml-2"
                  />
                </label>
              </div>
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-1">
                  <FaUpload className="text-primary" />
                  <label
                    htmlFor="image-upload"
                    className="text-sm font-medium text-primary"
                  >
                    Event Image
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="cursor-pointer bg-primary text-accent px-4 py-2 rounded-md hover:bg-secondary flex items-center gap-2"
                  >
                    <FaUpload /> Upload Image
                  </label>
                </div>
                {imagePreview && (
                  <div className="mt-2 relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="h-48 w-full object-cover rounded-md"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 cursor-pointer"
                    >
                      <FaTimes />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Tasks Section */}
          <div className="space-y-6 mt-8">
            <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
              <FaTasks /> Tasks
            </h2>
            {tasks.map((task, index) => (
              <div key={index} className="border p-4 rounded-md mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-medium text-primary flex items-center gap-2">
                    <FaTasks /> Task {index + 1}
                  </h3>
                  {tasks.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeTask(index)}
                      className="text-red-500 hover:text-red-700 cursor-pointer"
                    >
                      <FaTrash />
                    </button>
                  )}
                </div>
                <div className="space-y-2">
                  <div>
                    <label className="block text-sm font-medium text-primary flex items-center gap-2">
                      <FaPencilAlt /> Task Name
                    </label>
                    <input
                      type="text"
                      value={task.name}
                      onChange={(e) =>
                        updateTask(index, "name", e.target.value)
                      }
                      className="w-full p-2 border border-primary rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary flex items-center gap-2">
                      <FaClock /> Start Time
                    </label>
                    <input
                      type="datetime-local"
                      value={task.startTime}
                      onChange={(e) =>
                        updateTask(index, "startTime", e.target.value)
                      }
                      className="w-full p-2 border border-primary rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary flex items-center gap-2">
                      <FaClock /> End Time
                    </label>
                    <input
                      type="datetime-local"
                      value={task.endTime}
                      onChange={(e) =>
                        updateTask(index, "endTime", e.target.value)
                      }
                      className="w-full p-2 border border-primary rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary flex items-center gap-2">
                      <FaUsers /> Max Volunteers Needed
                    </label>
                    <input
                      type="number"
                      value={task.maxVolunteerNeeded}
                      onChange={(e) =>
                        updateTask(index, "maxVolunteerNeeded", e.target.value)
                      }
                      className="w-full p-2 border border-primary rounded-md"
                      min="0"
                      required
                    />
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addTask}
              className="bg-secondary text-white px-4 py-2 rounded-md mb-4 hover:bg-primary flex items-center gap-2 cursor-pointer"
            >
              <FaPlus /> Add Task
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white p-2 rounded-md hover:bg-secondary flex items-center justify-center gap-2 cursor-pointer"
          >
            <FaCheck /> Create Event
          </button>
        </form>
      </div>
    </div>
  );
}
