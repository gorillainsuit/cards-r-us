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

app.use(express.json());
app.use(cookieParser());

mongoose.set('strictQuery', false);

mongoose
  .connect(DB_URI)
  .then(() => {
    console.log('Connected to DB ✅');
    app.listen(PORT, () =>
      console.log(`Server started at http://localhost:${PORT} ✅`)
    );
  })
  .catch((e) => {
    console.error(`Something went wrong: ${e}`);
  });

app.get('/', (req, res) => {
  res.sendFile('../frontend/index.html', function (err) {
    if (err) {
      next(err);
    } else {
      console.log(`GET ${req.hostname} /`);
    }
  });
});

app.use('/api', apiRouter);

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
