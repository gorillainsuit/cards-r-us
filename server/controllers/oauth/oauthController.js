const github = require('./github');
const User = require('../../models/UserModel');

const oauthController = {
  providers: {
    github,
  },

  middleware: {
    getUser: (req, res, next) => {
      const { login, email, name, avatar_url } = res.locals.GHUser;
      User.findOne({ username: login }, (err, user) => {
        if (err)
          return next({
            log: `Error saving oauth user: ${err}`,
            status: 500,
            message: { err: 'An error occurred saving oauth user.' },
          });

        if (user === null) {
          User.create(
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
        } else {
          res.locals.user = { ...user, id: user._id };
          // console.log(res.locals.user);
          return next();
        }
      });
    },

    addUser: (req, res, next) => {
      const { login, email, name, avatar_url } = res.locals.GHUser;
      User.create(
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
module.exports = oauthController;
