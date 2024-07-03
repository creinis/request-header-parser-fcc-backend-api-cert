require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors({ optionsSuccessStatus: 200 }));
app.use(express.static('public'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Basic route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// API endpoint
app.get('/api/whoami', (req, res) => {
  res.json({
    ipaddress: req.socket.remoteAddress,
    language: req.headers['accept-language'],
    software: req.headers['user-agent']
  });
});

// Listen for requests
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
