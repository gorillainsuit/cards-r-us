const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/', authController.getUser, authController.signUp, (req, res) => {
  res.status(200).json('JWStoken');
});

module.exports = router;
