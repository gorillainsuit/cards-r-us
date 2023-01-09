const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  gallery: {
    type: Array(String),
    require: false,
    default: [],
  },
});

const User = mongoose.model('User', userSchema);

// use it for hashing password before saving to database
userSchema.pre('save', () => {});

module.exports = User;
