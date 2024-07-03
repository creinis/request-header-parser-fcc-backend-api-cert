require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const Request = require('./models/Request');

const app = express();
app.use(cors({ optionsSuccessStatus: 200 }));
app.use('/public', express.static('public'));

const dbConnection = () => {
  console.log('Attempting to connect to MongoDB...');
  mongoose.connect(process.env.MONGODB_URI, {})
    .then(() => {
      console.log('Successfully connected to MongoDB');
    })
    .catch((err) => {
      console.error('Failed to connect to MongoDB:', err);
      console.log('Retrying in 5 seconds...');
      setTimeout(dbConnection, 5000);
    });
};

dbConnection();
// Middleware
app.use(cors());
app.use(express.json());
app.use('/public', express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/api/whoami', async (req, res) => {
  const requestInfo = {
    ipaddress: req.socket.remoteAddress,
    language: req.headers['accept-language'],
    software: req.headers['user-agent']
  };

  const requestDoc = new Request(requestInfo);
  await requestDoc.save();

  res.json(requestInfo);
});

app.get('/api/history', async (req, res) => {
  const history = await Request.find().sort({ timestamp: -1 }).limit(10);
  res.json(history);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Your app is listening on port ' + port);
});
