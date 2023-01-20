import axios from 'axios';
import { Request, Response, NextFunction } from 'express';

const githubController = {
  getToken: async (req: Request, res: Response, next: NextFunction) => {
    console.log('starting...');
    const { code } = req.query;
    console.log('CODE : ', code);
    // const { clientId, secret } = res.locals.GH;

    const clientId = process.env.GITHUB_ID;
    const secret = process.env.GITHUB_SECRET;

    // The github server should respond with this
    //     {
    //   "access_token":"gho_16C7e42F292c6912E7710c838347Ae178B4a",
    //   "scope":"repo,gist",
    //   "token_type":"bearer"
    //    }
    try {
      const response = await axios.post(
        `https://github.com/login/oauth/access_token?client_id=${clientId}&client_secret=${secret}&code=${code}`,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );

      // const response = await fetch(
      //   `https://github.com/login/oauth/access_token?client_id=${clientId}&client_secret=${secret}&code=${code}`,
      //   {
      //     method: 'POST',
      //     headers: {
      //       Accept: 'application/json',
      //       'Content-Type': 'application/json',
      //     },
      //   }
      // );

      // const data: any = await response.json();
      console.log('data from getToken : ', response.data);
      res.locals.token = response.data.access_token;
      return next();
    } catch (error) {
      return next({
        log: `Error with getting Github access token: ${error}`,
        status: 400,
        message: { err: 'An error occurred getting Github access token.' },
      });
    }

    // fetch(
    //   `https://github.com/login/oauth/access_token?client_id=${clientId}&client_secret=${secret}&code=${code}`,
    //   {
    //     method: 'POST',
    //     headers: {
    //       Accept: 'application/json',
    //       'Content-Type': 'application/json',
    //     },
    //   }
    // )
    //   .then((d) => d.json())
    //   .then((d) => {
    //     console.log('d from getTOken : ', d);
    //     res.locals.token = d.access_token;
    //     return next();
    //   })
    //   .catch((e) => {
    //     return next({
    //       log: `Error with getting Github access token: ${e}`,
    //       status: 400,
    //       message: { err: 'An error occurred getting Github access token.' },
    //     });
    //   });
  },

  getUserInfo: async (req: Request, res: Response, next: NextFunction) => {
    // const { token } = res.locals;
    // try {
    //   const response = await axios.get(`https://api.github.com/user`, {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   });

    //   console.log('response from getUserInfo : ', response);

    //   const { login, email, name, avatar_url }: any = response.data;
    //   res.locals.GHUser = { login, email, name, avatar_url };
    //   return next();
    // } catch (error) {
    //   return next({
    //     log: `Error with getting Github user info: ${error}`,
    //     status: 400,
    //     message: { err: 'An error occurred getting Github user info.' },
    //   });
    // }

    res.locals.GHUser = {
      login: 'test',
      email: 'test@test.com',
      name: 'test',
      avatar_url: 'test',
    };

    return next();

    // fetch('https://api.github.com/user', {
    //   method: 'GET',
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // })
    //   .then((d) => d.json())
    //   .then((d) => {
    //     console.log('d from getUserInfo : ', d);
    //     const { login, email, name, avatar_url }: any = d;
    //     res.locals.GHUser = { login, email, name, avatar_url };
    //     return next();
    //   })
    //   .catch((e) =>
    //     next({
    //       log: `Error with getting Github user info: ${e}`,
    //       status: 400,
    //       message: { err: 'An error occurred getting Github user info.' },
    //     })
    //   );
  },
};

export default githubController;
