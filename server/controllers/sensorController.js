const SensorData = require("../models/SensorData");

const getAllSensorData = async (req, res) => {
  try {
    const data = await SensorData.find().sort({ timestamp: -1 });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching data", error });
  }
};

module.exports = { getAllSensorData };
