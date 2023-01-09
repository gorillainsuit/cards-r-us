const User = require('../models/UserModel');
const Card = require('../models/CardModel');

const cardsController = {
  async getCards(req, res, next) {
    // res.send('Getting cards...');
    try {
      const cards = await Card.find();
      console.log(Card);
      res.status(200).json(cards);
    } catch (e) {
      return next({
        log: 'Error getting cards in cardController',
        status: 500,
        message: { err: e.message },
      });
    }
  },

  async createCard(req, res, next) {
    // res.send('Creating card...');
    const body = req.body;
    const newCard = new Card(body);

    try {
      await newCard.save();

      res.status(201).json(newCard);
    } catch (e) {
      return next({
        log: 'Error creating card in cardController',
        status: 409,
        message: { err: e.message },
      });
    }
  },

  deleteCard(req, res, next) {
    res.send('Deleting card...');
  },
};

// cardsController.getCards = async (req, res, next) => {
//   //retrieve cards collection data from DB
//   const cards = await User.findOne({ username });
//   //pass cards collection data into res.locals
//   res.locals.cards = cards;
//   return next();
// };

// cardsController.deleteCard = async (req, res, next) => {
//   //delete card specific to a user from DB
//   await User.findOneAndDelete({ username, cardID });
//   //retrieve updated cards collection data from DB
//   const cards = await User.findOne({ username });
//   //pass updated cards collection data into res.locals
//   res.locals.cards = cards;
//   return next();
// };
module.exports = cardsController;
