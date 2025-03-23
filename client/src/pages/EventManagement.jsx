import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getTasksForEvent, createTask, updateTask, deleteTask, getEventVolunteers } from '../services/apiService';

export default function EventManagement() {
  const { eventId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [newTask, setNewTask] = useState({
    name: '',
    startTime: '',
    endTime: '',
    maxVolunteerNeeded: 0,
    currentVolunteerCount: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [taskResponse, volunteerResponse] = await Promise.all([
          getTasksForEvent(eventId),
          getEventVolunteers(eventId),
        ]);
        if (taskResponse.success) setTasks(taskResponse.data);
        else setError('Failed to fetch tasks');
        if (volunteerResponse.success) setVolunteers(volunteerResponse.data);
        else setError((prev) => prev + ' Failed to fetch volunteers');
      } catch (err) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [eventId]);

  const handleTaskChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      const response = await createTask({ ...newTask, event: eventId });
      if (response.success) {
        setTasks((prev) => [...prev, response.data]);
        setNewTask({ name: '', startTime: '', endTime: '', maxVolunteerNeeded: 0, currentVolunteerCount: 0 });
      } else {
        setError('Failed to create task');
      }
    } catch (err) {
      setError('Error creating task');
    }
  };

  const handleTaskStatus = async (taskId, newCount) => {
    const task = tasks.find((t) => t._id === taskId);
    try {
      const response = await updateTask({
        taskId,
        name: task.name,
        startTime: task.startTime,
        endTime: task.endTime,
        currentVolunteerCount: newCount,
        maxVolunteerNeeded: task.maxVolunteerNeeded,
      });
      if (response.success) {
        setTasks((prev) =>
          prev.map((t) => (t._id === taskId ? { ...t, currentVolunteerCount: newCount } : t))
        );
      }
    } catch (err) {
      setError('Error updating task');
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const response = await deleteTask(taskId);
      if (response.success) {
        setTasks((prev) => prev.filter((t) => t._id !== taskId));
      }
    } catch (err) {
      setError('Error deleting task');
    }
  };

  if (loading) return <div className="text-center py-12">Loading...</div>;
  if (error) return <div className="text-red-500 text-center py-12">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Manage Event</h1>
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Tasks</h2>
          <div className="space-y-4">
            {tasks.map((task) => (
              <div key={task._id} className="p-4 bg-gray-50 rounded-md flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium text-gray-800">{task.name}</h3>
                  <p className="text-gray-600">Start: {new Date(task.startTime).toLocaleString()}</p>
                  <p className="text-gray-600">End: {new Date(task.endTime).toLocaleString()}</p>
                  <p className="text-gray-600">
                    Volunteers: {task.currentVolunteerCount}/{task.maxVolunteerNeeded}
                  </p>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => handleTaskStatus(task._id, task.maxVolunteerNeeded)}
                    className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
                  >
                    Mark Done
                  </button>
                  <button
                    onClick={() => handleDeleteTask(task._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Add New Task</h3>
            <form onSubmit={handleAddTask} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Task Name</label>
                <input
                  type="text"
                  name="name"
                  value={newTask.name}
                  onChange={handleTaskChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Start Time</label>
                <input
                  type="datetime-local"
                  name="startTime"
                  value={newTask.startTime}
                  onChange={handleTaskChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">End Time</label>
                <input
                  type="datetime-local"
                  name="endTime"
                  value={newTask.endTime}
                  onChange={handleTaskChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Max Volunteers Needed</label>
                <input
                  type="number"
                  name="maxVolunteerNeeded"
                  value={newTask.maxVolunteerNeeded}
                  onChange={handleTaskChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700">
                Add Task
              </button>
            </form>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Volunteers</h2>
          <ul className="space-y-2">
            {volunteers.map((volunteer) => (
              <li key={volunteer._id} className="text-gray-700">{volunteer.name || 'Volunteer'}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}