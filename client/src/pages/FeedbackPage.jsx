import React, { useEffect, useState } from "react";
import FeedbackComponent from "../components/feedback/FeedbackComponent";
import { useParams } from "react-router-dom";
import axios from "axios";

const FeedbackPage = (props) => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [feedbackSummary, setFeedbackSummary] = useState("Generating Summary...");
    const[score, setScore] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  console.log(error);
  console.log(loading);
  const event = useParams().eventId;

  const API_URL = "http://localhost:4000/api/v1";
  const API_ANALYTICS = "http://localhost:5000";
  const api = axios.create({
    baseURL: API_URL,
  });

  const getEvents = async (e) => {
    e?.preventDefault();
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      const response = await api.post(
        "/feedback/get-feedbacks",
        { event: event },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response?.data?.success) {
        setFeedbacks(response?.data?.data.feedbacks);
        setFeedbackSummary(response?.data?.data?.summary);
        setScore(response?.data?.data?.score)
        console.log("------------------", response?.data?.data)
      } else {
        setError(response?.data?.message);
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "An error occurred while fetching events"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div className="bg-tertiary min-h-screen text-primary p-8">
      {/* Heading */}
      <h1 className="text-4xl font-bold  mx-auto w-[95%]">
        Event Feddbacks Data:
      </h1>

      {/* Feedback Component */}
      <FeedbackComponent
        geminiResponse={feedbackSummary}
        score={score}
        feedBackList={feedbacks}
      />
    </div>
  );
};

export default FeedbackPage;
