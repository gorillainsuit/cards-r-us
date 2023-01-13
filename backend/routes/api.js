const express = require('express');
const router = express.Router();

// LoginRouter
const authRouter = require('./auth.js');
//cardsRouter
const cardsRouter = require('./cards.js');
// oauth router
const oauthRouter = require('./oauth/oauth');
// createImageRouter
const createImageRouter = require('./createImage.js');

// auth route
router.use('/auth', authRouter);
//cardsRoute
router.use('/cards', cardsRouter);
//createRoute
router.use('/createImage', createImageRouter);
// app.use('api/createImage', createImageRouter);

// oauth
router.use('/oauth', oauthRouter);

module.exports = router;
