import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function ParticipantForm() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    age: '',
    address: '',
    nationality: '',
    disability: '',
    requirements: '',
    emergencyContact: '',
    receiveUpdates: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Implement form submission logic
    console.log('Form submitted:', formData);
    navigate('/events'); // Navigate back to events page after submission
  };

  return (
    <div className="min-h-screen bg-tertiary">
      <div className="container">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-primary">
              Participant Registration
            </h2>
            <p className="mt-2 text-sm text-secondary">
              {eventId ? 'Register as a participant for this event' : 'Join our events as a participant'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 bg-accent p-8 rounded-lg shadow">
            {/* Personal Information */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-primary">
                Full Name *
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                required
                className="mt-1 block w-full rounded-md border-primary-300 shadow-sm focus:border-primary focus:ring-primary text-primary bg-accent"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-primary">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="mt-1 block w-full rounded-md border-primary-300 shadow-sm focus:border-primary focus:ring-primary text-primary bg-accent"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-primary">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  className="mt-1 block w-full rounded-md border-primary-300 shadow-sm focus:border-primary focus:ring-primary text-primary bg-accent"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="age" className="block text-sm font-medium text-primary">
                  Age *
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  required
                  min="1"
                  className="mt-1 block w-full rounded-md border-primary-300 shadow-sm focus:border-primary focus:ring-primary text-primary bg-accent"
                  value={formData.age}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="nationality" className="block text-sm font-medium text-primary">
                  Nationality *
                </label>
                <input
                  type="text"
                  id="nationality"
                  name="nationality"
                  required
                  className="mt-1 block w-full rounded-md border-primary-300 shadow-sm focus:border-primary focus:ring-primary text-primary bg-accent"
                  value={formData.nationality}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-primary">
                Address *
              </label>
              <textarea
                id="address"
                name="address"
                required
                rows={3}
                className="mt-1 block w-full rounded-md border-primary-300 shadow-sm focus:border-primary focus:ring-primary text-primary bg-accent"
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            {/* Disability Information */}
            <div>
              <label htmlFor="disability" className="block text-sm font-medium text-primary">
                Type of Disability (if any)
              </label>
              <input
                type="text"
                id="disability"
                name="disability"
                className="mt-1 block w-full rounded-md border-primary-300 shadow-sm focus:border-primary focus:ring-primary text-primary bg-accent"
                placeholder="e.g., Visual Impairment, Hearing Impairment, Physical Disability"
                value={formData.disability}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="requirements" className="block text-sm font-medium text-primary">
                Special Requirements
              </label>
              <textarea
                id="requirements"
                name="requirements"
                rows={3}
                className="mt-1 block w-full rounded-md border-primary-300 shadow-sm focus:border-primary focus:ring-primary text-primary bg-accent"
                placeholder="Please specify any special requirements or accommodations needed"
                value={formData.requirements}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="emergencyContact" className="block text-sm font-medium text-primary">
                Emergency Contact *
              </label>
              <input
                type="text"
                id="emergencyContact"
                name="emergencyContact"
                required
                className="mt-1 block w-full rounded-md border-primary-300 shadow-sm focus:border-primary focus:ring-primary text-primary bg-accent"
                placeholder="Name and phone number of emergency contact"
                value={formData.emergencyContact}
                onChange={handleChange}
              />
            </div>

            {/* Additional Preferences */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="receiveUpdates"
                name="receiveUpdates"
                className="h-4 w-4 text-primary focus:ring-primary border-primary-300 rounded"
                checked={formData.receiveUpdates}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  receiveUpdates: e.target.checked
                }))}
              />
              <label htmlFor="receiveUpdates" className="ml-2 block text-sm text-primary">
                I would like to receive updates about future events and opportunities
              </label>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-accent bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Submit Registration
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 