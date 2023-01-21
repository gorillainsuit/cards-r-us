import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import path from 'path';
import cookieParser from 'cookie-parser';
require('dotenv').config();
import dotenv from 'dotenv';
import connectToDB from './db';
import session from 'express-session';
import passport from 'passport';
import MongoStore from 'connect-mongo';
import oauthRouter from './routes/oauth/oauth';
// const GitHubStrategy = require('passport-github2').Strategy;
import { Strategy as GitHubStrategy } from 'passport-github2';
dotenv.config();

const PORT = 3000;
const app = express();

// api router
import apiRouter from './routes/api';

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // added this...does this make a difference?

//database call
connectToDB();

// passport authentication
app.use(
  session({
    secret: 'cardSession',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_URI || '' }),
    // need to update models appropriately
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
      callbackURL: 'http://localhost:8080/oauth/github/callback',
    },
    function (accessToken: any, refreshToken: any, profile: any, done: any) {
      console.log('GITHUB STRATEGY');
      //here this could create a user profil in mongodb with mongoose findOne(){upsert:true}
      //USER.findOne(,{upsert:true})
      //USER.create(profile)
      done(null, profile);
    }
  )
);
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user: any, done) {
  done(null, user);
});
//static server dist folder

app.use('/', express.static(path.resolve('./dist')));

// Main page
app.get('/', (req: Request, res: Response) => {
  res.status(200).sendFile(path.resolve('./dist/index.html'));
});

// All api routes
app.use('/oauth', oauthRouter);
app.use('/api', apiRouter);

// app.use('/google', googleRouter);
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
app.use(
  (err: ExpressError, req: Request, res: Response, next: NextFunction) => {
    const defaultErr: ExpressError = {
      log: 'Express error handler caught unknown middleware error',
      status: 500,
      message: { err: 'An error occurred' },
    };
    console.log('ERROR OBJECT', err);
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
  }
);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
