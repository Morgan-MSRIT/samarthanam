// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// export default function CreateTasks() {
//     const navigate = useNavigate();

//     const [taskData, setTaskData] = useState({
//         name: '', // Task name
//         startTime: '',
//         endTime: '',
//         maxVolunteerNeeded: 0
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setTaskData((prev) => ({
//             ...prev,
//             [name]: value
//         }));
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log('Task Created:', taskData);
//         alert('Task Created Successfully!');
//         // Optionally, clear the form after submission
//         setTaskData({
//             name: '',
//             startTime: '',
//             endTime: '',
//             maxVolunteerNeeded: 0
//         });
//     };

//     return (
//         <div className="min-h-screen bg-tertiary flex items-center justify-center p-8">
//             <div className="bg-accent p-8 rounded-lg shadow-md w-full max-w-md">
//                 <h1 className="text-3xl font-bold text-primary mb-6 text-center">Create New Task</h1>

//                 <form onSubmit={handleSubmit}>
//                     {/* Task Name */}
//                     <div className="mb-4">
//                         <label className="block text-sm font-medium text-primary">Task Name</label>
//                         <input
//                             type="text"
//                             name="name"
//                             value={taskData.name}
//                             onChange={handleChange}
//                             className="w-full p-2 border border-primary rounded-md"
//                             required
//                         />
//                     </div>

//                     {/* Other Fields */}
//                     {['startTime', 'endTime', 'maxVolunteerNeeded'].map((field) => (
//                         <div key={field} className="mb-4">
//                             <label className="block text-sm font-medium text-primary">
//                                 {field === 'startTime' ? 'Start Time' : field === 'endTime' ? 'End Time' : 'Max Volunteers Needed'}
//                             </label>
//                             <input
//                                 type={field.includes('Time') ? 'datetime-local' : 'number'}
//                                 name={field}
//                                 value={taskData[field]}
//                                 onChange={handleChange}
//                                 className="w-full p-2 border border-primary rounded-md"
//                                 required
//                             />
//                         </div>
//                     ))}

//                     {/* Submit Button */}
//                     <button type="submit" className="bg-primary text-white p-2 rounded-md w-full hover:bg-secondary mb-4">
//                         Create Task
//                     </button>

//                     {/* Go Back Button */}
//                     <button
//                         type="button"
//                         onClick={() => navigate('/organizer/create-events')}
//                         className="bg-secondary text-white p-2 rounded-md w-full hover:bg-primary"
//                     >
//                         Go Back to Create Event
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// }







// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// export default function CreateTasks() {
//     const navigate = useNavigate();

//     // Retrieve event details from localStorage
//     const storedEvents = JSON.parse(localStorage.getItem('events')) || [];
//     const latestEvent = storedEvents[storedEvents.length - 1]; // Get the most recently created event

//     const [taskData, setTaskData] = useState({
//         name: '',
//         startTime: '',
//         endTime: '',
//         maxVolunteerNeeded: 0
//     });

//     const [allTasks, setAllTasks] = useState([]); // Track multiple tasks before submission

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setTaskData((prev) => ({
//             ...prev,
//             [name]: value
//         }));
//     };

//     const addTask = () => {
//         const taskStartTime = new Date(taskData.startTime).getTime();
//         const taskEndTime = new Date(taskData.endTime).getTime();

//         if (taskStartTime >= taskEndTime) {
//             alert('Task start time must be earlier than the end time.');
//             return;
//         }

//         if (parseInt(taskData.maxVolunteerNeeded) > parseInt(latestEvent.totalVolunteerRequirement)) {
//             alert(`Number of volunteers must not exceed ${latestEvent.totalVolunteerRequirement}`);
//             return;
//         }

//         setAllTasks([...allTasks, taskData]);
//         setTaskData({ name: '', startTime: '', endTime: '', maxVolunteerNeeded: 0 });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         if (allTasks.length === 0) {
//             alert('Please add at least one task before submitting.');
//             return;
//         }

//         const totalVolunteersInTasks = allTasks.reduce((sum, task) => sum + parseInt(task.maxVolunteerNeeded), 0);

//         const storedEvents = JSON.parse(localStorage.getItem('events')) || [];
//         const updatedEvents = storedEvents.map(event =>
//             event.id === latestEvent.id
//                 ? {
//                     ...event,
//                     tasks: [...(event.tasks || []), ...allTasks],
//                     currentVolunteerCount: totalVolunteersInTasks  // Track total volunteers
//                 }
//                 : event
//         );

//         localStorage.setItem('events', JSON.stringify(updatedEvents));

//         alert('Tasks Created Successfully!');
//         navigate('/organizer/manage-events'); // Redirect to Manage Events page
//     };

//     return (
//         <div className="min-h-screen bg-tertiary flex items-center justify-center p-8">
//             <div className="bg-accent p-8 rounded-lg shadow-md w-full max-w-md">
//                 <h1 className="text-3xl font-bold text-primary mb-6 text-center">Create New Task</h1>

//                 <form onSubmit={handleSubmit}>
//                     {/* Task Name */}
//                     <div className="mb-4">
//                         <label className="block text-sm font-medium text-primary">Task Name</label>
//                         <input
//                             type="text"
//                             name="name"
//                             value={taskData.name}
//                             onChange={handleChange}
//                             className="w-full p-2 border border-primary rounded-md"
//                             required
//                         />
//                     </div>

//                     {/* Other Fields */}
//                     {['startTime', 'endTime', 'maxVolunteerNeeded'].map((field) => (
//                         <div key={field} className="mb-4">
//                             <label className="block text-sm font-medium text-primary">
//                                 {field === 'startTime' ? 'Start Time' : field === 'endTime' ? 'End Time' : 'Max Volunteers Needed'}
//                             </label>
//                             <input
//                                 type={field.includes('Time') ? 'datetime-local' : 'number'}
//                                 name={field}
//                                 value={taskData[field]}
//                                 onChange={handleChange}
//                                 className="w-full p-2 border border-primary rounded-md"
//                                 required
//                             />
//                         </div>
//                     ))}

//                     {/* Add Task Button */}
//                     <button
//                         type="button"
//                         onClick={addTask}
//                         className="bg-primary text-white p-2 rounded-md w-full hover:bg-secondary mb-4"
//                     >
//                         Add Task
//                     </button>

//                     {/* Display Added Tasks */}
//                     {allTasks.length > 0 && (
//                         <div className="mb-4">
//                             <h3 className="text-primary font-semibold">Tasks Added:</h3>
//                             <ul>
//                                 {allTasks.map((task, index) => (
//                                     <li key={index} className="text-sm p-2 bg-tertiary rounded-md my-1 border border-primary">
//                                         {task.name} - {task.startTime} to {task.endTime} | Volunteers: {task.maxVolunteerNeeded}
//                                     </li>
//                                 ))}
//                             </ul>
//                         </div>
//                     )}

//                     {/* Submit Button */}
//                     <button type="submit" className="bg-primary text-white p-2 rounded-md w-full hover:bg-secondary">
//                         Submit All Tasks
//                     </button>

//                     {/* Go Back Button */}
//                     <button
//                         type="button"
//                         onClick={() => navigate('/organizer/create-events')}
//                         className="bg-secondary text-white p-2 rounded-md w-full hover:bg-primary mt-4"
//                     >
//                         Go Back to Create Event
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// }










import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateTasks() {
    const navigate = useNavigate();

    // Retrieve event details from localStorage
    const storedEvents = JSON.parse(localStorage.getItem('events')) || [];
    const latestEvent = storedEvents[storedEvents.length - 1]; // Get the most recently created event

    const [taskData, setTaskData] = useState({
        name: '',
        startTime: '',
        endTime: '',
        maxVolunteerNeeded: 0
    });

    const [allTasks, setAllTasks] = useState([]); // Track multiple tasks before submission

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTaskData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const addTask = () => {
        const taskStartTime = new Date(taskData.startTime).getTime();
        const taskEndTime = new Date(taskData.endTime).getTime();

        if (taskStartTime >= taskEndTime) {
            alert('Task start time must be earlier than the end time.');
            return;
        }

        if (parseInt(taskData.maxVolunteerNeeded) > parseInt(latestEvent.totalVolunteerRequirement)) {
            alert(`Number of volunteers must not exceed ${latestEvent.totalVolunteerRequirement}`);
            return;
        }

        setAllTasks([...allTasks, taskData]);  // Add task to the list
        setTaskData({ name: '', startTime: '', endTime: '', maxVolunteerNeeded: 0 });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (allTasks.length === 0) {
            alert('Please add at least one task before submitting.');
            return;
        }

        const storedEvents = JSON.parse(localStorage.getItem('events')) || [];
        const updatedEvents = storedEvents.map(event =>
            event.id === latestEvent.id
                ? { ...event, tasks: [...(event.tasks || []), ...allTasks] }
                : event
        );

        localStorage.setItem('events', JSON.stringify(updatedEvents));

        alert('Tasks Created Successfully!');
        navigate('/organizer/manage-events'); // Redirect to Manage Events page
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

                    {/* Add Task Button */}
                    <button
                        type="button"
                        onClick={addTask}
                        className="bg-primary text-white p-2 rounded-md w-full hover:bg-secondary mb-4"
                    >
                        Add Task
                    </button>

                    {/* Display Added Tasks */}
                    {allTasks.length > 0 && (
                        <div className="mb-4">
                            <h3 className="text-primary font-semibold">Tasks Added:</h3>
                            <ul>
                                {allTasks.map((task, index) => (
                                    <li key={index} className="text-sm p-2 bg-tertiary rounded-md my-1 border border-primary">
                                        {task.name} - {task.startTime} to {task.endTime}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Submit Button */}
                    <button type="submit" className="bg-primary text-white p-2 rounded-md w-full hover:bg-secondary">
                        Submit All Tasks
                    </button>

                    {/* Go Back Button */}
                    <button
                        type="button"
                        onClick={() => navigate('/organizer/create-events')}
                        className="bg-secondary text-white p-2 rounded-md w-full hover:bg-primary mt-4"
                    >
                        Go Back to Create Event
                    </button>
                </form>
            </div>
        </div>
    );
}
