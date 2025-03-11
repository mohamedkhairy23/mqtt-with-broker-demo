const express = require("express");
const router = express.Router();
const { getAllSensorData } = require("../controllers/sensorController");

router.get("/data", getAllSensorData);

module.exports = router;
