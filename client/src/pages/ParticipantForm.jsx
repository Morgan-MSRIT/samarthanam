import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ParticipantForm() {
  const { eventId } = useParams();  // This is the event ID from URL params
  const navigate = useNavigate();  // To navigate to another page after success
  const [formData, setFormData] = useState({ fullName: '', email: '' });
  const [otpSent, setOtpSent] = useState(false);  // State to track if OTP was sent

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/api/v1/auth/sendotp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, eventId }), // Pass the eventId too, if necessary
      });
      if (response.ok) {
        toast.success("OTP sent successfully!");
        setOtpSent(true);
      } else {
        toast.error("Failed to send OTP. Please try again.");
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      toast.error("An error occurred while sending OTP.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send OTP to backend for verification
      const response = await fetch('http://localhost:4000/api/v1/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, otp: formData.otp, eventId }),
      });
      if (response.ok) {
        toast.success("Successfully registered as a participant!", { 
          autoClose: false,  // Prevent the toast from auto closing
          closeButton: true  // Allow the user to close the toast manually
        });
        // Redirect to the events page after success
        navigate('/events');
      } else {
        toast.error("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      toast.error("Error occurred while verifying OTP.");
    }
  };

  return (
    <div className="min-h-screen bg-tertiary flex items-center justify-center">
      <ToastContainer />
      <div className="max-w-md w-full bg-accent p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-primary text-center mb-4">Participant Registration</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-primary">Full Name *</label>
            <input
              type="text"
              name="fullName"
              required
              className="w-full mt-1 p-2 border rounded"
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-primary">Email *</label>
            <input
              type="email"
              name="email"
              required
              className="w-full mt-1 p-2 border rounded"
              value={formData.email}
              onChange={handleChange}
              disabled={otpSent}  // Disable the email field after OTP is sent
            />
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
                <label className="block text-sm font-medium text-primary">Enter OTP</label>
                <input
                  type="text"
                  name="otp"
                  required
                  className="w-full mt-1 p-2 border rounded"
                  value={formData.otp}
                  onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
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
