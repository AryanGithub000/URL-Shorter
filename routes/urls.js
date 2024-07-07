const express = require('express');
const router = express.Router(); // Correct variable name
const validUrl = require('valid-url');
const shortid = require('shortid');

// Base URL should be your localhost during development
const baseUrl = 'http://localhost:3000/'; 

const urlDatabase = {};

router.post('/shorten', (req, res) => {
  const { longUrl } = req.body; 

  if (!validUrl.isUri(longUrl)) {
    return res.status(400).json({ error: 'Invalid long URL' });
  }

  const shortCode = shortid.generate();
  urlDatabase[shortCode] = longUrl;

  res.json({ shortUrl: baseUrl + shortCode });
});

router.get('/:shortCode', (req, res) => {
  const { shortCode } = req.params;
  const longUrl = urlDatabase[shortCode];

  if (!longUrl) {
    return res.status(404).json({ error: 'Short URL not found' });
  }

  res.redirect(longUrl);
});

module.exports = router; // Export the router
