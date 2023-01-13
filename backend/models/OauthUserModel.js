const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const oauthUserSchema = new Schema({
  username: {
    type: String,
    require: true,
    unique: true,
  },
  email: {
    type: String,
    require: false,
    default: null,
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

const OauthUser = mongoose.model('OauthUser', oauthUserSchema);

module.exports = OauthUser;
