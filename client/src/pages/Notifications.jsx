import React, { useEffect, useState } from "react";

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
    }
    
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

  return (
    <div>
      <p>{isConnected ? "Connected to WebSocket!" : "Connecting to WebSocket..."}</p>
      {connectionError && <p>Error: {connectionError}</p>}
    </div>
  );
};

export default Notifications;