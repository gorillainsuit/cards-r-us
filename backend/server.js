const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const { DB_URI } = process.env;

const PORT = 3000;
const app = express();

// api router
const apiRouter = require('./routes/api.js');

app.use(cookieParser());
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

app.use('/api', apiRouter);

app.use((req, res) => res.status(404).redirect('/'));

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
