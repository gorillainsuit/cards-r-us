const User = require('../models/UserModel');
const Card = require('../models/CardModel');

const cardsController = {
  async getCards(req, res, next) {
    // res.send('Getting cards...');
    try {
      // need to confirm we're quering gallery

      const cards = await User.gallery.find();
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
    const { id: _id, author, image, prompt } = req.body;

    const newCard = new Card({ id, author, image, prompt });

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

  async deleteCard(req, res, next) {
    // res.send('Deleting card...');
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next({
        log: 'Error deleting card in cardController',
        status: 404,
        message: { err: 'No card found with id' + id },
      });
    }
    try {
      await Card.findOneAndRemove({ _id: id });
      res.status(204).json('Card deleted');
    } catch (e) {
      return next({
        log: 'Error deleting card in cardController',
        status: 500,
        message: { err: e.message },
      });
    }

    await Card.findByIdAndRemove(id);
    res.json({ message: 'Deleted card' });
  },
};

module.exports = cardsController;
