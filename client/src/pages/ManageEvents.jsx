import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  getUserEvents,
  getTasks,
  getAllRegisterVolunteer,
  createTask,
  updateEvent,
  updateTask,
} from '../services/apiService';
import { formatDate } from '../utils/dateFormatter';

export default function ManageEvents() {
  const [events, setEvents] = useState([]);
  const [showAddTaskForm, setShowAddTaskForm] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEventsData = async () => {
      try {
        const eventsResponse = await getUserEvents();
        if (eventsResponse.success) {
          const eventsWithDetails = await Promise.all(
            eventsResponse.data.map(async (event) => {
              const tasksResponse = await getTasks({ event: event._id });
              const volunteersResponse = await getAllRegisterVolunteer({ event_id: event._id });
              return {
                ...event,
                tasks: tasksResponse.success ? tasksResponse.data : [],
                volunteers: volunteersResponse.success ? volunteersResponse.data : [],
              };
            })
          );
          setEvents(eventsWithDetails);
        } else {
          setError(eventsResponse.message || 'Failed to fetch events');
        }
      } catch (err) {
        setError(err.message || 'An error occurred while fetching data');
      } finally {
        setLoading(false);
      }
    };
    fetchEventsData();
  }, []);

  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      const task = events
        .flatMap((e) => e.tasks)
        .find((t) => t._id === taskId);
      const response = await updateTask({
        taskId,
        name: task.name,
        startTime: task.startTime,
        endTime: task.endTime,
        currentVolunteerCount: task.currentVolunteerCount,
        maxVolunteerNeeded: task.maxVolunteerNeeded,
        status: newStatus,
      });
      if (response.success) {
        setEvents((prevEvents) =>
          prevEvents.map((event) => ({
            ...event,
            tasks: event.tasks.map((t) =>
              t._id === taskId ? { ...t, status: newStatus } : t
            ),
          }))
        );
      }
    } catch (err) {
      console.error('Error updating task status:', err);
    }
  };

  const handleAddTask = async (e, eventId) => {
    e.preventDefault();
    const form = e.target;
    const taskData = {
      name: form.name.value,
      startTime: form.startTime.value,
      endTime: form.endTime.value,
      maxVolunteerNeeded: Number(form.maxVolunteerNeeded.value),
      currentVolunteerCount: 0,
      event: eventId,
    };
    try {
      const taskResponse = await createTask(taskData);
      if (taskResponse.success) {
        const taskId = taskResponse.data._id;
        const event = events.find((ev) => ev._id === eventId);
        const updatedTasks = [...event.tasks.map((t) => t._id), taskId];
        const updateResponse = await updateEvent({ _id: eventId, tasks: updatedTasks });
        if (updateResponse.success) {
          setEvents((prevEvents) =>
            prevEvents.map((ev) =>
              ev._id === eventId
                ? { ...ev, tasks: [...ev.tasks, taskResponse.data] }
                : ev
            )
          );
          setShowAddTaskForm((prev) => ({ ...prev, [eventId]: false }));
          form.reset();
        }
      }
    } catch (err) {
      console.error('Error adding task:', err);
    }
  };

  if (loading) return <div className="text-center p-8">Loading...</div>;
  if (error) return <div className="text-center p-8 text-red-500">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-tertiary p-8">
      <h1 className="text-3xl font-bold text-primary mb-6">Manage Events</h1>
      {events.length === 0 ? (
        <p className="text-secondary">No events to manage.</p>
      ) : (
        events.map((event) => (
          <div key={event._id} className="mb-6 p-4 bg-secondary rounded-md shadow">
            <h2 className="text-xl font-bold text-primary">{event.name}</h2>
            <p className="text-secondary">
              Date: {formatDate(event.startDate)}
            </p>
            <p className="text-secondary">
              Participants: {event.registeredParticipants?.length}
            </p>

            {/* Tasks */}
            <h3 className="mt-4 font-semibold text-primary">Tasks</h3>
            {event.tasks.length === 0 ? (
              <p className="text-secondary">No tasks assigned.</p>
            ) : (
              <ul className="space-y-2">
                {event.tasks.map((task) => (
                  <li
                    key={task._id}
                    className="flex justify-between items-center p-2 bg-tertiary rounded-md"
                  >
                    <span>{task.name}</span>
                    <select
                      value={task.status || 'not started'}
                      onChange={(e) => updateTaskStatus(task._id, e.target.value)}
                      className="bg-primary text-white px-3 py-1 rounded-md"
                    >
                      <option value="not started">Not Started</option>
                      <option value="ongoing">Ongoing</option>
                      <option value="completed">Completed</option>
                    </select>
                  </li>
                ))}
              </ul>
            )}

            {/* Add Task Form */}
            {showAddTaskForm[event._id] ? (
              <form onSubmit={(e) => handleAddTask(e, event._id)} className="mt-4">
                <div className="grid grid-cols-1 gap-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Task Name"
                    className="p-2 border border-primary rounded-md"
                    required
                  />
                  <input
                    type="datetime-local"
                    name="startTime"
                    className="p-2 border border-primary rounded-md"
                    required
                  />
                  <input
                    type="datetime-local"
                    name="endTime"
                    className="p-2 border border-primary rounded-md"
                    required
                  />
                  <input
                    type="number"
                    name="maxVolunteerNeeded"
                    placeholder="Max Volunteers"
                    className="p-2 border border-primary rounded-md"
                    min="0"
                    required
                  />
                </div>
                <div className="mt-4 space-x-2">
                  <button
                    type="submit"
                    className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary"
                  >
                    Add Task
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setShowAddTaskForm((prev) => ({ ...prev, [event._id]: false }))
                    }
                    className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <button
                onClick={() => setShowAddTaskForm((prev) => ({ ...prev, [event._id]: true }))}
                className="mt-4 bg-secondary text-white px-4 py-2 rounded-md hover:bg-primary"
              >
                Add Task
              </button>
            )}

            {/* Volunteers */}
            <h3 className="mt-6 font-semibold text-primary">Volunteers</h3>
            {event.volunteers.length === 0 ? (
              <p className="text-secondary">No volunteers registered.</p>
            ) : (
              <ul className="space-y-1">
                {event.volunteers.map((volunteer) => (
                  <li
                    key={volunteer._id}
                    className="text-sm p-2 bg-tertiary rounded-md"
                  >
                    {volunteer.name || volunteer.email}
                  </li>
                ))}
              </ul>
            )}

            <Link
              to={`/event/${event._id}`}
              className="mt-4 inline-block bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary"
            >
              View Details
            </Link>
          </div>
        ))
      )}
    </div>
  );
}