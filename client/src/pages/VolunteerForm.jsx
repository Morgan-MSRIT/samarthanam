import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function TaskList() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch tasks from API
    // Mock data for now
    setTasks([
      {
        id: 1,
        title: 'Registration Desk Support',
        description: 'Assist in participant registration and check-in process',
        timeSlot: '8:00 AM - 12:00 PM',
        requiredVolunteers: 5,
        currentVolunteers: 2,
        skills: ['Communication', 'Organization'],
        location: 'Main Entrance'
      },
      {
        id: 2,
        title: 'Event Photography',
        description: 'Capture photos of the event activities and participants',
        timeSlot: '9:00 AM - 4:00 PM',
        requiredVolunteers: 3,
        currentVolunteers: 1,
        skills: ['Photography', 'Creativity'],
        location: 'Throughout Venue'
      },
      {
        id: 3,
        title: 'Sports Equipment Management',
        description: 'Manage and distribute sports equipment to participants',
        timeSlot: '8:30 AM - 5:00 PM',
        requiredVolunteers: 4,
        currentVolunteers: 2,
        skills: ['Organization', 'Physical Activity'],
        location: 'Equipment Room'
      },
      {
        id: 4,
        title: 'Participant Guide',
        description: 'Guide participants to their respective event locations',
        timeSlot: '9:00 AM - 3:00 PM',
        requiredVolunteers: 6,
        currentVolunteers: 3,
        skills: ['Communication', 'Leadership'],
        location: 'Various Locations'
      }
    ]);
    setIsLoading(false);
  }, []);

  const handleTaskSelection = (taskId) => {
    setSelectedTasks(prev => {
      if (prev.includes(taskId)) {
        return prev.filter(id => id !== taskId);
      }
      return [...prev, taskId];
    });
  };

  const handleSubmit = async () => {
    if (selectedTasks.length === 0) {
      alert('Please select at least one task');
      return;
    }
    // TODO: Submit selected tasks to API
    console.log('Selected tasks:', selectedTasks);
    navigate(`/event/${eventId}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Available Tasks
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Select the tasks you would like to volunteer for
          </p>
        </div>

        <div className="space-y-6">
          {tasks.map(task => (
            <div
              key={task.id}
              className={`bg-white shadow rounded-lg p-6 transition-colors ${
                selectedTasks.includes(task.id)
                  ? 'ring-2 ring-primary-500'
                  : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900">{task.title}</h3>
                  <p className="mt-2 text-sm text-gray-500">{task.description}</p>
                  
                  <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <span className="text-sm font-medium text-gray-500">Time Slot:</span>
                      <p className="mt-1 text-sm text-gray-900">{task.timeSlot}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Location:</span>
                      <p className="mt-1 text-sm text-gray-900">{task.location}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Required Skills:</span>
                      <p className="mt-1 text-sm text-gray-900">{task.skills.join(', ')}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Volunteers:</span>
                      <p className="mt-1 text-sm text-gray-900">
                        {task.currentVolunteers} / {task.requiredVolunteers}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="ml-4">
                  <button
                    type="button"
                    onClick={() => handleTaskSelection(task.id)}
                    className={`${
                      selectedTasks.includes(task.id)
                        ? 'bg-primary-600 text-white hover:bg-primary-700'
                        : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'
                    } px-4 py-2 border rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500`}
                  >
                    {selectedTasks.includes(task.id) ? 'Selected' : 'Select'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-end">
          <button
            type="button"
            onClick={handleSubmit}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Confirm Selection
          </button>
        </div>
      </div>
    </div>
  );
} 