const express = require('express');
const router = express.Router();
const cardsController = require('../controllers/cardsController.js');
const sessionController = require('../controllers/sessionController');

//GET REQUEST
router.get(
  '/',
  sessionController.isLoggedIn,
  cardsController.getCards,
  (req, res) => {
    //respond to client with cards collection data retrieved from DB
    return res.status(200).json(res.locals.cards);
  }
);

//DELETE
router.delete(
  '/',
  sessionController.isLoggedIn,
  cardsController.deleteCard,
  (req, res) => {
    //respond to client with cards collection data retrieved from DB
    return res.status(200).json(res.locals.cards);
  }
);

module.exports = router;
