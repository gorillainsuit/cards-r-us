const express = require('express');
const router = express.Router();
const openaiController = require('../../controllers/openaiController.js');

router.post('/create', openaiController.createImage, (req, res) => {
  res.status(200).json(res.locals.image);
});

module.exports = router;
