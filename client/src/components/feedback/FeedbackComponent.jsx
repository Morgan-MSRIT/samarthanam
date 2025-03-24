import React from "react";
import FeedbackCard from "./FeedbackCard";

const FeedbackComponent = ({ geminiResponse,score,feedBackList }) => {




  return (
    <>
      <div className="w-[95%] mx-auto mt-10 p-6 flex flex-col gap-4 bg-accent text-primary border border-gray-200 rounded-lg shadow-sm ">
        <div className="text-center  text-4xl underline font-bold">
          Feedback Summary
        </div>

        <div>{geminiResponse}</div>
      </div>
{/* 
      <div className="w-[95%] mx-auto mt-10 p-6 flex  gap-4 bg-accent text-primary border border-gray-200 rounded-lg shadow-sm ">
        <div className="text-center mx-auto text-4xl  font-semibold">
         Average Score: {score}
        </div>
      </div> */}

      <div className="w-[97%] md:w-[95%] mx-auto mt-10 p-6  bg-accent text-primary border border-gray-200 rounded-lg shadow-sm ">
      <div className="text-center mx-auto mb-4 text-4xl underline font-bold">
          All Feedbacks:
        </div>

        <div className="w-full grid gap-4 grid-cols-1 md:grid-cols-2 ">
        {
            feedBackList.map((fb,index)=>(
                <FeedbackCard 
                index={index}
                event={fb?.event}
                contactHours={fb?.contactHours}
                volunteerOrParticipationExperience={fb?.volunteerOrParticipationExperience}
                websiteExperience={fb?.websiteExperience}
                experienceWorkingWithOrg={fb?.experienceWorkingWithOrg}
                type={fb?.type}
                sentimentScore={fb?.sentimentScore}
                additionalInfo={fb?.additionalInfo}
                />
            ))
        }
        </div>
      </div>

    </>
  );
};

export default FeedbackComponent;