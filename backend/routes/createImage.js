const express = require('express');
const router = express.Router();
const openaiController = require('../controllers/openaiController.js');

router.post('/', openaiController.createImage, (req, res) => {
    res.status(200).send(res.locals.image);
  }
);