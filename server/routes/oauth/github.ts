// import { Request, Response, NextFunction, Router } from 'express';
// // import { Strategy } from 'passport-github2';
// import passport from 'passport';
// const GitHubStrategy = require('passport-github2').Strategy;

// const router = Router();

// // Use the GitHubStrategy within Passport.
// //   Strategies in Passport require a `verify` function, which accept
// //   credentials (in this case, an accessToken, refreshToken, and GitHub
// //   profile), and invoke a callback with a user object.
// passport.use(
//   new GitHubStrategy(
//     {
//       clientID: process.env.GITHUB_ID || '',
//       clientSecret: process.env.GITHUB_SECRET || '',
//       callbackURL: 'http://localhost:3000/api/oauth/github/callback',
//     },
//     function (
//       accessToken: string,
//       refreshToken: string,
//       profile: any,
//       done: any
//     ) {
//       console.log('GITHUB STRATEGY');
//       done(null, profile);
//     }
//   )
// );

// // Passport session setup.
// //   To support persistent login sessions, Passport needs to be able to
// //   serialize users into and deserialize users out of the session.  Typically,
// //   this will be as simple as storing the user ID when serializing, and finding
// //   the user by ID when deserializing.  However, since this example does not
// //   have a database of user records, the complete GitHub profile is serialized
// //   and deserialized.
// passport.serializeUser(function (user, done) {
//   done(null, user);
// });

// passport.deserializeUser(function (user: any, done) {
//   done(null, user);
// });

// // TODO: add code to remove a / at the end of the url if it is there
// // const OAUTH_HOST = process.env.OAUTH_HOST;
// // interface StrategyInterface {
// //   clientID: string;
// //   clientSecret: string;
// //   callbackURL: string;
// // }

// // router.get(
// //   '/',
// //   passport.authenticate('github', { scope: ['user:email'] }),
// //   (req, res) => {}
// // );

// // // Allow all GH middleware to use the secrects
// // router.use((req: Request, res: Response, next: NextFunction) => {
// //   res.locals.GH = { clientId: GHCLIENT_ID, secret: GHSECRET, host: OAUTH_HOST };
// //   return next();
// // });

// // // Authorize
// // router.get('/', (req: Request, res: Response) => {
// //   const { clientId, host } = res.locals.GH;
// //   res
// //     .status(304)
// //     .redirect(
// //       `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${host}/api/oauth/gh/redirect&scope=user`
// //     );
// // });

// // // Get access token
// // router.get(
// //   '/redirect',
// //   oauth.providers.github.getToken,
// //   oauth.providers.github.getUserInfo,
// //   oauth.middleware.getUser,
// //   sessionController.startSession,
// //   (req: Request, res: Response, next: NextFunction) => {
// //     res.status(304).redirect('/cards');
// //   }
// // );

// // export default router;
