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
app.use('/', express.static(path.resolve('./dist')));

mongoose.set('strictQuery', false);

mongoose
  .connect(DB_URI)
  .then(() => {
    console.log('Connected to DB ✅');
    app.listen(PORT, console.log(`Listening at http://localhost:${PORT}/ ✅`));
  })
  .catch(console.error);

// Main page
app.get('/', (req, res) => {
  res.status(200).sendFile(path.resolve('./dist/index.html'));
});

// All api routes
app.use('/api', apiRouter);

// 404 redirect to index.html for react router
app.use((req, res) =>
  res.status(200).sendFile(path.resolve('./dist/index.html'))
);

// Express error handler
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
