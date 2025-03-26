import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createFeedback } from "../services/apiService.js";
import { FaClock, FaStar, FaPaperPlane, FaCommentDots } from "react-icons/fa";

const FeedbackForm = () => {
  const navigate = useNavigate();
  const { eventId } = useParams();
  console.log(eventId);
  const [formData, setFormData] = useState({
    contactHours: "",
    volunteerOrParticipationExperience: 0,
    websiteExperience: 0,
    experienceWorkingWithOrg: 0,
    additionalInfo: "",
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" || type === "range" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createFeedback(eventId, formData);
      navigate("/");
    } catch (error) {
      console.error("Error submitting feedback:", error.message);
      alert(error.message || "Failed to submit feedback. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-tertiary-100 flex items-center justify-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-primary flex items-center justify-center gap-2">
            <FaCommentDots /> Feedback Form
          </h2>
          <p className="mt-2 text-sm text-secondary">
            We value your feedback to improve our events and services.
          </p>
        </div>
        <div className="max-w-2xl mx-auto bg-accent p-8 rounded-lg shadow-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Contact Hours */}
            <div>
              <label
                htmlFor="contactHours"
                className="block text-sm font-medium text-primary flex items-center gap-2"
              >
                <FaClock /> Contact Hours *
              </label>
              <input
                type="number"
                id="contactHours"
                name="contactHours"
                required
                min="1"
                className="p-2 mt-1 block w-full rounded-md border-primary-300 shadow-sm focus:border-primary focus:ring-primary text-primary bg-accent"
                value={formData.contactHours}
                onChange={handleChange}
              />
            </div>

            {/* Volunteer/Participation Experience */}
            <div>
              <label
                htmlFor="volunteerOrParticipationExperience"
                className="block text-sm font-medium text-primary flex items-center gap-2"
              >
                <FaStar /> Volunteer/Participation Experience *
              </label>
              <input
                type="range"
                id="volunteerOrParticipationExperience"
                name="volunteerOrParticipationExperience"
                required
                min="0"
                max="10"
                className="mt-1 block w-full accent-primary"
                value={formData.volunteerOrParticipationExperience}
                onChange={handleChange}
              />
              <div className="text-sm text-primary mt-1">
                {formData.volunteerOrParticipationExperience}
              </div>
            </div>

            {/* Website Experience */}
            <div>
              <label
                htmlFor="websiteExperience"
                className="block text-sm font-medium text-primary flex items-center gap-2"
              >
                <FaStar /> Website Experience *
              </label>
              <input
                type="range"
                id="websiteExperience"
                name="websiteExperience"
                required
                min="0"
                max="10"
                className="mt-1 block w-full accent-primary"
                value={formData.websiteExperience}
                onChange={handleChange}
              />
              <div className="text-sm text-primary mt-1">
                {formData.websiteExperience}
              </div>
            </div>

            {/* Experience Working with Our Organization */}
            <div>
              <label
                htmlFor="experienceWorkingWithOrg"
                className="block text-sm font-medium text-primary flex items-center gap-2"
              >
                <FaStar /> Experience Working with Our Organization *
              </label>
              <input
                type="range"
                id="experienceWorkingWithOrg"
                name="experienceWorkingWithOrg"
                required
                min="0"
                max="10"
                className="mt-1 block w-full accent-primary"
                value={formData.experienceWorkingWithOrg}
                onChange={handleChange}
              />
              <div className="text-sm text-primary mt-1">
                {formData.experienceWorkingWithOrg}
              </div>
            </div>

            {/* Additional Information */}
            <div>
              <label
                htmlFor="additionalInfo"
                className="block text-sm font-medium text-primary flex items-center gap-2"
              >
                <FaCommentDots /> Additional Information
              </label>
              <textarea
                id="additionalInfo"
                name="additionalInfo"
                rows={3}
                className="p-2 mt-1 block w-full rounded-md border-primary-300 shadow-sm focus:border-primary focus:ring-primary text-primary bg-accent placeholder:pl-2 placeholder:pt-1"
                placeholder="Any additional feedback or suggestions"
                value={formData.additionalInfo}
                onChange={handleChange}
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full flex justify-center items-center gap-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-accent bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary cursor-pointer"
              >
                <FaPaperPlane /> Submit Feedback
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FeedbackForm;
