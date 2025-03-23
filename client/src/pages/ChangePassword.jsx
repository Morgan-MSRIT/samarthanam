// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// export default function ChangePassword() {
//     const navigate = useNavigate();

//     const [passwordData, setPasswordData] = useState({
//         newPassword: '',
//         confirmPassword: ''
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setPasswordData((prev) => ({
//             ...prev,
//             [name]: value
//         }));
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         if (passwordData.newPassword !== passwordData.confirmPassword) {
//             alert('Passwords do not match!');
//             return;
//         }

//         // Update database flag
//         const organizers = JSON.parse(localStorage.getItem('organizers')) || [];
//         const updatedOrganizers = organizers.map(organizer => ({
//             ...organizer,
//             isFirstLogin: false  // Mark first login as completed
//         }));
//         localStorage.setItem('organizers', JSON.stringify(updatedOrganizers));

//         alert('Password changed successfully!');
//         navigate('/login');  // Redirect to login after successful password change
//     };

//     return (
//         <div className="min-h-screen bg-tertiary flex items-center justify-center p-8">
//             <div className="bg-accent p-8 rounded-lg shadow-md w-full max-w-md">
//                 <h1 className="text-3xl font-bold text-primary mb-6 text-center">Change Password</h1>

//                 <form onSubmit={handleSubmit}>
//                     <div className="mb-4">
//                         <label className="block text-sm font-medium text-primary">New Password</label>
//                         <input
//                             type="password"
//                             name="newPassword"
//                             value={passwordData.newPassword}
//                             onChange={handleChange}
//                             className="w-full p-2 border border-primary rounded-md"
//                             required
//                         />
//                     </div>

//                     <div className="mb-4">
//                         <label className="block text-sm font-medium text-primary">Confirm Password</label>
//                         <input
//                             type="password"
//                             name="confirmPassword"
//                             value={passwordData.confirmPassword}
//                             onChange={handleChange}
//                             className="w-full p-2 border border-primary rounded-md"
//                             required
//                         />
//                     </div>

//                     <button type="submit" className="bg-primary text-white p-2 rounded-md w-full">
//                         Change Password
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// }


// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// export default function ChangePassword() {
//     const navigate = useNavigate();

//     const [passwordData, setPasswordData] = useState({
//         newPassword: '',
//         confirmPassword: ''
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setPasswordData((prev) => ({
//             ...prev,
//             [name]: value
//         }));
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         if (passwordData.newPassword !== passwordData.confirmPassword) {
//             alert('Passwords do not match!');
//             return;
//         }

//         // Update database flag
//         const organizers = JSON.parse(localStorage.getItem('organizers')) || [];
//         const updatedOrganizers = organizers.map(organizer => ({
//             ...organizer,
//             isFirstLogin: false  // Mark first login as completed
//         }));
//         localStorage.setItem('organizers', JSON.stringify(updatedOrganizers));

//         alert('Password changed successfully!');
//         navigate('/login');  // Redirect to login after successful password change
//     };

//     return (
//         <div className="min-h-screen bg-tertiary flex items-center justify-center p-8">
//             <div className="bg-accent p-8 rounded-lg shadow-md w-full max-w-md">
//                 <h1 className="text-3xl font-bold text-primary mb-6 text-center">Change Password</h1>

//                 <form onSubmit={handleSubmit}>
//                     <div className="mb-4">
//                         <label className="block text-sm font-medium text-primary">New Password</label>
//                         <input
//                             type="password"
//                             name="newPassword"
//                             value={passwordData.newPassword}
//                             onChange={handleChange}
//                             className="w-full p-2 border border-primary rounded-md"
//                             required
//                         />
//                     </div>

//                     <div className="mb-4">
//                         <label className="block text-sm font-medium text-primary">Confirm Password</label>
//                         <input
//                             type="password"
//                             name="confirmPassword"
//                             value={passwordData.confirmPassword}
//                             onChange={handleChange}
//                             className="w-full p-2 border border-primary rounded-md"
//                             required
//                         />
//                     </div>

//                     <button type="submit" className="bg-primary text-white p-2 rounded-md w-full">
//                         Change Password
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// }








import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ChangePassword() {
    const navigate = useNavigate();

    const [passwordData, setPasswordData] = useState({
        newPassword: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPasswordData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        // Update the organizer's password in localStorage
        const organizers = JSON.parse(localStorage.getItem('organizers')) || [];
        const updatedOrganizers = organizers.map(organizer =>
            organizer.isFirstLogin
                ? { ...organizer, defaultPassword: passwordData.newPassword, isFirstLogin: false }
                : organizer
        );
        
        localStorage.setItem('organizers', JSON.stringify(updatedOrganizers));

        alert('Password changed successfully!');
        navigate('/login');  // Redirect to login page after successful password change
    };

    return (
        <div className="min-h-screen bg-tertiary flex items-center justify-center p-8">
            <div className="bg-accent p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-3xl font-bold text-primary mb-6 text-center">Change Password</h1>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-primary">New Password</label>
                        <input
                            type="password"
                            name="newPassword"
                            value={passwordData.newPassword}
                            onChange={handleChange}
                            className="w-full p-2 border border-primary rounded-md"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-primary">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={passwordData.confirmPassword}
                            onChange={handleChange}
                            className="w-full p-2 border border-primary rounded-md"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-primary text-white p-2 rounded-md w-full hover:bg-secondary"
                    >
                        Change Password
                    </button>
                </form>
            </div>
        </div>
    );
}
