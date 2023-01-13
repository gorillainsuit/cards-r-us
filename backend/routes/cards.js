const express = require('express');
const router = express.Router();
const cardsController = require('../controllers/cardsController.js');
const sessionController = require('../controllers/sessionController.js');
// this logged using localhost:3000/cards
// router.get('/', (req, res) => {
//   console.log('cards router connected');
// });

//GET REQUEST
router.get(
  '/',
  sessionController.isLoggedIn,
  cardsController.getCards,
  (req, res) => {
    //respond to client with cards collection data retrieved from DB
    console.log('GET REQUEST for cardsController.getCards');
    return res.status(200).json(res.locals.cards);
  }
);

// CREATE
router.post('/', 
  sessionController.isLoggedIn,
  cardsController.createCard, 
  (req, res) => {
  console.log('CREATE REQUEST for cardsController.createCard');
  return res.status(200).json(res.locals.newCard);
});

// DELETE
router.delete(
  '/',
  sessionController.isLoggedIn,
  cardsController.deleteCard,
  (req, res) => {
    console.log('DELETE REQUEST for cardsController.deleteCard');
    return res.status(200).json(res.locals.removedCardID);
  }
);


module.exports = router;
