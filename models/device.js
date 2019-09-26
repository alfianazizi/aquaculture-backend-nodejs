const Joi = require("joi");
const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema({
  deviceId: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  createdDate: {
    type: Date,
    default: Date.now
  },
  longitude: {
    type: Number
  },
  latitude: {
    type: Number
  }
});

const Device = mongoose.model("Device", deviceSchema);

function validateDevice(device) {
  const schema = {
    deviceId: Joi.string()
      .min(3)
      .required()
    // longitude: Joi.number().required(),
    // latitude: Joi.number().required()
  };

  return Joi.validate(device, schema);
}

exports.deviceSchema = deviceSchema;
exports.Device = Device;
exports.validate = validateDevice;
