const { Device, validate } = require("../models/device");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const devices = await Device.find().sort("name");
  res.send(devices);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let device = new Device({
    deviceId: req.body.deviceId,
    longitude: req.body.longitude,
    latitude: req.body.latitude
  });
  device = await device.save();

  res.send(device);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const device = await Device.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    {
      new: true
    }
  );

  if (!device)
    return res.status(404).send("The device with the given ID was not found.");

  res.send(device);
});

router.delete("/:id", async (req, res) => {
  const device = await Device.findByIdAndRemove(req.params.id);

  if (!device)
    return res.status(404).send("The device with the given ID was not found.");

  res.send(device);
});

router.get("/:id", async (req, res) => {
  const device = await Device.findById(req.params.id);

  if (!device)
    return res.status(404).send("The device with the given ID was not found.");

  res.send(device);
});

module.exports = router;
