const User = require('../models/UserModel.js');
const bcrypt = require('bcrypt');

const authController = {
  async signUp(req, res, next) {
    try {
      console.log('authController running')
      const { username, password } = req.body;
      const newUser = await User.create({ username, password });
      const { gallery, _id } = newUser;
      res.locals.user = { username, id: _id, gallery };
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
    const { username, password } = req.body;
    let hashedPassword;
    try {
      if (!password) throw new Error('empty password');
      User.findOne({ username }, (err, userAccount) => {
        if (err || !userAccount) {
          res.redirect('/signup');
        } else {
          hashedPassword = userAccount.password;
          bcrypt.compare(password, hashedPassword, function (err, result) {
            // result == true
            if (result === true) {
              //after verification, pass user information to the next middleware
              const user = {
                username: userAccount.username,
                id: userAccount._id.toString(),
                gallery: userAccount.gallery,
              };
              res.locals.user = user;
              return next();
            } else {
              res.status(401).json({ Err: 'wrong password' });
            }
          });
        }
      });
    } catch (err) {
      return next({
        log: 'Error verifying user',
        status: 500,
        message: `Err: ${err.message}`,
      });
    }
  },
};

module.exports = authController;
