const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();
const { DB_URI } = process.env;

const PORT = 3000;

const app = express();

// Routes
const loginRouter = require('./routes/login');
const cardsRouter = require('./routes/cards');

app.use(express.json());

mongoose.set('strictQuery', false);

mongoose
  .connect(DB_URI)
  .then(() => console.log('connected to DB'))
  .catch(console.error);

app.get('/', (req, res) => {});

app.use('/login', loginRouter);
app.use('/cards', cardsRouter);

app.use((req, res) =>
  res.status(404).send("This is not the page you're looking for...")
);

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT);
