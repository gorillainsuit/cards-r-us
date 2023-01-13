const User = require('../models/UserModel');
const Card = require('../models/CardModel');

const cardsController = {
  async getCards(req, res, next) {
    // res.send('Getting cards...');
    try {
      // need to confirm we're quering gallery
      const { _id, gallery } = req.locals.user;
      // map through gallery
      // each card is a string representing the card id?
      // we want to return this, which is a cardSchema object
      res.locals.cards = gallery.map(async (cardId) => {
        const card = await Card.findOne({ _id: cardId });
        return { ...card, author: _id === card.author };
      });

      console.log(cards);
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
    const { image } = req.body;
    //const newCard = new Card({ author, image });
    try {
      // await newCard.save();
      const newCard = await Card.create({author: res.locals.user.id, image});
      const {_id} = newCard;
      res.locals.user.gallery.push(_id);
      await User.findOneAndUpdate({_id: res.locals.user._id}, {gallery: res.locals.user.gallery});
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
    //res.locals.user;
    const { id } = req.body;

    if (!id) {
      return next({
        log: 'Error deleting card in cardController',
        status: 404,
        message: { err: 'No card found with id' + id },
      });
    }
    try {
      const newgallery = res.locals.user.gallery.filter((strID) => strID !== id);
      console.log('newgallery: ', newgallery);
      await User.findOneAndUpdate(
        { _id: res.locals.user._id },
        { gallery: newgallery }
      );
      res.locals.removedCardID = id;
      return next();
      // res.status(204).json('Card deleted');
    } catch (e) {
      return next({
        log: 'Error deleting card in cardController',
        status: 500, 
        message: { err: e.message },
      }); 
    }  

    // await Card.findByIdAndRemove(id);
    // res.json({ message: 'Deleted card' });
  },
};

module.exports = cardsController;
 