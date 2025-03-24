import React, { useEffect, useState } from "react";
import { TiTick } from "react-icons/ti";
import { ImCancelCircle } from "react-icons/im";

const Notifications = () => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");

    ws.onopen = () => {
      console.log("WebSocket connected");
      setIsConnected(true);
      setConnectionError(null);
    };

    ws.onmessage = (message) => {
      const jsonData = JSON.parse(message.data);
      console.log(jsonData);
      console.log("WebSocket message:", message.data);
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      setConnectionError("Connection failed");
    };

    ws.onclose = () => {
      console.log("WebSocket closed");
      setIsConnected(false);
    };

    setSocket(ws);

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, []);

  const data = {
    newlyAllocatedTasks: [
      {
        name: "Task 1",
        eventName: "Event 1",
      },
      {
        name: "Task 2",
        eventName: "Event 2",
      },
    ],
    removedTasks: [
      {
        name: "Task 3",
        eventName: "Event 3",
      },
      {
        name: "Task 4",
        eventName: "Event 4",
      },
    ],
    volunteer: {
      _id: "67e0091e80657dafa6682c5d",
      name: "John Doe",
    },
  };

  return (
    <div className="bg-accent p-2 flex flex-col w-[250px] rounded-lg">
      <div className="flex text-center mx-auto text-primary font-bold text-xl">
        Notifications
      </div>
      <div className="">
        {data.newlyAllocatedTasks?.map((task) => (
          <div className="border mt-2 p-2 rounded-lg">
            <div className="flex">
              <div className="my-auto pr-2">
                <TiTick size={30} />
              </div>
                <div>
                  You have been assigned <b>{task.name}</b> for the event{" "}
                  <b>{task.eventName}</b>
                </div>
            </div>
          </div>
        ))}
        {data.removedTasks?.map((task) => (
          <div className="border mt-2 p-2 rounded-lg">
          <div className="flex">
            <div className="my-auto pr-4">
              <ImCancelCircle size={20} />
            </div>
              <div>
                You have been deassigned <b>{task.name}</b> for the event{" "}
                <b>{task.eventName}</b>
              </div>
          </div>
        </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
