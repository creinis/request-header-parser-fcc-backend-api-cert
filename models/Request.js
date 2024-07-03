const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  ipaddress: String,
  language: String,
  software: String,
  timestamp: { type: Date, default: Date.now }
});

const Request = mongoose.model('Request', requestSchema);

module.exports = Request;
