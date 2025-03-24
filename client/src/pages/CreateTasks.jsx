import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createTask } from '../services/apiService';

export default function CreateTasks() {
    const navigate = useNavigate();
    const { eventId } = useParams(); // Get eventId from URL params

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [taskData, setTaskData] = useState({
        name: '',
        startTime: '',
        endTime: '',
        maxVolunteerNeeded: 1,
        currentVolunteerCount: 0,
        event: eventId // Add event reference
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTaskData((prev) => ({
            ...prev,
            [name]: name === 'maxVolunteerNeeded' ? parseInt(value) || 0 : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Format dates to ISO string
            const formattedData = {
                ...taskData,
                startTime: new Date(taskData.startTime).toISOString(),
                endTime: new Date(taskData.endTime).toISOString()
            };

            const response = await createTask(formattedData);
            
            if (response.success) {
                // Clear form
                setTaskData({
                    name: '',
                    startTime: '',
                    endTime: '',
                    maxVolunteerNeeded: 1,
                    currentVolunteerCount: 0,
                    event: eventId
                });
                
                // Show success message
                alert('Task created successfully!');
            } else {
                setError(response.message || 'Failed to create task');
            }
        } catch (err) {
            setError(err.message || 'An error occurred while creating the task');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-tertiary flex items-center justify-center p-8">
            <div className="bg-accent p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-3xl font-bold text-primary mb-6 text-center">Create New Task</h1>

                {error && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    {/* Task Name */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-primary">Task Name</label>
                        <input
                            type="text"
                            name="name"
                            value={taskData.name}
                            onChange={handleChange}
                            className="w-full p-2 border border-primary rounded-md"
                            required
                            disabled={loading}
                        />
                    </div>

                    {/* Start Time */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-primary">Start Time</label>
                        <input
                            type="datetime-local"
                            name="startTime"
                            value={taskData.startTime}
                            onChange={handleChange}
                            className="w-full p-2 border border-primary rounded-md"
                            required
                            disabled={loading}
                        />
                    </div>

                    {/* End Time */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-primary">End Time</label>
                        <input
                            type="datetime-local"
                            name="endTime"
                            value={taskData.endTime}
                            onChange={handleChange}
                            className="w-full p-2 border border-primary rounded-md"
                            required
                            disabled={loading}
                        />
                    </div>

                    {/* Max Volunteers */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-primary">Max Volunteers Needed</label>
                        <input
                            type="number"
                            name="maxVolunteerNeeded"
                            value={taskData.maxVolunteerNeeded}
                            onChange={handleChange}
                            min="1"
                            className="w-full p-2 border border-primary rounded-md"
                            required
                            disabled={loading}
                        />
                    </div>

                    {/* Submit Button */}
                    <button 
                        type="submit" 
                        className={`bg-primary text-white p-2 rounded-md w-full hover:bg-secondary mb-4 ${
                            loading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                        disabled={loading}
                    >
                        {loading ? 'Creating Task...' : 'Create Task'}
                    </button>

                    {/* Go Back Button */}
                    <button
                        type="button"
                        onClick={() => navigate('/organizer/create-events')}
                        className="bg-secondary text-white p-2 rounded-md w-full hover:bg-primary"
                        disabled={loading}
                    >
                        Go Back to Create Event
                    </button>
                </form>
            </div>
        </div>
    );
}