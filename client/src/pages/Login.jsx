// // import { useState } from 'react';
// // import { Link } from 'react-router-dom';

// // export default function Login() {
// //   const [formData, setFormData] = useState({
// //     email: '',
// //     password: '',
// //   });

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     // TODO: Implement login logic
// //     console.log('Login form submitted:', formData);
// //   };

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData(prev => ({
// //       ...prev,
// //       [name]: value
// //     }));
// //   };

// //   return (
// //     <div className="min-h-screen bg-tertiary">
// //       <div className="container">
// //         <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
// //           <div className="max-w-md w-full space-y-8">
// //             <div>
// //               <h2 className="mt-6 text-center text-3xl font-extrabold text-primary">
// //                 Sign in to your account
// //               </h2>
// //               <p className="mt-2 text-center text-sm text-secondary">
// //                 Or{' '}
// //                 <Link to="/volunteer" className="font-medium text-primary hover:text-secondary">
// //                   register as a volunteer
// //                 </Link>
// //               </p>
// //             </div>
// //             <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
// //               <div className="rounded-md shadow-sm -space-y-px">
// //                 <div>
// //                   <label htmlFor="email" className="sr-only">
// //                     Email address
// //                   </label>
// //                   <input
// //                     id="email"
// //                     name="email"
// //                     type="email"
// //                     required
// //                     className="appearance-none rounded-none relative block w-full px-3 py-2 border border-primary-300 placeholder-secondary-500 text-primary bg-accent rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
// //                     placeholder="Email address"
// //                     value={formData.email}
// //                     onChange={handleChange}
// //                   />
// //                 </div>
// //                 <div>
// //                   <label htmlFor="password" className="sr-only">
// //                     Password
// //                   </label>
// //                   <input
// //                     id="password"
// //                     name="password"
// //                     type="password"
// //                     required
// //                     className="appearance-none rounded-none relative block w-full px-3 py-2 border border-primary-300 placeholder-secondary-500 text-primary bg-accent rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
// //                     placeholder="Password"
// //                     value={formData.password}
// //                     onChange={handleChange}
// //                   />
// //                 </div>
// //               </div>

// //               <div className="flex items-center justify-between">
// //                 <div className="flex items-center">
// //                   <input
// //                     id="remember-me"
// //                     name="remember-me"
// //                     type="checkbox"
// //                     className="h-4 w-4 text-primary focus:ring-primary border-primary-300 rounded"
// //                   />
// //                   <label htmlFor="remember-me" className="ml-2 block text-sm text-secondary">
// //                     Remember me
// //                   </label>
// //                 </div>

// //                 <div className="text-sm">
// //                   <a href="#" className="font-medium text-primary hover:text-secondary">
// //                     Forgot your password?
// //                   </a>
// //                 </div>
// //               </div>

// //               <div>
// //                 <button
// //                   type="submit"
// //                   className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-accent bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
// //                 >
// //                   Sign in
// //                 </button>
// //               </div>
// //             </form>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // } 






// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// export default function Login() {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Fetch organizers from localStorage
//     const organizers = JSON.parse(localStorage.getItem('organizers')) || [];
//     const loggedInUser = organizers.find(
//       (user) => user.email === formData.email && user.defaultPassword === formData.password
//     );

//     if (!loggedInUser) {
//       alert('Invalid email or password!');
//       return;
//     }

//     // Check if first login
//     if (loggedInUser.isFirstLogin) {
//       alert('First-time login detected. Please change your password.');
//       navigate('/change-password');
//     } else {
//       alert('Login successful!');
//       navigate('/dashboard');  // Redirect to the dashboard if password has been changed
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   return (
//     <div className="min-h-screen bg-tertiary">
//       <div className="container">
//         <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//           <div className="max-w-md w-full space-y-8">
//             <div>
//               <h2 className="mt-6 text-center text-3xl font-extrabold text-primary">
//                 Sign in to your account
//               </h2>
//               <p className="mt-2 text-center text-sm text-secondary">
//                 Or{' '}
//                 <Link to="/volunteer" className="font-medium text-primary hover:text-secondary">
//                   register as a volunteer
//                 </Link>
//               </p>
//             </div>

//             <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//               <div className="rounded-md shadow-sm -space-y-px">
//                 <div>
//                   <label htmlFor="email" className="sr-only">
//                     Email address
//                   </label>
//                   <input
//                     id="email"
//                     name="email"
//                     type="email"
//                     required
//                     className="appearance-none rounded-none relative block w-full px-3 py-2 border border-primary-300 placeholder-secondary-500 text-primary bg-accent rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
//                     placeholder="Email address"
//                     value={formData.email}
//                     onChange={handleChange}
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="password" className="sr-only">
//                     Password
//                   </label>
//                   <input
//                     id="password"
//                     name="password"
//                     type="password"
//                     required
//                     className="appearance-none rounded-none relative block w-full px-3 py-2 border border-primary-300 placeholder-secondary-500 text-primary bg-accent rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
//                     placeholder="Password"
//                     value={formData.password}
//                     onChange={handleChange}
//                   />
//                 </div>
//               </div>

//               <div className="flex items-center justify-between">
//                 <div className="flex items-center">
//                   <input
//                     id="remember-me"
//                     name="remember-me"
//                     type="checkbox"
//                     className="h-4 w-4 text-primary focus:ring-primary border-primary-300 rounded"
//                   />
//                   <label htmlFor="remember-me" className="ml-2 block text-sm text-secondary">
//                     Remember me
//                   </label>
//                 </div>

//                 <div className="text-sm">
//                   <a href="#" className="font-medium text-primary hover:text-secondary">
//                     Forgot your password?
//                   </a>
//                 </div>
//               </div>

//               <div>
//                 <button
//                   type="submit"
//                   className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-accent bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
//                 >
//                   Sign in
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const organizers = JSON.parse(localStorage.getItem('organizers')) || [];
        const loggedInUser = organizers.find(
            (user) =>
                user.email === formData.email &&
                user.defaultPassword === formData.password
        );

        if (!loggedInUser) {
            alert('Invalid email or password!');
            return;
        }

        if (loggedInUser.isFirstLogin) {
            alert('First-time login detected. Please change your password.');
            navigate('/change-password');
        } else {
            alert('Login successful!');
            navigate('/dashboard');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2 className="login-title">Sign in to your account</h2>
                <p className="text-sm text-secondary">
                    Or{' '}
                    <Link to="/volunteer" className="font-medium text-primary hover:text-secondary">
                        register as a volunteer
                    </Link>
                </p>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4"> {/* Added margin for spacing */}
                        <input
                            type="email"
                            name="email"
                            placeholder="Email address"
                            className="login-input"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-4"> {/* Added margin for spacing */}
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="login-input"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="flex items-center justify-between text-sm mt-3">
                        <div className="flex items-center">
                            <input type="checkbox" id="remember-me" className="mr-1" />
                            <label htmlFor="remember-me">Remember me</label>
                        </div>

                        <a href="#" className="text-primary hover:text-secondary">
                            Forgot your password?
                        </a>
                    </div>

                    <button type="submit" className="login-btn">
                        Sign in
                    </button>
                </form>
            </div>
        </div>
    );
}
