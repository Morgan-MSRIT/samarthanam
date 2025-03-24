import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getEventById,
  createTask,
  updateTask,
  deleteTask,
  getAllRegisterVolunteer,
  updateVolunteer,
  updateEvent,
} from "../services/apiService";

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
        } else {
          setError("Failed to fetch event details");
        }
        if (volunteerResponse.success) setVolunteers(volunteerResponse.data);
        else setError((prev) => prev + " Failed to fetch volunteers");
      } catch (err) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [eventId]);

  // Handle input changes for new task form
  const handleTaskChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({ ...prev, [name]: value }));
  };

  // Add a new task
  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      const taskData = { ...newTask, event: eventId };
      const response = await createTask(taskData);
      if (response.success) {
        setTasks((prev) => [...prev, response.data]);
        await updateEvent({
          _id: eventId,
          tasks: [...event.tasks.map((t) => t._id), response.data._id],
        });
        setNewTask({
          name: "",
          startTime: "",
          endTime: "",
          maxVolunteerNeeded: 0,
          currentVolunteerCount: 0,
        });
      } else {
        setError("Failed to create task");
      }
    } catch (err) {
      setError("Error creating task");
    }
  };

  // Delete a task
  const handleDeleteTask = async (taskId) => {
    try {
      const response = await deleteTask(taskId);
      if (response.success) {
        setTasks((prev) => prev.filter((t) => t._id !== taskId));
        await updateEvent({
          _id: eventId,
          tasks: tasks.filter((t) => t._id !== taskId).map((t) => t._id),
        });
      }
    } catch (err) {
      setError("Error deleting task");
    }
  };

  // Assign a volunteer to a task
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
        const updatedTask = {
          taskId: task._id,
          name: task.name,
          startTime: task.startTime,
          endTime: task.endTime,
          currentVolunteerCount: task.currentVolunteerCount + 1,
          maxVolunteerNeeded: task.maxVolunteerNeeded,
        };
        const taskResponse = await updateTask(updatedTask);

        if (taskResponse.success) {
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
        }
      }
    } catch (err) {
      setError("Error assigning volunteer to task");
    }
  };

  // Remove a volunteer from a task
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
        const task = tasks.find((t) => t._id === taskId);
        const updatedTask = {
          taskId: task._id,
          name: task.name,
          startTime: task.startTime,
          endTime: task.endTime,
          currentVolunteerCount: task.currentVolunteerCount - 1,
          maxVolunteerNeeded: task.maxVolunteerNeeded,
        };
        const taskResponse = await updateTask(updatedTask);

        if (taskResponse.success) {
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
        }
      }
    } catch (err) {
      setError("Error removing volunteer from task");
    }
  };

  // Loading and error states
  if (loading)
    return (
      <div className="text-center py-12 text-tertiary-500">Loading...</div>
    );
  if (error)
    return <div className="text-center py-12 text-accent-500">{error}</div>;

  // Render UI
  return (
    <div className="min-h-screen bg-tertiary-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-tertiary-800 mb-8">
          Manage Event: {event.name}
        </h1>

        {/* Tasks Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold text-tertiary-800 mb-4">
            Tasks
          </h2>
          <div className="space-y-4">
            {tasks.map((task) => (
              <div key={task._id} className="p-4 bg-tertiary-50 rounded-md">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-medium text-tertiary-800">
                      {task.name}
                    </h3>
                    <div className="space-y-1">
                      <p className="text-tertiary-600">
                        Start: {new Date(task.startTime).toLocaleString()}
                      </p>
                      <p className="text-tertiary-600">
                        End: {new Date(task.endTime).toLocaleString()}
                      </p>
                      <p className="text-tertiary-600">
                        Volunteers: {task.currentVolunteerCount}/
                        {task.maxVolunteerNeeded}
                      </p>
                    </div>
                  </div>
                  <div className="space-x-2">
                    <select
                      onChange={(e) =>
                        handleAssignVolunteer(task._id, e.target.value)
                      }
                      className={`px-3 py-2 bg-white border border-tertiary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                        task.currentVolunteerCount >= task.maxVolunteerNeeded
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                      disabled={
                        task.currentVolunteerCount >= task.maxVolunteerNeeded
                      }
                    >
                      <option value="">Assign Volunteer</option>
                      {volunteers
                        .filter((v) => !v.taskAllocated.includes(task._id))
                        .map((v) => (
                          <option key={v._id} value={v._id}>
                            {v.name || v.email}
                          </option>
                        ))}
                    </select>
                    <button
                      onClick={() => handleDeleteTask(task._id)}
                      className="bg-primary-400 text-accent-100 px-4 py-2 rounded-md hover:bg-accent-600 focus:outline-none focus:ring-2 focus:ring-accent-500"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div className="mt-2">
                  <h4 className="text-sm font-semibold text-tertiary-700">
                    Assigned Volunteers:
                  </h4>
                  <ul className="list-disc pl-5 text-tertiary-600">
                    {volunteers
                      .filter((v) => v.taskAllocated.includes(task._id))
                      .map((v) => (
                        <li key={v._id}>
                          {v.name || v.email}
                          <button
                            onClick={() =>
                              handleRemoveVolunteerFromTask(task._id, v._id)
                            }
                            className="ml-2 text-accent-500 hover:underline focus:outline-none focus:ring-2 focus:ring-accent-500"
                          >
                            Remove
                          </button>
                        </li>
                      ))}
                  </ul>
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
                <label className="block text-sm font-medium text-tertiary-700">
                  Task Name
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
              <div>
                <label className="block text-sm font-medium text-tertiary-700">
                  Start Time
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
                <label className="block text-sm font-medium text-tertiary-700">
                  End Time
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
              <div>
                <label className="block text-sm font-medium text-tertiary-700">
                  Max Volunteers Needed
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
                className="bg-primary-600 text-accent-100 px-4 py-2 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                Add Task
              </button>
            </form>
          </div>
        </div>

        {/* Volunteers Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-tertiary-800 mb-4">
            Volunteers
          </h2>
          <ul className="space-y-2 text-tertiary-700">
            {volunteers.map((volunteer) => (
              <li key={volunteer._id}>
                {volunteer.name || volunteer.email || "Volunteer"} - Assigned to
                tasks:{" "}
                {volunteer.taskAllocated.length > 0
                  ? volunteer.taskAllocated
                      .map((taskId) => {
                        const task = tasks.find((t) => t._id === taskId);
                        return task ? task.name : "Unknown";
                      })
                      .join(", ")
                  : "None"}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
