// import { useState } from 'react';
// import { Link } from 'react-router-dom';

// export default function CreateEvents() {
//   const [formData, setFormData] = useState({
//     eventName: '',
//     tags: '',
//     startTime: '',
//     endTime: '',
//     description: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Event Created:', formData);
//   };

//   return (
//     <div className="min-h-screen bg-tertiary">
//       <nav className="bg-tertiary shadow fixed w-full z-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between h-16">
//             <div className="flex">
//               <div className="flex-shrink-0 flex items-center">
//                 <Link to="/">
//                   <img className="h-16 w-auto" src="/samarthanam-logo.png" alt="Samarthanam Trust" />
//                 </Link>
//               </div>
//               <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
//                 <Link to="/events" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-primary hover:text-secondary">Events</Link>
//                 <Link to="/about" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-primary hover:text-secondary">About Us</Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </nav>

//       <div className="pt-20 px-8">
//         <h1 className="text-3xl font-bold text-primary mb-6">Create New Event</h1>

//         <form className="bg-accent p-6 rounded-lg shadow-md" onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-primary">Event Name</label>
//             <input
//               type="text"
//               name="eventName"
//               value={formData.eventName}
//               onChange={handleChange}
//               className="w-full p-2 border border-primary rounded-md"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-sm font-medium text-primary">Tags (Comma separated)</label>
//             <input
//               type="text"
//               name="tags"
//               value={formData.tags}
//               onChange={handleChange}
//               className="w-full p-2 border border-primary rounded-md"
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-sm font-medium text-primary">Start Time</label>
//             <input
//               type="time"
//               name="startTime"
//               value={formData.startTime}
//               onChange={handleChange}
//               className="w-full p-2 border border-primary rounded-md"
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-sm font-medium text-primary">End Time</label>
//             <input
//               type="time"
//               name="endTime"
//               value={formData.endTime}
//               onChange={handleChange}
//               className="w-full p-2 border border-primary rounded-md"
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-sm font-medium text-primary">Description</label>
//             <textarea
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               rows="3"
//               className="w-full p-2 border border-primary rounded-md"
//             ></textarea>
//           </div>

//           <button
//             type="submit"
//             className="bg-primary text-white p-2 rounded-md w-full hover:bg-secondary"
//           >
//             Create Event
//           </button>
//         </form>
//       </div>
//     </div>
//   );
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
//         <div className="min-h-screen bg-tertiary">
//             <h1 className="text-3xl font-bold text-primary mb-6">Create New Event</h1>

//             <form className="bg-accent p-6 rounded-lg shadow-md" onSubmit={handleSubmit}>
//                 {['name', 'description', 'tags', 'location'].map((field) => (
//                     <div key={field} className="mb-4">
//                         <label className="block text-sm font-medium text-primary">{field}</label>
//                         <input
//                             type="text"
//                             name={field}
//                             value={eventData[field]}
//                             onChange={handleChange}
//                             className="w-full p-2 border border-primary rounded-md"
//                             required
//                         />
//                     </div>
//                 ))}

//                 <div className="mb-4">
//                     <label className="block text-sm font-medium text-primary">Start Date</label>
//                     <input
//                         type="datetime-local"
//                         name="startDate"
//                         value={eventData.startDate}
//                         onChange={handleChange}
//                         className="w-full p-2 border border-primary rounded-md"
//                         required
//                     />
//                 </div>

//                 <div className="mb-4">
//                     <label className="block text-sm font-medium text-primary">End Date</label>
//                     <input
//                         type="datetime-local"
//                         name="endDate"
//                         value={eventData.endDate}
//                         onChange={handleChange}
//                         className="w-full p-2 border border-primary rounded-md"
//                         required
//                     />
//                 </div>

//                 <div className="mb-4">
//                     <label className="block text-sm font-medium text-primary">Volunteer Requirement</label>
//                     <input
//                         type="number"
//                         name="volunteerRequirement"
//                         value={eventData.volunteerRequirement}
//                         onChange={handleChange}
//                         className="w-full p-2 border border-primary rounded-md"
//                         required
//                     />
//                 </div>

//                 <button type="submit" className="bg-primary text-white p-2 rounded-md w-full hover:bg-secondary">
//                     Create Event
//                 </button>
//             </form>
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
//         <div className="min-h-screen bg-tertiary flex items-center justify-center">
//             <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
//                 <div className="bg-accent p-8 rounded-lg shadow-md max-w-lg mx-auto">
//                     <h1 className="text-3xl font-bold text-primary mb-6 text-center">Create New Event</h1>

//                     <form onSubmit={handleSubmit}>
//                         {['name', 'description', 'tags', 'location'].map((field) => (
//                             <div key={field} className="mb-4">
//                                 <label className="block text-sm font-medium text-primary">{field}</label>
//                                 <input
//                                     type="text"
//                                     name={field}
//                                     value={eventData[field]}
//                                     onChange={handleChange}
//                                     className="w-full p-2 border border-primary rounded-md"
//                                     required
//                                 />
//                             </div>
//                         ))}

//                         <div className="mb-4">
//                             <label className="block text-sm font-medium text-primary">Start Date</label>
//                             <input
//                                 type="datetime-local"
//                                 name="startDate"
//                                 value={eventData.startDate}
//                                 onChange={handleChange}
//                                 className="w-full p-2 border border-primary rounded-md"
//                                 required
//                             />
//                         </div>

//                         <div className="mb-4">
//                             <label className="block text-sm font-medium text-primary">End Date</label>
//                             <input
//                                 type="datetime-local"
//                                 name="endDate"
//                                 value={eventData.endDate}
//                                 onChange={handleChange}
//                                 className="w-full p-2 border border-primary rounded-md"
//                                 required
//                             />
//                         </div>

//                         <div className="mb-4">
//                             <label className="block text-sm font-medium text-primary">Volunteer Requirement</label>
//                             <input
//                                 type="number"
//                                 name="volunteerRequirement"
//                                 value={eventData.volunteerRequirement}
//                                 onChange={handleChange}
//                                 className="w-full p-2 border border-primary rounded-md"
//                                 required
//                             />
//                         </div>

//                         <button type="submit" className="bg-primary text-white p-2 rounded-md w-full hover:bg-secondary">
//                             Create Event
//                         </button>
//                     </form>
//                 </div>
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
//         isRegistrationRequired: false,
//         totalVolunteerRequirement: 0
//     });

//     const tagsOptions = ['Fitness', 'Healthcare', 'Education', 'Environment'];

//     const handleChange = (e) => {
//         const { name, value, type, checked } = e.target;
//         const fieldValue = type === 'checkbox' ? checked : value;
//         setEventData((prev) => ({
//             ...prev,
//             [name]: fieldValue
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
//                     {['name', 'description', 'location'].map((field) => (
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

//                     {/* Tags Dropdown */}
//                     <div className="mb-4">
//                         <label className="block text-sm font-medium text-primary">Tags</label>
//                         <select
//                             name="tags"
//                             value={eventData.tags}
//                             onChange={handleChange}
//                             className="w-full p-2 border border-primary rounded-md"
//                             required
//                         >
//                             <option value="">Select Tag</option>
//                             {tagsOptions.map(tag => (
//                                 <option key={tag} value={tag}>{tag}</option>
//                             ))}
//                         </select>
//                     </div>

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
//                         <label className="block text-sm font-medium text-primary">Total Volunteer Requirement</label>
//                         <input
//                             type="number"
//                             name="totalVolunteerRequirement"
//                             value={eventData.totalVolunteerRequirement}
//                             onChange={handleChange}
//                             className="w-full p-2 border border-primary rounded-md"
//                             required
//                         />
//                     </div>

//                     <div className="mb-4">
//                         <label className="block text-sm font-medium text-primary">Registration Required</label>
//                         <input
//                             type="checkbox"
//                             name="isRegistrationRequired"
//                             checked={eventData.isRegistrationRequired}
//                             onChange={handleChange}
//                             className="ml-2"
//                         />
//                     </div>

//                     {/* Tasks Button */}
//                     <Link
//                         to="/organizer/create-tasks"
//                         className="bg-blue-500 text-white px-4 py-2 rounded-md inline-block hover:bg-blue-700 mb-4"
//                     >
//                         Tasks
//                     </Link>

//                     <button type="submit" className="bg-primary text-white p-2 rounded-md w-full hover:bg-secondary">
//                         Create Event
//                     </button>
//                 </form>
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
//         isRegistrationRequired: false,
//         totalVolunteerRequirement: 0
//     });

//     const tagsOptions = ['Fitness', 'Healthcare', 'Education', 'Environment'];

//     const handleChange = (e) => {
//         const { name, value, type, checked } = e.target;
//         const fieldValue = type === 'checkbox' ? checked : value;
//         setEventData((prev) => ({
//             ...prev,
//             [name]: fieldValue
//         }));
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         // Store events in localStorage
//         const storedEvents = JSON.parse(localStorage.getItem('events')) || [];
//         storedEvents.push(eventData);
//         localStorage.setItem('events', JSON.stringify(storedEvents));

//         alert('Event Created Successfully!');
//         navigate('/organizer/create-tasks'); // Redirect to Create Tasks Page
//     };

//     return (
//         <div className="min-h-screen bg-tertiary flex items-center justify-center p-8">
//             <div className="bg-accent p-8 rounded-lg shadow-md w-full max-w-md">
//                 <h1 className="text-3xl font-bold text-primary mb-6 text-center">Create New Event</h1>

//                 <form onSubmit={handleSubmit}>
//                     {['name', 'description', 'location'].map((field) => (
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

//                     {/* Tags Dropdown */}
//                     <div className="mb-4">
//                         <label className="block text-sm font-medium text-primary">Tags</label>
//                         <select
//                             name="tags"
//                             value={eventData.tags}
//                             onChange={handleChange}
//                             className="w-full p-2 border border-primary rounded-md"
//                             required
//                         >
//                             <option value="">Select Tag</option>
//                             {tagsOptions.map(tag => (
//                                 <option key={tag} value={tag}>{tag}</option>
//                             ))}
//                         </select>
//                     </div>

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
//                         <label className="block text-sm font-medium text-primary">Total Volunteer Requirement</label>
//                         <input
//                             type="number"
//                             name="totalVolunteerRequirement"
//                             value={eventData.totalVolunteerRequirement}
//                             onChange={handleChange}
//                             className="w-full p-2 border border-primary rounded-md"
//                             required
//                         />
//                     </div>

//                     <div className="mb-4">
//                         <label className="block text-sm font-medium text-primary">Registration Required</label>
//                         <input
//                             type="checkbox"
//                             name="isRegistrationRequired"
//                             checked={eventData.isRegistrationRequired}
//                             onChange={handleChange}
//                             className="ml-2"
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





import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function CreateEvents() {
    const navigate = useNavigate();

    const [eventData, setEventData] = useState({
        name: '',
        description: '',
        tags: '',
        location: '',
        startDate: '',
        endDate: '',
        isRegistrationRequired: false,
        totalVolunteerRequirement: 0
    });

    const tagsOptions = ['Fitness', 'Healthcare', 'Education', 'Environment'];

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const fieldValue = type === 'checkbox' ? checked : value;
        setEventData((prev) => ({
            ...prev,
            [name]: fieldValue
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Store events in localStorage
        const storedEvents = JSON.parse(localStorage.getItem('events')) || [];
        storedEvents.push(eventData);
        localStorage.setItem('events', JSON.stringify(storedEvents));

        alert('Event Created Successfully!');
        navigate('/organizer/create-tasks'); // Redirect to Create Tasks Page
    };

    return (
        <div className="min-h-screen bg-tertiary flex items-center justify-center p-8">
            <div className="bg-accent p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-3xl font-bold text-primary mb-6 text-center">Create New Event</h1>

                <form onSubmit={handleSubmit}>
                    {['name', 'description', 'location'].map((field) => (
                        <div key={field} className="mb-4">
                            <label className="block text-sm font-medium text-primary">{field}</label>
                            <input
                                type="text"
                                name={field}
                                value={eventData[field]}
                                onChange={handleChange}
                                className="w-full p-2 border border-primary rounded-md"
                                required
                            />
                        </div>
                    ))}

                    {/* Tags Dropdown */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-primary">Tags</label>
                        <select
                            name="tags"
                            value={eventData.tags}
                            onChange={handleChange}
                            className="w-full p-2 border border-primary rounded-md"
                            required
                        >
                            <option value="">Select Tag</option>
                            {tagsOptions.map(tag => (
                                <option key={tag} value={tag}>{tag}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-4">
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

                    <div className="mb-4">
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

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-primary">Total Volunteer Requirement</label>
                        <input
                            type="number"
                            name="totalVolunteerRequirement"
                            value={eventData.totalVolunteerRequirement}
                            onChange={handleChange}
                            className="w-full p-2 border border-primary rounded-md"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-primary">Registration Required</label>
                        <input
                            type="checkbox"
                            name="isRegistrationRequired"
                            checked={eventData.isRegistrationRequired}
                            onChange={handleChange}
                            className="ml-2"
                        />
                    </div>

                    <button type="submit" className="bg-primary text-white p-2 rounded-md w-full hover:bg-secondary">
                        Create Event
                    </button>
                </form>
            </div>
        </div>
    );
}
