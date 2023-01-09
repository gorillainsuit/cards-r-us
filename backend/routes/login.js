const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');


//POST when user tries to log in
router.post('/', authController.getUser, (req, res) => {
  res.status(200).json(res.locals.userData);
});

module.exports = router;
