import { useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ParticipantForm() {
  const { eventId } = useParams(); // Extract the event ID from URL params
  const navigate = useNavigate(); // Used for navigating after successful registration
  const [formData, setFormData] = useState({ fullName: '', email: '', otp: '' }); // Added 'otp' to the initial state
  const [otpSent, setOtpSent] = useState(false); // Track OTP status
  const liveRegionRef = useRef(null); // Live region ref for screen reader

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const announceMessage = (message) => {
    // Announce the toast messages dynamically in the live region for screen readers
    if (liveRegionRef.current) {
      liveRegionRef.current.textContent = message;
      // Clear the message after a short delay to allow subsequent messages
      setTimeout(() => {
        liveRegionRef.current.textContent = '';
      }, 1000); // Increased delay for better accessibility
    }
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/api/v1/auth/sendotp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, eventId }), // Ensure eventId is sent
      });
      if (response.ok) {
        const successMessage = "OTP sent successfully!";
        toast.success(successMessage, { autoClose: 5000 }); // Toast stays longer
        announceMessage(successMessage); // Announce the success message
        setOtpSent(true);
      } else {
        const data = await response.json();
        const errorMessage = data.message || "Failed to send OTP. Please try again.";
        toast.error(errorMessage, { autoClose: 5000 }); // Toast stays longer
        announceMessage(errorMessage); // Announce the error message
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      const errorMessage = "An error occurred while sending OTP.";
      toast.error(errorMessage, { autoClose: 5000 }); // Toast stays longer
      announceMessage(errorMessage); // Announce the error message
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/api/v1/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          otp: formData.otp,
          eventId
        }), // Pass email, OTP, and eventId
      });
      if (response.ok) {
        const data = await response.json();
  
        // Check if already registered
        if (data.message.includes('already registered')) {
          const infoMessage = "You have already registered for this event! You will be redirected to explore other events.";
          toast.info(infoMessage, { autoClose: 10000 }); // Toast stays longer
          announceMessage(infoMessage);
          setTimeout(() => {
            navigate('/events'); // Redirect to the events page after a 10-second delay
          }, 10000);
        } else {
          const successMessage = "OTP verified successfully, you are now registered!";
          toast.success(successMessage, { autoClose: 5000 });
          announceMessage(successMessage);
          navigate('/successful-registration'); // Redirect immediately
        }
      } else {
        const data = await response.json();
        const errorMessage = data.message || "Invalid OTP. Please try again.";
        toast.error(errorMessage, { autoClose: 5000 });
        announceMessage(errorMessage);
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      const errorMessage = "An error occurred while verifying OTP.";
      toast.error(errorMessage, { autoClose: 5000 });
      announceMessage(errorMessage);
    }
  };
  

  return (
    <div className="min-h-screen bg-tertiary-100 flex items-center justify-center">
      <ToastContainer />
      <div className="max-w-md w-full bg-accent p-6 rounded-lg shadow-md">
      {/* Hidden ARIA live region for announcements */}
      <div
        ref={liveRegionRef}
        aria-live="assertive"
        aria-atomic="true"
        style={{
          position: 'absolute',
          width: '1px',
          height: '1px',
          overflow: 'hidden',
          clip: 'rect(1px, 1px, 1px, 1px)'
        }}
      ></div>
      <div className="max-w-md w-full bg-accent p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-primary text-center mb-4">Participant Registration</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-primary">Full Name *</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              required
              className="w-full mt-1 p-2 border rounded"
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-primary">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full mt-1 p-2 border rounded"
              value={formData.email}
              onChange={handleChange}
              disabled={otpSent} // Disable email field after OTP is sent
              aria-describedby="email-help"
            />
            <small id="email-help" className="text-sm text-gray-600">
              We'll never share your email with anyone else.
            </small>
          </div>
          {!otpSent ? (
            <button
              type="button"
              className="w-full bg-primary text-white p-2 rounded"
              onClick={handleSendOtp}
            >
              Send OTP
            </button>
          ) : (
            <>
              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-primary">Enter OTP *</label>
                <input
                  type="text"
                  id="otp"
                  name="otp"
                  required
                  className="w-full mt-1 p-2 border rounded"
                  value={formData.otp}
                  onChange={(e) => setFormData((prev) => ({ ...prev, otp: e.target.value }))}
                />
              </div>
              <button type="submit" className="w-full bg-primary text-white p-2 rounded">
                Verify & Register
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
