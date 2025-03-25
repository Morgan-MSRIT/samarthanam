import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { createEvent, createTask, getTags } from '../services/apiService';

export default function CreateEvents() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [eventData, setEventData] = useState({
    name: '',
    description: '',
    tags: [],
    location: '',
    startDate: '',
    endDate: '',
    isRegistrationRequired: false,
    totalVolunteerRequirement: 0,
  });
  const [tasks, setTasks] = useState([
    { name: '', startTime: '', endTime: '', maxVolunteerNeeded: 0 },
  ]);
  const [availableTags, setAvailableTags] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await getTags();
        if (response.success) {
          setAvailableTags(response.data);
        }
      } catch (err) {
        console.error('Error fetching tags:', err);
      }
    };
    fetchTags();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEventData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const updateTask = (index, field, value) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, [field]: value } : task
    );
    setTasks(updatedTasks);
  };

  const addTask = () => {
    setTasks([...tasks, { name: '', startTime: '', endTime: '', maxVolunteerNeeded: 0 }]);
  };

  const removeTask = (index) => {
    if (tasks.length > 1) {
      setTasks(tasks.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const taskIds = await Promise.all(
        tasks.map(async (task) => {
          const response = await createTask({
            name: task.name,
            startTime: task.startTime,
            endTime: task.endTime,
            currentVolunteerCount: 0,
            maxVolunteerNeeded: Number(task.maxVolunteerNeeded),
          });
          if (response.success) {
            return response.data._id;
          }
          throw new Error('Task creation failed');
        })
      );

      const eventPayload = {
        user: user._id,
        name: eventData.name,
        description: eventData.description,
        tags: eventData.tags,
        location: eventData.location,
        startDate: eventData.startDate,
        endDate: eventData.endDate,
        tasks: taskIds,
        isRegistrationRequired: eventData.isRegistrationRequired,
        totalVolunteerReq: Number(eventData.totalVolunteerRequirement),
      };

      const eventResponse = await createEvent(eventPayload);
      if (eventResponse.success) {
        navigate('/organizer/dashboard');
      } else {
        setError(eventResponse.message || 'Failed to create event');
      }
    } catch (err) {
      setError(err.message || 'An error occurred');
    }
  };

  return (
    <div className="min-h-screen bg-tertiary p-8">
      <div className="bg-accent p-8 rounded-lg shadow-md max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-primary mb-6 text-center">Create New Event</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4">
            {/* Event Fields */}
            <div>
              <label className="block text-sm font-medium text-primary">Event Name</label>
              <input
                type="text"
                name="name"
                value={eventData.name}
                onChange={handleChange}
                className="w-full p-2 border border-primary rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary">Description</label>
              <textarea
                name="description"
                value={eventData.description}
                onChange={handleChange}
                className="w-full p-2 border border-primary rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary">Tags</label>
              <select
                name="tags"
                multiple
                value={eventData.tags}
                onChange={(e) =>
                  setEventData({
                    ...eventData,
                    tags: Array.from(e.target.selectedOptions, (option) => option.value),
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
            <div>
              <label className="block text-sm font-medium text-primary">Location</label>
              <input
                type="text"
                name="location"
                value={eventData.location}
                onChange={handleChange}
                className="w-full p-2 border border-primary rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary">Start Date</label>
              <input
                type="datetime-local"
                name="startDate"
                value={eventData.startDate}
                onChange={handleChange}
                className="w-full p-2 border border-primary rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary">End Date</label>
              <input
                type="datetime-local"
                name="endDate"
                value={eventData.endDate}
                onChange={handleChange}
                className="w-full p-2 border border-primary rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-primary">Total Volunteers Required</label>
              <input
                type="number"
                name="totalVolunteerRequirement"
                value={eventData.totalVolunteerRequirement}
                onChange={handleChange}
                className="w-full p-2 border border-primary rounded-md"
                min="0"
                required
              />
            </div>
            <div>
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
          </div>

          {/* Tasks Section */}
          <h2 className="text-2xl font-bold text-primary mt-6 mb-4">Tasks</h2>
          {tasks.map((task, index) => (
            <div key={index} className="border p-4 rounded-md mb-4">
              <h3 className="text-lg font-medium text-primary mb-2">Task {index + 1}</h3>
              <div className="grid grid-cols-1 gap-4">
                <input
                  type="text"
                  placeholder="Task Name"
                  value={task.name}
                  onChange={(e) => updateTask(index, 'name', e.target.value)}
                  className="p-2 border border-primary rounded-md"
                  required
                />
                <input
                  type="datetime-local"
                  value={task.startTime}
                  onChange={(e) => updateTask(index, 'startTime', e.target.value)}
                  className="p-2 border border-primary rounded-md"
                  required
                />
                <input
                  type="datetime-local"
                  value={task.endTime}
                  onChange={(e) => updateTask(index, 'endTime', e.target.value)}
                  className="p-2 border border-primary rounded-md"
                  required
                />
                <input
                  type="number"
                  placeholder="Max Volunteers Needed"
                  value={task.maxVolunteerNeeded}
                  onChange={(e) => updateTask(index, 'maxVolunteerNeeded', e.target.value)}
                  className="p-2 border border-primary rounded-md"
                  min="0"
                  required
                />
                {tasks.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeTask(index)}
                    className="text-red-500 hover:underline"
                  >
                    Remove Task
                  </button>
                )}
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addTask}
            className="bg-secondary text-white px-4 py-2 rounded-md mb-4 hover:bg-primary"
          >
            Add Task
          </button>

          <button
            type="submit"
            className="w-full bg-primary text-white p-2 rounded-md hover:bg-secondary"
          >
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
}