import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

export default function TaskList() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    // Simulate API call to fetch tasks and schedule
    const fetchData = async () => {
      // Mock data - replace with actual API call
      const mockTasks = [
        {
          id: 1,
          title: 'Event Setup',
          description: 'Help set up the venue, arrange chairs, and prepare materials',
          time: '9:00 AM - 10:00 AM',
          volunteersNeeded: 5,
          currentVolunteers: 2,
          skills: ['Physical', 'Organizational']
        },
        {
          id: 2,
          title: 'Registration Desk',
          description: 'Welcome participants, check registrations, and distribute materials',
          time: '10:00 AM - 12:00 PM',
          volunteersNeeded: 3,
          currentVolunteers: 1,
          skills: ['Communication', 'Customer Service']
        },
        {
          id: 3,
          title: 'Activity Support',
          description: 'Assist participants during activities and ensure smooth flow',
          time: '12:00 PM - 2:00 PM',
          volunteersNeeded: 4,
          currentVolunteers: 0,
          skills: ['Patience', 'Support']
        },
        {
          id: 4,
          title: 'Cleanup',
          description: 'Help clean up the venue and organize materials after the event',
          time: '2:00 PM - 3:00 PM',
          volunteersNeeded: 3,
          currentVolunteers: 0,
          skills: ['Physical', 'Organizational']
        }
      ];

      const mockSchedule = [
        { time: '9:00 AM', activity: 'Volunteer Check-in' },
        { time: '9:30 AM', activity: 'Volunteer Briefing' },
        { time: '10:00 AM', activity: 'Event Setup' },
        { time: '11:00 AM', activity: 'Participant Registration' },
        { time: '12:00 PM', activity: 'Main Event Activities' },
        { time: '2:00 PM', activity: 'Cleanup' },
        { time: '3:00 PM', activity: 'Volunteer Debriefing' }
      ];

      setTasks(mockTasks);
      setSchedule(mockSchedule);
      setLoading(false);
    };

    fetchData();
  }, [eventId]);

  const toggleTaskSelection = (taskId) => {
    setSelectedTasks(prev => {
      if (prev.includes(taskId)) {
        return prev.filter(id => id !== taskId);
      } else {
        return [...prev, taskId];
      }
    });
  };

  const handleConfirmSelection = () => {
    // TODO: Implement task confirmation logic
    console.log('Selected tasks:', selectedTasks);
    navigate('/events');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-tertiary flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-tertiary">
      <div className="container">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-primary">
              Available Tasks
            </h2>
            <p className="mt-2 text-sm text-secondary">
              Select the tasks you would like to volunteer for
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Tasks Section */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {tasks.map(task => (
                  <div
                    key={task.id}
                    className={`bg-accent p-6 rounded-lg shadow cursor-pointer transition-all duration-200 ${
                      selectedTasks.includes(task.id)
                        ? 'ring-2 ring-primary'
                        : 'hover:shadow-md'
                    }`}
                    onClick={() => toggleTaskSelection(task.id)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-medium text-primary">{task.title}</h3>
                        <p className="mt-1 text-sm text-secondary">{task.description}</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {task.skills.map(skill => (
                            <span
                              key={skill}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-secondary">Time: {task.time}</p>
                        <p className="text-sm text-secondary">
                          Volunteers: {task.currentVolunteers}/{task.volunteersNeeded}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Schedule Section */}
            <div className="lg:col-span-1">
              <div className="bg-accent p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium text-primary mb-4">Event Schedule</h3>
                <div className="space-y-4">
                  {schedule.map((item, index) => (
                    <div key={index} className="flex items-start">
                      <div className="flex-shrink-0 w-24 text-sm font-medium text-primary">
                        {item.time}
                      </div>
                      <div className="ml-4 text-sm text-secondary">
                        {item.activity}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Confirmation Button */}
              <div className="mt-6">
                <button
                  onClick={handleConfirmSelection}
                  disabled={selectedTasks.length === 0}
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-accent ${
                    selectedTasks.length === 0
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'
                  }`}
                >
                  Confirm Selection
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 