const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

//POST when user tries to log in
//hash password before it's saved to database
router.post('/login', authController.verifyUser, (req, res) => {
  res.status(200).json(res.locals.user);
});

// '/signup' Endpoint
router.post('/signup', authController.signUp, (req, res) => {
  res.status(200).json(res.locals.newUser);
});

module.exports = router;
