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
  return (
    <div className="p-4 rounded-md bg-white  flex flex-col  ">
      <span><b>Contact Hours:</b> {contactHours}</span>
      <span><b>Volunteer Or Participation Experience:</b> {volunteerOrParticipationExperience}</span>
      <span><b>Website Experience:</b> {websiteExperience}</span>
      <span><b>Experience Working with Org:</b> {experienceWorkingWithOrg}</span>
      <span><b>Type:</b> {type}</span>
      <span><b>Sentiment Score:</b> {sentimentScore}</span>
      <span><b>Additional Info:</b> {additionalInfo}</span>
    </div>
  );
}

export default FeedbackCard;