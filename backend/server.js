const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();
const { DB_URI } = process.env;

const PORT = 3000;
const app = express();

// LoginRouter
const loginRouter = require('./routes/login');
const cardsRouter = require('./routes/cards');
// signUpRouter
const signUpRouter = require('./routes/signup');
//cardsRouter
const cardsRouter = require('./routes/cards.js')
//createImageRouter
// const createImageRouter = require('./routes/createImage.js');

app.use(express.json());

mongoose.set('strictQuery', false);

mongoose
  .connect(DB_URI)
  .then(() => console.log('connected to DB'))
  .catch(console.error);

app.get('/', (req, res) => {
    res.sendFile('../frontend/index.html', function (err) {
      if (err) {
        next(err);
      } else {
        console.log('Sent:', 'index.html');
      }
    });
});

//loginRoute
app.use('/api/login', loginRouter);
//signUpRoute
app.use('/api/signup', signUpRouter);
//cardsRoute
app.use('/api/cards', cardsRouter)
//createRoute
// app.use('api/createImage', createImageRouter);

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
