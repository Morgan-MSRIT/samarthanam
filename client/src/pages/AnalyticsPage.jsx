// import { Bar } from 'react-chartjs-2';

// export default function AnalyticsPage() {
//     const data = {
//         labels: ['Event A', 'Event B', 'Event C'],
//         datasets: [
//             {
//                 label: 'Participants',
//                 data: [200, 150, 180],
//                 backgroundColor: 'rgba(54, 162, 235, 0.6)',
//             },
//             {
//                 label: 'Volunteers',
//                 data: [50, 35, 40],
//                 backgroundColor: 'rgba(255, 99, 132, 0.6)',
//             },
//         ],
//     };

//     return (
//         <div className="min-h-screen bg-tertiary">
//             <h1 className="text-3xl font-bold text-primary mb-6">Analytics</h1>

//             <div className="bg-accent p-6 rounded-lg shadow-md">
//                 <Bar data={data} />
//             </div>
//         </div>
//     );
// }




// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// export default function CreateEvents() {
//     const navigate = useNavigate();

//     const [eventData, setEventData] = useState({
//         name: '',
//         description: '',
//         tags: '',
//         location: '',
//         startDate: '',
//         endDate: '',
//         volunteerRequirement: 0
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setEventData((prev) => ({
//             ...prev,
//             [name]: value
//         }));
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log('Event Created:', eventData);
//         navigate('/organizer/manage-events'); // Redirect to Manage Events Page after creation
//     };

//     return (
//         <div className="min-h-screen bg-tertiary flex items-center justify-center p-8">
//             <div className="bg-accent p-8 rounded-lg shadow-md w-full max-w-md">
//                 <h1 className="text-3xl font-bold text-primary mb-6 text-center">Create New Event</h1>

//                 <form onSubmit={handleSubmit}>
//                     {['name', 'description', 'tags', 'location'].map((field) => (
//                         <div key={field} className="mb-4">
//                             <label className="block text-sm font-medium text-primary">{field}</label>
//                             <input
//                                 type="text"
//                                 name={field}
//                                 value={eventData[field]}
//                                 onChange={handleChange}
//                                 className="w-full p-2 border border-primary rounded-md"
//                                 required
//                             />
//                         </div>
//                     ))}

//                     <div className="mb-4">
//                         <label className="block text-sm font-medium text-primary">Start Date</label>
//                         <input
//                             type="datetime-local"
//                             name="startDate"
//                             value={eventData.startDate}
//                             onChange={handleChange}
//                             className="w-full p-2 border border-primary rounded-md"
//                             required
//                         />
//                     </div>

//                     <div className="mb-4">
//                         <label className="block text-sm font-medium text-primary">End Date</label>
//                         <input
//                             type="datetime-local"
//                             name="endDate"
//                             value={eventData.endDate}
//                             onChange={handleChange}
//                             className="w-full p-2 border border-primary rounded-md"
//                             required
//                         />
//                     </div>

//                     <div className="mb-4">
//                         <label className="block text-sm font-medium text-primary">Volunteer Requirement</label>
//                         <input
//                             type="number"
//                             name="volunteerRequirement"
//                             value={eventData.volunteerRequirement}
//                             onChange={handleChange}
//                             className="w-full p-2 border border-primary rounded-md"
//                             required
//                         />
//                     </div>

//                     <button type="submit" className="bg-primary text-white p-2 rounded-md w-full hover:bg-secondary">
//                         Create Event
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// }


import { Bar } from 'react-chartjs-2';

export default function AnalyticsPage() {
    const data = {
        labels: ['Event A', 'Event B', 'Event C'],
        datasets: [
            {
                label: 'Participants',
                data: [200, 150, 180],
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
            },
            {
                label: 'Volunteers',
                data: [50, 35, 40],
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
            },
        ],
    };

    return (
        <div className="min-h-screen bg-tertiary flex items-center justify-center p-8">
            <div className="bg-accent p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-3xl font-bold text-primary mb-6 text-center">Analytics</h1>

                <div className="bg-secondary p-4 rounded-md">
                    <Bar data={data} />
                </div>
            </div>
        </div>
    );
}
