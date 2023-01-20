import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import path from 'path';
import cookieParser from 'cookie-parser';
// require('dotenv').config();
import dotenv from 'dotenv';

dotenv.config();

const PORT = 3000;
const app = express();

// api router
import apiRouter from './routes/api.js';

app.use(cookieParser());
app.use(express.json());
app.use('/', express.static(path.resolve('./dist')));

mongoose.set('strictQuery', false);

mongoose
  .connect(process.env.DB_URI || '')
  .then(() => {
    console.log('Connected to DB ✅');
  })
  .catch(() => {
    console.log('Failed to connect to DB ❌');
  });

// Main page
app.get('/', (req: Request, res: Response) => {
  res.status(200).sendFile(path.resolve('./dist/index.html'));
});

// All api routes
app.use('/api', apiRouter);

// 404 redirect to index.html for react router
app.use((req: Request, res: Response) =>
  res.status(200).sendFile(path.resolve('./dist/index.html'))
);

export interface ExpressError {
  log: string;
  status: number;
  message: { err: string };
}

// Express error handler
app.use((err: ExpressError, req: Request, res: Response, next: NextFunction) => {
  const defaultErr: ExpressError = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
