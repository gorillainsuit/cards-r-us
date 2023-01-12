const User = require('../models/UserModel');
const cardsController = {};

cardsController.getCards = async (req, res, next) => {
  //retrieve cards collection data from DB
  const cards = await User.findOne({ username });
  //pass cards collection data into res.locals
  res.locals.cards = cards;
  return next();
};


cardsController.deleteCard = async (req, res, next) => {
  //delete card specific to a user from DB
  await User.findOneAndDelete({ username, cardID });
  //delete according to index, update according to id or index
  //retrieve updated cards collection data from DB
  const cards = await User.findOne({ username });
  //pass updated cards collection data into res.locals
  res.locals.cards = cards;
  return next();
};



module.exports = cardsController;
