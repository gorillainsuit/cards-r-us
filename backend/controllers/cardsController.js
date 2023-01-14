const User = require('../models/UserModel');
const Card = require('../models/CardModel');

const cardsController = {
  async getCards(req, res, next) {
    try {
      const { _id, gallery } = req.locals.user;

      res.locals.cards = gallery.map(async (cardId) => {
        const card = await Card.findOne({ _id: cardId });
        return { ...card, author: _id === card.author };
      });
    } catch (e) {
      return next({
        log: 'Error getting cards in cardController',
        status: 500,
        message: { err: e.message },
      });
    }
  },

  getCard: (req, res, next) => {
    const { cardId } = req.params;

    if (!cardId)
      return next({
        log: 'Error getting card in cardController',
        status: 400,
        message: { err: 'No card ID specified.' },
      });

    Card.findOne({ _id: cardId }, (err, card) => {
      if (!err)
        return next({
          log: `Error getting card in cardController: ${err}`,
          status: 400,
          message: { err: 'An error occured.' },
        });

      if (card === null)
        return next({
          log: 'Error getting card in cardController: No card found.',
          status: 404,
          message: { err: 'No card found.' },
        });

      res.locals.card = card;
      return next();
    });
  },

  async createCard(req, res, next) {
    const { image } = req.body;

    try {
      const newCard = await Card.create({ author: res.locals.user.id, image });
      const { _id } = newCard;
      res.locals.user.gallery.push(_id);
      await User.findOneAndUpdate(
        { _id: res.locals.user._id },
        { gallery: res.locals.user.gallery }
      );
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
    //res.locals.user;
    const { id } = req.body;

    if (!id) {
      return next({
        log: 'Error deleting card in cardController',
        status: 401,
        message: { err: 'No card id provided.' },
      });
    }
    try {
      const newGallery = res.locals.user.gallery.filter(
        (strID) => strID !== id
      );

      await User.findOneAndUpdate(
        { _id: res.locals.user._id },
        { gallery: newGallery }
      );

      res.locals.removedCardID = id;

      return next();
    } catch (e) {
      return next({
        log: 'Error deleting card in cardController',
        status: 500,
        message: { err: e.message },
      });
    }
  },
};

module.exports = cardsController;
