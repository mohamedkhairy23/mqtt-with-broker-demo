import React from "react";
import SensorData from "./components/MqttComponent";

const App = () => {
  return (
    <div className="app-container">
      <h1>MQTT Live Data</h1>
      <SensorData />
    </div>
  );
};

export default App;
