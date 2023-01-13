const github = require('./github');
const OauthUser = require('../../models/OauthUserModel');

module.exports = {
  providers: {
    github,
  },

  middleware: {
    addUser: (req, res, next) => {
      const { login, email, name, avatar_url } = res.locals.GHUser;
      OauthUser.create(
        { username: login, email, name, avatar: avatar_url },
        (err, user) => {
          if (err)
            return next({
              log: `Error saving oauth user: ${err}`,
              status: 500,
              message: { err: 'An error occurred saving oauth user.' },
            });

          res.locals.user = { ...user._doc, id: user._doc._id };
          // console.log(res.locals.user);
          return next();
        }
      );
    },
  },
};
