const express = require('express');
const router = express.Router();
const sessionController = require('../../controllers/sessionController');
const oauth = require('../../controllers/oauth/oauthController');

const GHCLIENT_ID = process.env.GITHUB_ID;
const GHSECRET = process.env.GITHUB_SECRET;
// TODO: add code to remove a / at the end of the url if it is there
const OAUTH_HOST = process.env.OAUTH_HOST;

// Allow all GH middleware to use the secrects
router.use((_, res, next) => {
  res.locals.GH = { clientId: GHCLIENT_ID, secret: GHSECRET, host: OAUTH_HOST };
  return next();
});

// Authorize
router.get('/', (_, res) => {
  const { clientId, host } = res.locals.GH;
  res
    .status(304)
    .redirect(
      `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${host}/api/oauth/gh/redirect&scope=user`
    );
});

// Get access token
router.get(
  '/redirect',
  oauth.providers.github.getToken,
  oauth.providers.github.getUserInfo,
  oauth.middleware.getUser,
  sessionController.startSession,
  (req, res, next) => {
    res.status(304).redirect('/cards');
  }
);

module.exports = router;
