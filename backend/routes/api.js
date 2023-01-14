const express = require('express');
const router = express.Router();

// LoginRouter
const authRouter = require('./auth.js');
//cardsRouter
const cardsRouter = require('./cards.js');
// oauth router
const oauthRouter = require('./oauth/oauth');
// Ai generation router
const aiGeneration = require('./generation/generation');

// auth route
router.use('/auth', authRouter);

//cardsRoute
router.use('/cards', cardsRouter);

//createRoute
router.use('/generate', aiGeneration);

// oauth
router.use('/oauth', oauthRouter);

module.exports = router;
