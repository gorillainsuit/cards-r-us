const express = require('express');
const router = express.Router();
const cardsController = require('../controllers/cardController.js');
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
router.post('/', cardsController.createCard, (req, res) => {
  console.log('CREATE REQUEST for cardsController.createCard');
  return res.status(200).json(res.locals.newCard);
});
//DELETE
router.delete('/:id', (req, res) => {
  //respond to client with cards collection data retrieved from DB
  console.log('DELETE REQUEST for cardsController.deleteCard');
  return res.status(200).json(res.locals.cards);
});
module.exports = router;
