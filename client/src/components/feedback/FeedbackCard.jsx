import React from "react";

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
    // Check type value
    console.log("Type: ", type);

    if (type === 'Positive') {
      return (
        <span style={{ color: 'green' }}>
          <b>Type:</b> 😊 Positive
        </span>
      );
    } else if (type === 'Neutral') {
      return (
        <span style={{ color: 'grey' }}>
          <b>Type:</b> 😐 Neutral
        </span>
      );
    } else if (type === 'Negative') {
      return (
        <span style={{ color: 'red' }}>
          <b>Type:</b> 😞 Negative
        </span>
      );
    } else {
      return (
        <span style={{ color: 'black' }}>
          <b>Type:</b> Unknown
        </span>
      );
    }
  };

  return (
    <div className="p-4 rounded-md bg-white flex flex-col">
      {renderType(type)}
      <span><b>Contact Hours:</b> {contactHours}</span>
      <span><b>Volunteer Or Participation Experience:</b> {volunteerOrParticipationExperience}</span>
      <span><b>Website Experience:</b> {websiteExperience}</span>
      <span><b>Experience Working with Org:</b> {experienceWorkingWithOrg}</span>
      <span><b>Sentiment Score:</b> {sentimentScore}</span>
      <span><b>Additional Info:</b> {additionalInfo}</span>
    </div>
  );
}

export default FeedbackCard;
