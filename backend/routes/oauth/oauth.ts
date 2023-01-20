const express = require('express');
const router = express.Router();

// Github oauth provider route
const gitHubRouter = require('./github');
router.use('/gh', gitHubRouter);

module.exports = router;
