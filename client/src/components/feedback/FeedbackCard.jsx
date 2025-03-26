import React from "react";
import {
  FaSmile,
  FaMeh,
  FaFrown,
  FaClock,
  FaStar,
  FaChartBar,
  FaCommentDots,
} from "react-icons/fa";

function FeedbackCard({
  index,
  contactHours,
  volunteerOrParticipationExperience,
  websiteExperience,
  experienceWorkingWithOrg,
  type,
  sentimentScore,
  additionalInfo,
}) {
  const renderType = (type) => {
    switch (type) {
      case "Positive":
        return (
          <span className="text-green-500 font-bold flex items-center gap-2">
            <FaSmile /> Positive
          </span>
        );
      case "Neutral":
        return (
          <span className="text-gray-500 font-bold flex items-center gap-2">
            <FaMeh /> Neutral
          </span>
        );
      case "Negative":
        return (
          <span className="text-red-500 font-bold flex items-center gap-2">
            <FaFrown /> Negative
          </span>
        );
      default:
        return (
          <span className="text-black font-bold flex items-center gap-2">
            <FaMeh /> Unknown
          </span>
        );
    }
  };

  return (
    <div className="p-4 rounded-md bg-white shadow-md border border-gray-200 flex flex-col space-y-2">
      <div>{renderType(type)}</div>
      <span className="flex items-center gap-2">
        <FaClock className="text-primary" /> <b>Contact Hours:</b>{" "}
        {contactHours}
      </span>
      <span className="flex items-center gap-2">
        <FaStar className="text-primary" />{" "}
        <b>Volunteer/Participation Experience:</b>{" "}
        {volunteerOrParticipationExperience}
      </span>
      <span className="flex items-center gap-2">
        <FaStar className="text-primary" /> <b>Website Experience:</b>{" "}
        {websiteExperience}
      </span>
      <span className="flex items-center gap-2">
        <FaStar className="text-primary" /> <b>Experience Working with Org:</b>{" "}
        {experienceWorkingWithOrg}
      </span>
      <span className="flex items-center gap-2">
        <FaChartBar className="text-primary" /> <b>Sentiment Score:</b>{" "}
        {sentimentScore}
      </span>
      <span className="flex items-center gap-2">
        <FaCommentDots className="text-primary" /> <b>Additional Info:</b>{" "}
        {additionalInfo || "N/A"}
      </span>
    </div>
  );
}

export default FeedbackCard;
