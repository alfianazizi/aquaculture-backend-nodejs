const { Sensor, validate } = require("../models/sensor");
const { Device } = require("../models/device");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const sensors = await Sensor.find()
    .populate("device", "deviceId")
    .sort("-timeStamp");
  res.send(sensors);
});

router.post("/", async (req, res) => {
  console.log(req.body);
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const device = await Device.findOne({ deviceId: req.body.deviceId });
  if (!device) return res.status(400).send("Invalid device.");

  let sensor = new Sensor({
    airTemp: req.body.airTemp,
    waterTemp: req.body.waterTemp,
    ph: req.body.ph,
    salinity: req.body.salinity,
    oxygen: req.body.oxygen,
    windDirection: req.body.windDirection,
    windSpeed: req.body.windSpeed,
    device: device._id
  });
  sensor = await sensor.save();

  res.send(sensor);
});

module.exports = router;
