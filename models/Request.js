const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  ipaddress: { type: String, required: true },
  language: { type: String, required: true },
  software: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Request = mongoose.model('Request', requestSchema);

module.exports = Request;
