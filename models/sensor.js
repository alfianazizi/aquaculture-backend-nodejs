const Joi = require("joi");
const mongoose = require("mongoose");
const { deviceSchema } = require("./device");

const Sensor = mongoose.model(
  "Sensors",
  new mongoose.Schema({
    waterTemp: {
      type: Number,
      required: true
    },
    airTemp: {
      type: Number,
      required: true
    },
    ph: {
      type: Number,
      required: true
    },
    salinity: {
      type: Number,
      required: true
    },
    oxygen: {
      type: Number,
      required: true
    },
    windDirection: {
      type: Number,
      required: true
    },
    windSpeed: {
      type: Number,
      required: true
    },
    device: { type: mongoose.Schema.Types.ObjectId, ref: "Device" },
    timeStamp: {
      type: Date,
      default: Date.now
    }
  })
);

function validateSensor(sensor) {
  const schema = {
    airTemp: Joi.number().required(),
    waterTemp: Joi.number().required(),
    ph: Joi.number().required(),
    salinity: Joi.number().required(),
    oxygen: Joi.number().required(),
    windDirection: Joi.number().required(),
    windSpeed: Joi.number().required(),
    deviceId: Joi.string().required()
  };

  return Joi.validate(sensor, schema);
}

exports.Sensor = Sensor;
exports.validate = validateSensor;
