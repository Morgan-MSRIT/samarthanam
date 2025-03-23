// import { useState } from 'react';
// import { Link } from 'react-router-dom';

// export default function ManageEvents() {
//   const [events, setEvents] = useState([
//     { id: 1, name: 'Fitness Event', tasks: ['Setup', 'Registration'], completedTasks: [true, false] },
//     { id: 2, name: 'Healthcare Event', tasks: ['Medical Checkup', 'Consultations'], completedTasks: [false, false] },
//   ]);

//   const toggleTaskStatus = (eventId, taskIndex) => {
//     const updatedEvents = events.map(event =>
//       event.id === eventId
//         ? {
//             ...event,
//             completedTasks: event.completedTasks.map((status, idx) =>
//               idx === taskIndex ? !status : status
//             )
//           }
//         : event
//     );
//     setEvents(updatedEvents);
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
//         <h1 className="text-3xl font-bold text-primary mb-6">Manage Events</h1>

//         {events.map(event => (
//           <div key={event.id} className="bg-accent p-4 rounded-lg shadow-md mb-4">
//             <h2 className="text-xl font-bold text-secondary">{event.name}</h2>
//             <ul className="mt-4">
//               {event.tasks.map((task, index) => (
//                 <li key={index} className="flex items-center justify-between p-2 border-b border-primary">
//                   {task}
//                   <input
//                     type="checkbox"
//                     checked={event.completedTasks[index]}
//                     onChange={() => toggleTaskStatus(event.id, index)}
//                     className="ml-4"
//                   />
//                 </li>
//               ))}
//             </ul>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


// import { Link } from 'react-router-dom';

// export default function ManageEvents() {
//     const events = [
//         { id: 1, name: 'Fitness Event', tasks: ['Setup', 'Registration'] },
//         { id: 2, name: 'Healthcare Event', tasks: ['Medical Checkup', 'Consultations'] },
//     ];

//     return (
//         <div className="min-h-screen bg-tertiary">
//             <h1 className="text-3xl font-bold text-primary mb-6">Manage Events</h1>

//             {events.map((event) => (
//                 <div key={event.id} className="bg-accent p-4 rounded-lg shadow-md mb-4">
//                     <h2 className="text-xl font-bold text-secondary">{event.name}</h2>

//                     <Link
//                         to={`/event/${event.id}`}  // Links to Event Details (already created)
//                         className="mt-2 inline-block bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary"
//                     >
//                         View Details
//                     </Link>
//                 </div>
//             ))}
//         </div>
//     );
// }


// import { useState } from 'react';
// import { Link } from 'react-router-dom';

// export default function ManageEvents() {
//     const [events, setEvents] = useState([
//         {
//             id: 1,
//             name: 'Fitness Event',
//             tasks: [
//                 { name: 'Setup', status: 'ongoing' },
//                 { name: 'Registration', status: 'not started' }
//             ],
//             volunteers: ['John Doe', 'Jane Smith']
//         },
//         {
//             id: 2,
//             name: 'Healthcare Event',
//             tasks: [
//                 { name: 'Medical Checkup', status: 'completed' },
//                 { name: 'Consultations', status: 'not started' }
//             ],
//             volunteers: ['Alice Johnson', 'Bob Williams']
//         }
//     ]);

//     const toggleTaskStatus = (eventId, taskIndex) => {
//         const updatedEvents = events.map(event =>
//             event.id === eventId
//                 ? {
//                     ...event,
//                     tasks: event.tasks.map((task, idx) =>
//                         idx === taskIndex
//                             ? { ...task, status: task.status === 'completed' ? 'ongoing' : 'completed' }
//                             : task
//                     )
//                 }
//                 : event
//         );
//         setEvents(updatedEvents);
//     };

//     const deleteTask = (eventId, taskIndex) => {
//         const updatedEvents = events.map(event =>
//             event.id === eventId
//                 ? { ...event, tasks: event.tasks.filter((_, idx) => idx !== taskIndex) }
//                 : event
//         );
//         setEvents(updatedEvents);
//     };

//     return (
//         <div className="min-h-screen bg-tertiary flex items-center justify-center p-8">
//             <div className="bg-accent p-8 rounded-lg shadow-md w-full max-w-md">
//                 <h1 className="text-3xl font-bold text-primary mb-6 text-center">Manage Events</h1>

//                 {events.map(event => (
//                     <div key={event.id} className="mb-6 p-4 bg-secondary rounded-md">
//                         <h2 className="text-lg font-bold">{event.name}</h2>

//                         <h3 className="mt-4 font-semibold">Tasks:</h3>
//                         <ul>
//                             {event.tasks.map((task, index) => (
//                                 <li key={index} className="flex justify-between items-center p-2 bg-tertiary rounded-md my-2">
//                                     <span>{task.name} - {task.status}</span>
//                                     <div>
//                                         <button
//                                             onClick={() => toggleTaskStatus(event.id, index)}
//                                             className="bg-primary text-white px-3 py-1 rounded-md mr-2"
//                                         >
//                                             {task.status === 'completed' ? 'Mark Ongoing' : 'Mark Completed'}
//                                         </button>
//                                         <button
//                                             onClick={() => deleteTask(event.id, index)}
//                                             className="bg-red-500 text-white px-3 py-1 rounded-md"
//                                         >
//                                             Delete
//                                         </button>
//                                     </div>
//                                 </li>
//                             ))}
//                         </ul>

//                         <h3 className="mt-4 font-semibold">Volunteers:</h3>
//                         <ul>
//                             {event.volunteers.map((volunteer, index) => (
//                                 <li key={index} className="text-sm p-1 bg-tertiary rounded-md my-1">
//                                     {volunteer}
//                                 </li>
//                             ))}
//                         </ul>

//                         <Link
//                             to={`/event/${event.id}`}
//                             className="inline-block mt-4 bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary"
//                         >
//                             View Details
//                         </Link>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }






import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ManageEvents() {
    const [events, setEvents] = useState([
        {
            id: 1,
            name: 'Fitness Event',
            tasks: [
                { name: 'Setup', status: 'ongoing' },
                { name: 'Registration', status: 'not started' }
            ],
            volunteers: ['John Doe', 'Jane Smith']
        },
        {
            id: 2,
            name: 'Healthcare Event',
            tasks: [
                { name: 'Medical Checkup', status: 'completed' },
                { name: 'Consultations', status: 'not started' }
            ],
            volunteers: ['Alice Johnson', 'Bob Williams']
        }
    ]);

    const updateTaskStatus = (eventId, taskIndex, newStatus) => {
        const updatedEvents = events.map(event =>
            event.id === eventId
                ? {
                    ...event,
                    tasks: event.tasks.map((task, idx) =>
                        idx === taskIndex ? { ...task, status: newStatus } : task
                    )
                }
                : event
        );
        setEvents(updatedEvents);
    };

    return (
        <div className="min-h-screen bg-tertiary flex items-center justify-center p-8">
            <div className="bg-accent p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-3xl font-bold text-primary mb-6 text-center">Manage Events</h1>

                {events.map(event => (
                    <div key={event.id} className="mb-6 p-4 bg-secondary rounded-md">
                        <h2 className="text-lg font-bold">{event.name}</h2>

                        <h3 className="mt-4 font-semibold">Tasks:</h3>
                        <ul>
                            {event.tasks.map((task, index) => (
                                <li key={index} className="flex justify-between items-center p-2 bg-tertiary rounded-md my-2">
                                    <span>{task.name}</span>
                                    <select
                                        value={task.status}
                                        onChange={(e) => updateTaskStatus(event.id, index, e.target.value)}
                                        className="bg-primary text-white px-3 py-1 rounded-md"
                                    >
                                        <option value="not started">Not Started</option>
                                        <option value="ongoing">Ongoing</option>
                                        <option value="completed">Completed</option>
                                    </select>
                                </li>
                            ))}
                        </ul>

                        <h3 className="mt-4 font-semibold">Volunteers:</h3>
                        <ul>
                            {event.volunteers.map((volunteer, index) => (
                                <li key={index} className="text-sm p-1 bg-tertiary rounded-md my-1">
                                    {volunteer}
                                </li>
                            ))}
                        </ul>

                        <Link
                            to={`/event/${event.id}`}
                            className="inline-block mt-4 bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary"
                        >
                            View Details
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
