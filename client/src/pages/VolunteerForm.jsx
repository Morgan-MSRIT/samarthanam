import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function VolunteerForm() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    age: '',
    address: '',
    nationality: '',
    skills: '',
    experience: '',
    availability: '',
    motivation: '',
    volunteerOtherEvents: false,
    keywords: '',
    receiveNotifications: false
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
    navigate(`/tasks/${eventId || 'general'}`); // Navigate to task list after submission
  };

  return (
    <div className="min-h-screen bg-tertiary">
      {/* Navigation */}
      <nav className="bg-tertiary shadow fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link to="/">
                  <img
                    className="h-16 w-auto"
                    src="/samarthanam-logo.png"
                    alt="Samarthanam Trust"
                  />
                </Link>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link
                  to="/"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-primary hover:text-secondary"
                >
                  Home
                </Link>
                <Link
                  to="/events"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-primary hover:text-secondary"
                >
                  Events
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-primary hover:text-secondary"
                >
                  About Us
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-primary hover:text-secondary"
                >
                  Contact Us
                </Link>
              </div>
            </div>
            <div className="flex items-center">
              <Link
                to="/login"
                className="ml-8 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-accent bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Add padding to account for fixed navbar */}
      <div className="pt-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-primary">
              Volunteer Registration
            </h2>
            <p className="mt-2 text-sm text-secondary">
              {eventId ? 'Register as a volunteer for this event' : 'Join our volunteer community'}
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
                  min="18"
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

            {/* Volunteer Information */}
            <div>
              <label htmlFor="skills" className="block text-sm font-medium text-primary">
                Skills and Expertise
              </label>
              <input
                type="text"
                id="skills"
                name="skills"
                className="mt-1 block w-full rounded-md border-primary-300 shadow-sm focus:border-primary focus:ring-primary text-primary bg-accent"
                placeholder="e.g., Teaching, Event Management, Sports Training"
                value={formData.skills}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="experience" className="block text-sm font-medium text-primary">
                Previous Volunteer Experience
              </label>
              <textarea
                id="experience"
                name="experience"
                rows={3}
                className="mt-1 block w-full rounded-md border-primary-300 shadow-sm focus:border-primary focus:ring-primary text-primary bg-accent"
                placeholder="Tell us about your previous volunteer experience"
                value={formData.experience}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="availability" className="block text-sm font-medium text-primary">
                Availability
              </label>
              <input
                type="text"
                id="availability"
                name="availability"
                className="mt-1 block w-full rounded-md border-primary-300 shadow-sm focus:border-primary focus:ring-primary text-primary bg-accent"
                placeholder="e.g., Weekends, Afternoons, Full-time"
                value={formData.availability}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="motivation" className="block text-sm font-medium text-primary">
                Why do you want to volunteer? *
              </label>
              <textarea
                id="motivation"
                name="motivation"
                required
                rows={3}
                className="mt-1 block w-full rounded-md border-primary-300 shadow-sm focus:border-primary focus:ring-primary text-primary bg-accent"
                value={formData.motivation}
                onChange={handleChange}
              />
            </div>

            {/* Additional Preferences */}
            <div className="space-y-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="volunteerOtherEvents"
                  name="volunteerOtherEvents"
                  className="h-4 w-4 text-primary focus:ring-primary border-primary-300 rounded"
                  checked={formData.volunteerOtherEvents}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    volunteerOtherEvents: e.target.checked
                  }))}
                />
                <label htmlFor="volunteerOtherEvents" className="ml-2 block text-sm text-primary">
                  I would like to volunteer in other events as well
                </label>
              </div>

              {formData.volunteerOtherEvents && (
                <div>
                  <label htmlFor="keywords" className="block text-sm font-medium text-primary">
                    Keywords for Event Matching
                  </label>
                  <input
                    type="text"
                    id="keywords"
                    name="keywords"
                    className="mt-1 block w-full rounded-md border-primary-300 shadow-sm focus:border-primary focus:ring-primary text-primary bg-accent"
                    placeholder="e.g., Education, Sports, Arts, Technology, Health"
                    value={formData.keywords}
                    onChange={handleChange}
                  />
                  <p className="mt-1 text-sm text-secondary">
                    Enter keywords separated by commas to help us match you with similar events
                  </p>
                </div>
              )}

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="receiveNotifications"
                  name="receiveNotifications"
                  className="h-4 w-4 text-primary focus:ring-primary border-primary-300 rounded"
                  checked={formData.receiveNotifications}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    receiveNotifications: e.target.checked
                  }))}
                />
                <label htmlFor="receiveNotifications" className="ml-2 block text-sm text-primary">
                  I would like to receive notifications about upcoming events and opportunities
                </label>
              </div>
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