const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const sessionController = require('../controllers/sessionController');

//POST when user tries to log in
//hash password before it's saved to database
router.post(
  '/',
  authController.verifyUser,
  sessionController.startSession,
  (req, res) => {
    res.status(200).send(res.locals.user);
  }
);

module.exports = router;
