require('dotenv').config();
import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();
mongoose.set('strictQuery', false);

const runDB = () => {
  mongoose
    .connect(process.env.DB_URI || '')
    .then(() => {
      console.log('Connected to DB ✅');
    })
    .catch(() => {
      console.log('Failed to connect to DB ❌');
    });
};

export default runDB;
