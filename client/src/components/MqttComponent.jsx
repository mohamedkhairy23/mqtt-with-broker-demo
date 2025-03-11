import React from "react";
import useMqtt from "../hooks/useMqtt";

const MqttComponent = () => {
  const { messages, isConnected } = useMqtt();

  return (
    <div>
      <h2>MQTT Client</h2>
      <p>Status: {isConnected ? "Connected" : "Disconnected"}</p>
      <h3>Sensor Data:</h3>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>
            {typeof msg === "object" ? JSON.stringify(msg) : msg}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MqttComponent;
