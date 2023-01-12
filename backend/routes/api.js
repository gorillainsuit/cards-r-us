const express = require('express');
const router = express.Router();

// LoginRouter
const authRouter = require('./auth.js');
//cardsRouter
const cardsRouter = require('./cards.js');
//createImageRouter
// const createImageRouter = require('./createImage.js');

// auth route
router.use('/auth', authRouter);
//cardsRoute
router.use('/cards', cardsRouter);
//createRoute
// app.use('api/createImage', createImageRouter);

module.exports = router;
