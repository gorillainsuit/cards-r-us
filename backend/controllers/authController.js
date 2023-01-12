const User = require('../models/UserModel.js');
const bcrypt = require('bcrypt');

const authController = {
  async getUser(req, res, next) {
    try {
      const { username, password } = req.body[0];
      const userData = await User.findOne({ username, password });
      //   res.locals.userData = userData;
      if (userData === null) {
        console.log('user not found');
        return;
      }
      console.log('userData: ', userData);
      console.log(`User '${username}' found`);
      return next();
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
      const { username, password } = req.body[0];
      const newUser = User.create({ username, password });
      console.log('reqbody: ', req.body);
      console.log('username: ', username);
      console.log('password: ', password);
      console.log(`User '${newUser}' created`);
      res.locals.newUser = newUser;
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
    const { username, password } = req.body[0];
    let hashedPassword;
    try {
      if (!password) throw new Error('empty password');
      await User.findOne({ username }, (err, userAccount) => {
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
              console.log(user);
              return next();
            } else {
              console.log('wrong password');
              res.send('wrong password');
            }
          });
        }
      }).clone();
    } catch (err) {
      return next({
        log: 'Error verifying user',
        status: 500,
        message: `Err: ${err.message}`,
      });
    }
  },
};

// userController.verifyUser = (req, res, next) => {
// 	// write code here
// 	const { username, password } = req.body;
// 	User.findOne({ username }, (err, userAccount) => {
// 		if (err || !userAccount) {
// 			res.redirect('/signup');
// 		} else {
// 			userAccount.comparePassword(password, (err, isMatch) => {
// 				if (err) return next(err);
// 				if (!isMatch) res.redirect('/signup');
// 				const user = { username: userAccount.username, id: userAccount._id.toString() };
// 				console.log(user);
// 				res.locals.user = user;
// 				return next();
// 			});
// 		}
// 	});
// };

module.exports = authController;
