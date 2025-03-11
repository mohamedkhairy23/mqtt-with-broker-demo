const mongoose = require("mongoose");

const SensorDataSchema = new mongoose.Schema({
  topic: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("SensorData", SensorDataSchema);
