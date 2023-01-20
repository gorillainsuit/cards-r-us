// const mongoose = require('mongoose');
import mongoose from 'mongoose'

export interface OAuthUser {
  username: string;
  email: string;
  avatar: string;
  name: string;
  gallery: string[];
}

const oAuthUserSchema = new mongoose.Schema<OAuthUser>({
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


const OAuthUserModel =
  (mongoose.models.OAuth as mongoose.Model<OAuthUser>) ||
  mongoose.model("OAuthUser", oAuthUserSchema);
  
export default OAuthUserModel;
