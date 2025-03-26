import React, { useEffect, useState } from "react";
import { TiTick } from "react-icons/ti";
import { ImCancelCircle } from "react-icons/im";
import axios from "axios";

const Notifications = () => {
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState("");
  const API_URL = "http://localhost:4000/api/v1";
  const api = axios.create({
    baseURL: API_URL,
  });

  const getNotifications = async (e) => {
    e?.preventDefault();
    setLoading(true);
    setError("");

    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const token = localStorage.getItem("token");
      const response = await api.get(
        "/notification/get-notifications/67e0091e80657dafa6682c5d",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response?.data?.success) {
        setNotifications(response?.data?.data);
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
      console.log(error);
      console.log(notifications);
      console.log(loading);
    }
  };


  useEffect(() => {
    getNotifications();
  }, []);

  return (
    <div className="bg-accent-200 p-2 flex flex-col w-full rounded-lg">
      <div className="flex text-center mx-auto text-primary font-bold text-xl">
        Notifications
      </div>
      <div className="">
        {notifications?.map((notif) => (
          <div className="border mt-2 p-2 rounded-lg">
            <div className="flex">
              <div className="my-auto pr-2">
                <TiTick size={30} />
              </div>
              <div>
                You have been{" "}
                {notif?.type === "deallot" ? "deassigned" : "assigned"}{" "}
                <b>{notif?.task?.name}</b> for the event{" "}
                <b>{notif?.event?.name}</b>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
