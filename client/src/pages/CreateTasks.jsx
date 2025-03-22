import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateTasks() {
    const navigate = useNavigate();

    const [taskData, setTaskData] = useState({
        name: '', // Task name
        startTime: '',
        endTime: '',
        maxVolunteerNeeded: 0
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTaskData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Task Created:', taskData);
        alert('Task Created Successfully!');
        // Optionally, clear the form after submission
        setTaskData({
            name: '',
            startTime: '',
            endTime: '',
            maxVolunteerNeeded: 0
        });
    };

    return (
        <div className="min-h-screen bg-tertiary flex items-center justify-center p-8">
            <div className="bg-accent p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-3xl font-bold text-primary mb-6 text-center">Create New Task</h1>

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
                        />
                    </div>

                    {/* Other Fields */}
                    {['startTime', 'endTime', 'maxVolunteerNeeded'].map((field) => (
                        <div key={field} className="mb-4">
                            <label className="block text-sm font-medium text-primary">
                                {field === 'startTime' ? 'Start Time' : field === 'endTime' ? 'End Time' : 'Max Volunteers Needed'}
                            </label>
                            <input
                                type={field.includes('Time') ? 'datetime-local' : 'number'}
                                name={field}
                                value={taskData[field]}
                                onChange={handleChange}
                                className="w-full p-2 border border-primary rounded-md"
                                required
                            />
                        </div>
                    ))}

                    {/* Submit Button */}
                    <button type="submit" className="bg-primary text-white p-2 rounded-md w-full hover:bg-secondary mb-4">
                        Create Task
                    </button>

                    {/* Go Back Button */}
                    <button
                        type="button"
                        onClick={() => navigate('/organizer/create-events')}
                        className="bg-secondary text-white p-2 rounded-md w-full hover:bg-primary"
                    >
                        Go Back to Create Event
                    </button>
                </form>
            </div>
        </div>
    );
}