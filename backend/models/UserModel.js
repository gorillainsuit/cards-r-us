const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  email: {
    type: String,
    require: false,
    default: null,
  },
  password: {
    type: String,
    require: false,
    default: null,
  },
  username: {
    type: String,
    require: true,
    unique: true,
  },
  avatar: {
    type: String,
    require: false,
    default: '',
  },
  name: {
    type: String,
    require: false,
    default: '',
  },
  gallery: {
    type: Array(String),
    require: false,
    default: [],
  },
});

// // use it for hashing password before saving to database
userSchema.pre('save', function (next) {
  bcrypt.hash(this.password, SALT_WORK_FACTOR, (err, hash) => {
    // Store hash in your password DB.
    this.password = hash;
    next();
  });
});

const User = mongoose.model('User', userSchema);

module.exports = User;
