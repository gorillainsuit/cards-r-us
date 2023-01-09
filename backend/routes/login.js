const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// '/login' Endpoint 

//GET when login page initially loads
//respond with html file
router.get('/', (req, res) => {
  res.send('.../frontend/index.html');
});

//POST when user tries to log in
router.post('/', authController.getUser, authController.signUp, (req, res) => {
  res.status(200).json(req.user);
});

module.exports = router;
