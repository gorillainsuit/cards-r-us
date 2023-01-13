module.exports = {
  getToken: (req, res, next) => {
    const { code } = req.query;
    const { clientId, secret } = res.locals.GH;

    // The github server should respond with this
    //     {
    //   "access_token":"gho_16C7e42F292c6912E7710c838347Ae178B4a",
    //   "scope":"repo,gist",
    //   "token_type":"bearer"
    //    }

    fetch(
      `https://github.com/login/oauth/access_token?client_id=${clientId}&client_secret=${secret}&code=${code}`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    )
      .then((d) => d.json())
      .then((d) => {
        res.locals.token = d.access_token;
        return next();
      })
      .catch((e) =>
        next({
          log: `Error with getting Github access token: ${e}`,
          status: 400,
          message: { err: 'An error occurred getting Github access token.' },
        })
      );
  },

  getUserInfo: (req, res, next) => {
    const { token } = res.locals;

    fetch('https://api.github.com/user', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((d) => d.json())
      .then((d) => {
        const { login, email, name, avatar_url } = d;
        res.locals.GHUser = { login, email, name, avatar_url };
        return next();
      })
      .catch((e) =>
        next({
          log: `Error with getting Github user info: ${e}`,
          status: 400,
          message: { err: 'An error occurred getting Github user info.' },
        })
      );
  },
};
