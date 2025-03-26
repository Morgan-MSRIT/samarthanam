import React from 'react';
import { useNavigate } from 'react-router-dom';

const SuccessfulRegistration = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/events'); // Redirect to the events page
  };

  return (
    <div className="min-h-screen bg-tertiary-100 flex items-center justify-center">
      <div className="max-w-md w-full bg-accent p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-primary text-center mb-4">
          Registration Successful!
        </h2>
        <p className="text-center mb-4">
          We look forward to seeing you there! 🎉
        </p>
        <button 
          onClick={handleRedirect} 
          className="mt-4 w-full bg-primary text-white py-2 rounded">
          See Other Events
        </button>
      </div>
    </div>
  );
};

export default SuccessfulRegistration;
