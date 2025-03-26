import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { sendOtp, signup, getTags } from "../services/apiService";

export default function VolunteerForm() {
  // State variables
  const [email, setEmail] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    nationality: "",
    emailNotifAllow: false,
    tags: [],
    otp: "",
  });
  const [tags, setTags] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch tags when the component mounts
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await getTags();
        if (response.success) {
          setTags(response.data);
        } else {
          setError(response.message || "Failed to fetch tags");
        }
      } catch (err) {
        setError(err.message);
      }
    };
    fetchTags();
  }, []);

  // Handle sending OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await sendOtp(email);
      if (response.success) {
        setIsOtpSent(true);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle tag selection
  const handleTagChange = (tagId) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.includes(tagId)
        ? prev.tags.filter((id) => id !== tagId)
        : [...prev.tags, tagId],
    }));
  };

  // Handle form submission for signup
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const dataToSend = {
        ...formData,
        email,
        role: "volunteer", // Hardcoded as per requirement
      };
      const response = await signup(dataToSend);
      if (response.success) {
        navigate("/login");
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-tertiary-100">
      <div className="container-fluid">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-primary">
              Volunteer Registration
            </h2>
            <p className="mt-2 text-sm text-secondary">
              Register as a volunteer to join our community
            </p>
          </div>
          {error && <p className="text-red-500 text-center">{error}</p>}

          {/* Step 1: Email Input and Send OTP */}
          {!isOtpSent ? (
            <form
              onSubmit={handleSendOtp}
              className="space-y-6 bg-accent p-8 rounded-lg shadow-lg"
            >
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-primary"
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 block w-full rounded-md border-primary-300 shadow-sm focus:border-primary focus:ring-primary text-primary bg-accent"
                />
              </div>
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-accent bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary cursor-pointer"
                >
                  {loading ? "Sending OTP..." : "Send OTP"}
                </button>
              </div>
            </form>
          ) : (
            /* Step 2: Full Registration Form */
            <form
              onSubmit={handleSubmit}
              className="space-y-6 bg-accent p-8 rounded-lg shadow-lg"
            >
              <div>
                <label
                  htmlFor="otp"
                  className="block text-sm font-medium text-primary"
                >
                  OTP *
                </label>
                <input
                  type="text"
                  id="otp"
                  name="otp"
                  value={formData.otp}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-primary-300 shadow-sm focus:border-primary focus:ring-primary text-primary bg-accent"
                />
              </div>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-primary"
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-primary-300 shadow-sm focus:border-primary focus:ring-primary text-primary bg-accent"
                />
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="age"
                    className="block text-sm font-medium text-primary"
                  >
                    Age *
                  </label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    required
                    min="18"
                    className="mt-1 block w-full rounded-md border-primary-300 shadow-sm focus:border-primary focus:ring-primary text-primary bg-accent"
                  />
                </div>
                <div>
                  <label
                    htmlFor="nationality"
                    className="block text-sm font-medium text-primary"
                  >
                    Nationality *
                  </label>
                  <input
                    type="text"
                    id="nationality"
                    name="nationality"
                    value={formData.nationality}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-primary-300 shadow-sm focus:border-primary focus:ring-primary text-primary bg-accent"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-primary"
                >
                  Password *
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-primary-300 shadow-sm focus:border-primary focus:ring-primary text-primary bg-accent"
                />
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-primary"
                >
                  Confirm Password *
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-primary-300 shadow-sm focus:border-primary focus:ring-primary text-primary bg-accent"
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-primary"
                >
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-primary-300 shadow-sm focus:border-primary focus:ring-primary text-primary bg-accent"
                />
              </div>
              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-primary"
                >
                  Address *
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="mt-1 block w-full rounded-md border-primary-300 shadow-sm focus:border-primary focus:ring-primary text-primary bg-accent"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="emailNotifAllow"
                  name="emailNotifAllow"
                  checked={formData.emailNotifAllow}
                  onChange={handleChange}
                  className="h-4 w-4 text-primary focus:ring-primary border-primary-300 rounded"
                />
                <label
                  htmlFor="emailNotifAllow"
                  className="ml-2 block text-sm text-primary"
                >
                  Allow Email Notifications
                </label>
              </div>
              <div>
                <p className="block text-sm font-medium text-primary mb-2">
                  Tags
                </p>
                {tags.length > 0 ? (
                  <div className="flex flex-wrap gap-4">
                    {tags.map((tag) => (
                      <div key={tag._id} className="mt-2">
                        <input
                          type="checkbox"
                          id={`tag-${tag._id}`}
                          value={tag._id}
                          checked={formData.tags.includes(tag._id)}
                          onChange={() => handleTagChange(tag._id)}
                          className="hidden peer"
                        />
                        <label
                          htmlFor={`tag-${tag._id}`}
                          className="px-3 py-1 border border-primary-300 rounded-full cursor-pointer bg-accent text-primary hover:bg-primary-200 hover:text-accent peer-checked:bg-primary peer-checked:text-accent peer-checked:border-primary transition-colors duration-200"
                        >
                          {tag.name}
                        </label>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-secondary">No tags available</p>
                )}
              </div>
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-accent bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary cursor-pointer"
                >
                  {loading ? "Signing Up..." : "Sign Up"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
