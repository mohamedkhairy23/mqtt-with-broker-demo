const mqtt = require("mqtt");
const SensorData = require("../models/SensorData");

const client = mqtt.connect(process.env.MQTT_BROKER);

client.on("connect", () => {
  console.log(`Connected to MQTT Broker at ${process.env.MQTT_BROKER}`);
  client.subscribe(process.env.MQTT_TOPIC, (err) => {
    if (err) {
      console.error("MQTT Subscription Failed:", err);
    } else {
      console.log(`Subscribed to topic: ${process.env.MQTT_TOPIC}`);
    }
  });
});

client.on("message", async (topic, message) => {
  console.log(`Received: ${message.toString()} on topic ${topic}`);

  try {
    const newData = new SensorData({
      topic,
      message: message.toString(),
    });
    await newData.save();
    console.log("Saved MQTT data to MongoDB");
  } catch (error) {
    console.error("Error saving MQTT data:", error);
  }
});

module.exports = client;
