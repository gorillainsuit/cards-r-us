const express = require('express');
const router = express.Router();

// Image generation
const createImage = require('./createImage.js');
router.use('/image', createImage);

// Prompt generation
router.use('/prompt', (req, res, next) =>
  res.status(400).json({ error: 'This route is in progress' })
);

module.exports = router;
