const User = require('../models/UserModel');

const authController = {
  async getUser(req, res, next) {
    try {
      const userData = await User.findOne({ username });
      res.locals.userData = userData;
      console.log(`User '${username}' found`);
      return next;
    } catch (e) {
      return next({
        log: 'Middleware error caught in authController - getUser failed',
        status: 500,
        message: { err: e.message },
      });
    }
  },

  async signUp(req, res, next) {
    try {
      const { username } = req.body;
      const newUser = User.create({ username });
      console.log(`User '${newUser}' created`);
      res.locals.newUser = newUser;
    } catch (e) {
      return next({
        log: 'Middleware error caught in authController - signUp failed',
        status: 500,
        message: { err: e.message },
      });
    }
  },
};

module.exports = authController;
