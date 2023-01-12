const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const sessionController = require('../controllers/sessionController');

// '/signup' Endpoint
router.post(
  '/',
  authController.signUp,
  sessionController.startSession,
  (req, res) => {
    res.status(200).send(res.locals.newUser);
  }
);

module.exports = router;
