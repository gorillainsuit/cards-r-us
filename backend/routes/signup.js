const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// '/signup' Endpoint 
router.post('/', authController.signUp, (req, res) => {
  res.status(200).send(res.locals.newUser);
});

module.exports = router;