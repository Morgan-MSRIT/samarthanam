import React, { useEffect, useState } from "react";
import FeedbackComponent from "../components/feedback/FeedbackComponent";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaComments, FaSpinner } from "react-icons/fa";

const FeedbackPage = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [feedbackSummary, setFeedbackSummary] = useState(
    "Generating Summary..."
  );
  const [score, setScore] = useState(0);
  const [eventName, setEventName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const eventId = useParams().eventId;

  const API_URL = "http://localhost:4000/api/v1";
  const api = axios.create({
    baseURL: API_URL,
  });

  const getFeedbacks = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const response = await api.post(
        "/feedback/get-feedbacks",
        { event: eventId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      if (response?.data?.success) {
        setFeedbacks(response?.data?.data.feedbacks);
        setFeedbackSummary(response?.data?.data?.summary);
        setScore(response?.data?.data?.score);
        setEventName(response?.data?.data.event?.name || "Event"); // Fallback if name isn’t returned
      } else {
        setError(response?.data?.message);
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "An error occurred while fetching feedback"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFeedbacks();
  }, [eventId]);

  return (
    <div className="bg-tertiary-100 min-h-screen text-primary p-8">
      <h1 className="text-4xl font-bold mx-auto w-[95%] flex items-center gap-2">
        <FaComments /> Feedback Data: {eventName}
      </h1>
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <FaSpinner className="animate-spin text-4xl text-primary" />
        </div>
      ) : (
        <FeedbackComponent
          geminiResponse={feedbackSummary}
          score={score}
          feedBackList={feedbacks}
        />
      )}
    </div>
  );
};

export default FeedbackPage;
