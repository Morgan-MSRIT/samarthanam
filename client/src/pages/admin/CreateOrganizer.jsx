import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signup, getTags, organizerSignup } from "../../services/apiService";
import {
  FaEnvelope,
  FaUser,
  FaBirthdayCake,
  FaLock,
  FaPhone,
  FaHome,
  FaFlag,
  FaUserPlus,
} from "react-icons/fa";

export default function CreateOrganizer() {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    age: "",
    password: "Password123@",
    phone: "",
    address: "",
    nationality: "",
    emailNotifAllow: false,
    tags: [],
    role: "organiser",
  });
  const [tags, setTags] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleTagChange = (tagId) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.includes(tagId)
        ? prev.tags.filter((id) => id !== tagId)
        : [...prev.tags, tagId],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const dataToSend = { ...formData };
      const response = await organizerSignup(dataToSend);
      if (response.success) {
        navigate("/admin/dashboard");
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
    <div className="min-h-screen bg-tertiary-100 flex items-center justify-center py-6">
      <div className="max-w-2xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-primary">
            Organizer Registration
          </h2>
          <p className="mt-2 text-sm text-secondary">
            Register organizer to manage our community
          </p>
        </div>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-accent p-8 rounded-lg shadow-lg"
        >
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-primary"
            >
              Email *
            </label>
            <div className="flex items-center mt-1 space-x-2">
              <FaEnvelope className="text-primary" />
              <input
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="flex-1 py-2 px-4 rounded-md border border-primary-300 focus:border-primary focus:ring-primary text-primary bg-accent"
              />
            </div>
          </div>

          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-primary"
            >
              Full Name *
            </label>
            <div className="flex items-center mt-1 space-x-2">
              <FaUser className="text-primary" />
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="flex-1 py-2 px-4 rounded-md border border-primary-300 focus:border-primary focus:ring-primary text-primary bg-accent"
              />
            </div>
          </div>

          {/* Age and Nationality */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="age"
                className="block text-sm font-medium text-primary"
              >
                Age *
              </label>
              <div className="flex items-center mt-1 space-x-2">
                <FaBirthdayCake className="text-primary" />
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                  min="18"
                  className="flex-1 py-2 px-4 rounded-md border border-primary-300 focus:border-primary focus:ring-primary text-primary bg-accent"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="nationality"
                className="block text-sm font-medium text-primary"
              >
                Nationality *
              </label>
              <div className="flex items-center mt-1 space-x-2">
                <FaFlag className="text-primary" />
                <input
                  type="text"
                  id="nationality"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleChange}
                  required
                  className="flex-1 py-2 px-4 rounded-md border border-primary-300 focus:border-primary focus:ring-primary text-primary bg-accent"
                />
              </div>
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-primary"
            >
              Password (default)
            </label>
            <div className="flex items-center mt-1 space-x-2">
              <FaLock className="text-primary" />
              <input
                type="text"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                disabled
                className="flex-1 py-2 px-4 rounded-md border border-primary-300 focus:border-primary focus:ring-primary text-primary bg-accent opacity-50 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-primary"
            >
              Phone Number *
            </label>
            <div className="flex items-center mt-1 space-x-2">
              <FaPhone className="text-primary" />
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="flex-1 py-2 px-4 rounded-md border border-primary-300 focus:border-primary focus:ring-primary text-primary bg-accent"
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-primary"
            >
              Address *
            </label>
            <div className="flex items-start mt-1 space-x-2">
              <FaHome className="text-primary mt-1" />
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                rows={3}
                className="flex-1 py-2 px-4 rounded-md border border-primary-300 focus:border-primary focus:ring-primary text-primary bg-accent"
              />
            </div>
          </div>

          {/* Email Notifications */}
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

          {/* Tags */}
          <div>
            <p className="block text-sm font-medium text-primary mb-2">Tags</p>
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

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center space-x-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-accent bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary cursor-pointer transition duration-200 ease-in-out"
            >
              <FaUserPlus />
              <span>{loading ? "Signing Up..." : "Sign Up"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
