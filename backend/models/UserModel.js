const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcrypt');
const { NextPlan } = require('@mui/icons-material');

const userSchema = new Schema({
  email: {
    type: String,
    require: true,
    unique: true,
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

// // use it for hashing password before saving to database
userSchema.pre('save', function (next) {
  bcrypt.hash(this.password, SALT_WORK_FACTOR, (err, hash) => {
    // Store hash in your password DB.
    this.password = hash;
    next();
  });
});

// userSchema.methods.comparePassword = function (candidatePassword, callback) {
// 	bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
//     console.log('this.password: ', this.password)
//     console.log('candPass', candidatePassword)
// 		if (err) return callback(err);
// 		callback(null, isMatch);
// 	});
// };

const User = mongoose.model('User', userSchema);

module.exports = User;
