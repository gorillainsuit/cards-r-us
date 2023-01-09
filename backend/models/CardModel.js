const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  author: { type: String, required: true },
  image: {},
  prompt: { type: String, required: true },
  subscribers: [String],
  createdAt: { type: Date, default: new Date() },
});

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;
