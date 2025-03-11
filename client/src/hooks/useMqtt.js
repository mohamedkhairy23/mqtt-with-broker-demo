import { useState, useEffect } from "react";
import mqtt from "mqtt";

const useMqtt = () => {
  const brokerUrl = import.meta.env.VITE_MQTT_BROKER;
  const topic = import.meta.env.VITE_MQTT_TOPIC;
  const apiUrl = import.meta.env.VITE_API_URL;

  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setMessages(data.map((item) => item.message));
      } catch (error) {
        console.error("Error fetching sensor data:", error);
      }
    };

    fetchSensorData();
  }, [apiUrl]);

  // Connect to MQTT broker
  useEffect(() => {
    const client = mqtt.connect(brokerUrl);

    client.on("connect", () => {
      console.log("Connected to MQTT Broker");
      setIsConnected(true);
      client.subscribe(topic, (err) => {
        if (err) console.error("Subscription error:", err);
      });
    });

    client.on("message", (receivedTopic, message) => {
      if (receivedTopic === topic) {
        setMessages((prev) => [...prev, message.toString()]);
      }
    });

    client.on("error", (err) => {
      console.error("MQTT Error:", err);
    });

    client.on("close", () => {
      console.warn("MQTT Client Disconnected");
      setIsConnected(false);
    });

    return () => {
      client.end(false);
    };
  }, [brokerUrl, topic]);

  return { messages, isConnected };
};

export default useMqtt;
