const User = require('../models/UserModel.js');
const bcrypt = require('bcrypt');

const authController = {
  async signUp(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password)
        return new Error('No username or password provided.');
      const newUser = await User.create({ email, password });
      const { gallery, _id } = newUser;
      res.locals.user = { email, id: _id, gallery };
      return next();
    } catch (e) {
      return next({
        log: 'Middleware error caught in authController - signUp failed',
        status: 500,
        message: { err: e.message },
      });
    }
  },

  async verifyUser(req, res, next) {
    const { email, password } = req.body;
    let hashedPassword;
    try {
      if (!email || !password)
        throw new Error('No email or password provided.');
      User.findOne({ email }, (err, userAccount) => {
        if (err) {
          return next({
            log: `Middleware error caught in authController - login failed: ${err}`,
            status: 500,
          });
        }
        hashedPassword = userAccount.password;
        bcrypt.compare(password, hashedPassword, function (err, result) {
          // result == true
          if (!result) return new Error('Incorrect password.');
          //after verification, pass user information to the next middleware
          const user = {
            email: userAccount.email,
            id: userAccount._id,
            gallery: userAccount.gallery,
          };
          res.locals.user = user;
          return next();
        });
      });
    } catch (err) {
      return next({
        log: `Error verifying user: ${err}`,
        status: 500,
      });
    }
  },
};

module.exports = authController;
