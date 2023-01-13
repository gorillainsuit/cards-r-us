const User = require('../models/UserModel.js');
const bcrypt = require('bcrypt');

const authController = {
  async signUp(req, res, next) {
    try {
      console.log('authController running')
      const { email, password } = req.body;
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
      if (!password) throw new Error('empty password');
      User.findOne({ email }, (err, userAccount) => {
        if (err || !userAccount) {
          res.redirect('/signup');
        } else {
          hashedPassword = userAccount.password;
          bcrypt.compare(password, hashedPassword, function (err, result) {
            // result == true
            if (result === true) {
              //after verification, pass user information to the next middleware
              const user = {
                email: userAccount.email,
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
