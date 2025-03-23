// // import { useState } from 'react';

// // export default function CreateOrganizer() {
// //     const [organizerData, setOrganizerData] = useState({
// //         email: '',
// //         defaultPassword: 'Welcome123', // Default password
// //         sendCode: false // Optional unique code feature
// //     });

// //     const handleChange = (e) => {
// //         const { name, value, checked, type } = e.target;
// //         setOrganizerData((prev) => ({
// //             ...prev,
// //             [name]: type === 'checkbox' ? checked : value
// //         }));
// //     };

// //     const handleSubmit = (e) => {
// //         e.preventDefault();

// //         const storedOrganizers = JSON.parse(localStorage.getItem('organizers')) || [];
// //         storedOrganizers.push(organizerData);
// //         localStorage.setItem('organizers', JSON.stringify(storedOrganizers));

// //         alert(`Organizer Created!\nDefault Password: ${organizerData.defaultPassword}`);
// //     };

// //     return (
// //         <div className="min-h-screen bg-tertiary flex items-center justify-center p-8">
// //             <div className="bg-accent p-8 rounded-lg shadow-md w-full max-w-md">
// //                 <h1 className="text-3xl font-bold text-primary mb-6 text-center">Create Organizer</h1>

// //                 <form onSubmit={handleSubmit}>
// //                     <div className="mb-4">
// //                         <label className="block text-sm font-medium text-primary">Organizer Email</label>
// //                         <input
// //                             type="email"
// //                             name="email"
// //                             value={organizerData.email}
// //                             onChange={handleChange}
// //                             className="w-full p-2 border border-primary rounded-md"
// //                             required
// //                         />
// //                     </div>

// //                     <div className="mb-4">
// //                         <label className="block text-sm font-medium text-primary">Default Password</label>
// //                         <input
// //                             type="text"
// //                             name="defaultPassword"
// //                             value={organizerData.defaultPassword}
// //                             className="w-full p-2 border border-primary rounded-md"
// //                             readOnly
// //                         />
// //                     </div>

// //                     {/* Optional Unique Code */}
// //                     <div className="mb-4">
// //                         <label className="flex items-center space-x-2 text-primary">
// //                             <input
// //                                 type="checkbox"
// //                                 name="sendCode"
// //                                 checked={organizerData.sendCode}
// //                                 onChange={handleChange}
// //                             />
// //                             <span>Send Unique Code for First-Time Login</span>
// //                         </label>
// //                     </div>

// //                     <button type="submit" className="bg-primary text-white p-2 rounded-md w-full hover:bg-secondary">
// //                         Create Organizer
// //                     </button>
// //                 </form>
// //             </div>
// //         </div>
// //     );
// // }



// // PART 2 WAS WORKING BELOW

// // import { useState } from 'react';

// // export default function CreateOrganizer() {
// //     const [organizerData, setOrganizerData] = useState({
// //         email: '',
// //         role: 'organizer',
// //         tags: '',
// //         defaultPassword: 'Welcome123',
// //         sendCode: false
// //     });

// //     const tagsOptions = ['Fitness', 'Healthcare', 'Education'];

// //     const handleChange = (e) => {
// //         const { name, value, type, checked } = e.target;
// //         setOrganizerData((prev) => ({
// //             ...prev,
// //             [name]: type === 'checkbox' ? checked : value
// //         }));
// //     };

// //     const handleSubmit = (e) => {
// //         e.preventDefault();

// //         const storedOrganizers = JSON.parse(localStorage.getItem('organizers')) || [];
// //         storedOrganizers.push(organizerData);
// //         localStorage.setItem('organizers', JSON.stringify(storedOrganizers));

// //         alert(`Organizer Created! Default Password: ${organizerData.defaultPassword}`);
// //     };

// //     return (
// //         <div className="min-h-screen bg-tertiary flex items-center justify-center p-8">
// //             <div className="bg-accent p-8 rounded-lg shadow-md w-full max-w-md">
// //                 <h1 className="text-3xl font-bold text-primary mb-6 text-center">Create Organizer</h1>

// //                 <form onSubmit={handleSubmit}>
// //                     <div className="mb-4">
// //                         <label className="block text-sm font-medium text-primary">Email</label>
// //                         <input
// //                             type="email"
// //                             name="email"
// //                             value={organizerData.email}
// //                             onChange={handleChange}
// //                             className="w-full p-2 border border-primary rounded-md"
// //                             required
// //                         />
// //                     </div>

// //                     {/* Role Dropdown */}
// //                     <div className="mb-4">
// //                         <label className="block text-sm font-medium text-primary">Role</label>
// //                         <select
// //                             name="role"
// //                             value={organizerData.role}
// //                             onChange={handleChange}
// //                             className="w-full p-2 border border-primary rounded-md"
// //                         >
// //                             <option value="organizer">Organizer</option>
// //                             <option value="admin">Admin</option>
// //                         </select>
// //                     </div>

// //                     {/* Tags Dropdown */}
// //                     <div className="mb-4">
// //                         <label className="block text-sm font-medium text-primary">Tags</label>
// //                         <select
// //                             name="tags"
// //                             value={organizerData.tags}
// //                             onChange={handleChange}
// //                             className="w-full p-2 border border-primary rounded-md"
// //                         >
// //                             <option value="">Select Tag</option>
// //                             {tagsOptions.map(tag => (
// //                                 <option key={tag} value={tag}>{tag}</option>
// //                             ))}
// //                         </select>
// //                     </div>

// //                     <button type="submit" className="bg-primary text-white p-2 rounded-md w-full">
// //                         Create Organizer
// //                     </button>
// //                 </form>
// //             </div>
// //         </div>
// //     );
// // }





// import { useState } from 'react';

// export default function CreateOrganizer() {
//     const [organizerData, setOrganizerData] = useState({
//         name: '',
//         email: '',
//         role: 'organizer',
//         tags: '',
//         defaultPassword: 'Welcome123', // Default password
//         isFirstLogin: true  // Track first-time login
//     });

//     const tagsOptions = ['Fitness', 'Healthcare', 'Education'];

//     const handleChange = (e) => {
//         const { name, value, type, checked } = e.target;
//         setOrganizerData((prev) => ({
//             ...prev,
//             [name]: type === 'checkbox' ? checked : value
//         }));
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         const storedOrganizers = JSON.parse(localStorage.getItem('organizers')) || [];
//         storedOrganizers.push(organizerData);
//         localStorage.setItem('organizers', JSON.stringify(storedOrganizers));

//         alert(`Organizer Created!\nDefault Password: ${organizerData.defaultPassword}`);
//     };

//     return (
//         <div className="min-h-screen bg-tertiary flex items-center justify-center p-8">
//             <div className="bg-accent p-8 rounded-lg shadow-md w-full max-w-md">
//                 <h1 className="text-3xl font-bold text-primary mb-6 text-center">Create Organizer</h1>

//                 <form onSubmit={handleSubmit}>
//                     <div className="mb-4">
//                         <label className="block text-sm font-medium text-primary">Name</label>
//                         <input
//                             type="text"
//                             name="name"
//                             value={organizerData.name}
//                             onChange={handleChange}
//                             className="w-full p-2 border border-primary rounded-md"
//                             required
//                         />
//                     </div>

//                     <div className="mb-4">
//                         <label className="block text-sm font-medium text-primary">Email</label>
//                         <input
//                             type="email"
//                             name="email"
//                             value={organizerData.email}
//                             onChange={handleChange}
//                             className="w-full p-2 border border-primary rounded-md"
//                             required
//                         />
//                     </div>

//                     {/* Tags Dropdown */}
//                     <div className="mb-4">
//                         <label className="block text-sm font-medium text-primary">Tags</label>
//                         <select
//                             name="tags"
//                             value={organizerData.tags}
//                             onChange={handleChange}
//                             className="w-full p-2 border border-primary rounded-md"
//                         >
//                             <option value="">Select Tag</option>
//                             {tagsOptions.map(tag => (
//                                 <option key={tag} value={tag}>{tag}</option>
//                             ))}
//                         </select>
//                     </div>

//                     <div className="mb-4">
//                         <label className="block text-sm font-medium text-primary">Default Password</label>
//                         <input
//                             type="text"
//                             name="defaultPassword"
//                             value={organizerData.defaultPassword}
//                             className="w-full p-2 border border-primary rounded-md"
//                             readOnly
//                         />
//                     </div>

//                     <button type="submit" className="bg-primary text-white p-2 rounded-md w-full">
//                         Create Organizer
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// }








import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateOrganizer() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    age: '',
    address: '',
    nationality: '',
    experience: '',
    availability: '',
    motivation: '',
    tags: '',
    receiveNotifications: false,
    defaultPassword: 'Welcome123'
  });

  const tagsOptions = ['Education', 'Healthcare', 'Environment', 'Technology'];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;

    setFormData(prev => ({
      ...prev,
      [name]: fieldValue
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const organizers = JSON.parse(localStorage.getItem('organizers')) || [];
    organizers.push({ ...formData, isFirstLogin: true });
    localStorage.setItem('organizers', JSON.stringify(organizers));

    alert('Organizer created successfully!');
    navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-tertiary flex items-center justify-center p-8">
      <div className="bg-accent p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold text-primary mb-6 text-center">Create Organizer</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {['fullName', 'email', 'phone', 'age', 'address', 'nationality'].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-primary">
                {field.replace(/([A-Z])/g, ' $1').trim()} *
              </label>
              <input
                type={field === 'age' ? 'number' : 'text'}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                required
                className="w-full p-2 border border-primary rounded-md"
              />
            </div>
          ))}

          {/* Experience Field */}
          <div>
            <label className="block text-sm font-medium text-primary">Previous Experience</label>
            <textarea
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="w-full p-2 border border-primary rounded-md"
            />
          </div>

          {/* Tags Dropdown */}
          <div>
            <label className="block text-sm font-medium text-primary">Tags</label>
            <select
              name="tags"
              value={formData.tags}
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

          {/* Default Password */}
          <div>
            <label className="block text-sm font-medium text-primary">Default Password</label>
            <input
              type="text"
              name="defaultPassword"
              value={formData.defaultPassword}
              readOnly
              className="w-full p-2 border border-primary rounded-md bg-gray-200"
            />
          </div>

          {/* Notification Checkbox */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="receiveNotifications"
              checked={formData.receiveNotifications}
              onChange={handleChange}
            />
            <label className="text-sm text-primary">I would like to receive notifications</label>
          </div>

          <button
            type="submit"
            className="bg-primary text-white p-2 rounded-md w-full hover:bg-secondary"
          >
            Create Organizer
          </button>
        </form>
      </div>
    </div>
  );
}
