const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  author: { type: String, required: true },
  image: { type: String, required: true },
  message: { type: String, default: '' },
  messageColor: { type: String, default: '#FFFFFF' },
  subscribers: [String],
  createdAt: { type: Date, default: new Date() },
});

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;
