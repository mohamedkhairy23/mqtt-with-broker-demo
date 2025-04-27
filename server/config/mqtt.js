require("dotenv").config();
const mqtt = require("mqtt");
const SensorData = require("../models/SensorData"); // <== You must import it

const client = mqtt.connect(process.env.MQTT_BROKER);

client.on("connect", () => {
  console.log(`Connected to MQTT Broker: ${process.env.MQTT_BROKER}`);

  client.subscribe(process.env.MQTT_TOPIC, { qos: 0 }, (err, granted) => {
    if (err) {
      console.error("Subscription error:", err);
    } else {
      console.log(`Subscribed to:`, granted);
    }
  });
});

client.on("message", async (topic, message) => {
  console.log(`📩 Received on topic [${topic}]: ${message.toString()}`);

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

client.on("error", (err) => {
  console.error("MQTT Client Error:", err);
});
