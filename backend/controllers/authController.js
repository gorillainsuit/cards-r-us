const User = require('../models/UserModel.js');

const authController = {
  async getUser(req, res, next) {
    try {
      const {username, password} = req.body[0]
      const userData = await User.findOne({ username, password });
    //   res.locals.userData = userData;
    if(userData === null) {
      console.log('user not found')
      return;
    }
    console.log('userData: ', userData)
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
      const newUser = User.create({ username, password});
      console.log("reqbody: ", req.body)
      console.log('username: ', username)
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
