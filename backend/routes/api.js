const express = require('express');
const router = express.Router();

// LoginRouter
const authRouter = require('./auth.js');
//cardsRouter
const cardsRouter = require('./cards.js');
//createImageRouter
// const createImageRouter = require('./createImage.js');
// oauth router
const oauthRouter = require('./oauth/oauth');

// auth route
router.use('/auth', authRouter);
//cardsRoute
router.use('/cards', cardsRouter);
//createRoute
// app.use('api/createImage', createImageRouter);

// oauth
router.use('/oauth', oauthRouter);

module.exports = router;
