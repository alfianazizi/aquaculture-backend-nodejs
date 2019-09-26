const Joi = require("joi");
const mongoose = require("mongoose");
const { deviceSchema } = require("./device");

const Sensor = mongoose.model(
  "Sensors",
  new mongoose.Schema({
    device: {
      type: deviceSchema,
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
    uv: {
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
    timeStamp: {
      type: Date,
      default: Date.now
    }
  })
);

function validateSensor(sensor) {
  const schema = {
    airTemp: Joi.number().required(),
    ph: Joi.number().required(),
    salinity: Joi.number().required(),
    uv: Joi.number().required(),
    windDirection: Joi.number().required(),
    windSpeed: Joi.number().required(),
    deviceId: Joi.object().required()
  };

  return Joi.validate(sensor, schema);
}

exports.Sensor = Sensor;
exports.validate = validateSensor;
