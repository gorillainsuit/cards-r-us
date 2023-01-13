const Session = require('../models/sessionsModel.js');
const User = require('../models/UserModel.js');

const sessionController = {};

/**
 * isLoggedIn - find the appropriate session for this request in the database, then
 * verify whether or not the session is still valid.
 */
sessionController.isLoggedIn = (req, res, next) => {
  // write code here
  const { ssid } = req.cookies;
  if (!ssid) {
    console.log('No SSID cookie, redirecting...');
    return res.redirect('/login');
  }
  Session.findOne({ _id: ssid }, async (err, records) => {
    if (err)
      return next({
        log: `sessionController.isLoggedIn: ${e}`,
        status: 500,
        message: { err: 'An error occurred' },
      });

    if (!records) res.status(304).redirect('/login');

    res.locals.user = await User.findOne({ _id: records.userId });
    return next();
  });
};

/**
 * startSession - create and save a new Session into the database.
 */
sessionController.startSession = (req, res, next) => {
  const { SSID } = req.cookies;
  if (SSID) return next();
  Session.create({ userId: res.locals.user.id }, (err, newSession) => {
    if (err)
      return next({
        log: `sessionController.startSession: ${e}`,
        status: 500,
        message: { err: 'An error occurred' },
      });

    res.cookie('SSID', newSession._id, {
      maxAge: 1800000, // 30 mins
      httpOnly: true,
    });
    return next();
  });
};

module.exports = sessionController;
