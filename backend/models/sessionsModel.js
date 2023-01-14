const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sessionSchema = new Schema({
  userId: { type: String, required: true },
  createdAt: { type: Date, expires: '30m', default: Date.now },
});

module.exports = mongoose.model('Session', sessionSchema);
