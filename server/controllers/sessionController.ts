import { NextFunction, Request, Response } from 'express';
import Session from '../models/SessionsModel';
import User from '../models/UserModel';
import { ExpressError } from '../server';

const sessionController = {
  /**
   * isLoggedIn - find the appropriate session for this request in the database, then
   * verify whether or not the session is still valid.
   */
  isLoggedIn: (req: Request, res: Response, next: NextFunction) => {
    return next();
    const { SSID } = req.cookies;
    if (!SSID) {
      return next({
        log: `sessionController.isLoggedIn: No session found.`,
        status: 401,
        message: { err: 'No SSID session found.' },
      });
    }

    Session.findOne({ _id: SSID }, async (err: any, records: any) => {
      if (err) {
        const error: ExpressError = {
          log: `sessionController.isLoggedIn: ${err}`,
          status: 500,
          message: { err: 'An error occurred' },
        };
        return next(error);
      }

      if (records === null || records?.userId === null) {
        const error: ExpressError = {
          log: `sessionController.isLoggedIn: Records is null`,
          status: 401,
          message: { err: 'No session found.' },
        };
        return next(error);
      }

      User.findOne({ _id: records.userId }, (err: any, user: any) => {
        if (err) {
          const error: ExpressError = {
            log: `sessionController.isLoggedIn: ${err}`,
            status: 500,
            message: { err: 'An error occurred' },
          };
          return next(error);
        }

        res.locals.user = user;
        return next();
      });
    });
  },

  /**
   * startSession - create and save a new Session into the database.
   */
  startSession: (req: Request, res: Response, next: NextFunction) => {
    console.log('starting Session: ');
    const { SSID } = req.cookies;
    console.log('SSID: ', SSID);

    // If there is already an SSID cookie, go ahead an authenticate it.
    // if (SSID) return sessionController.isLoggedIn(req, res, next);

    Session.create({ userId: res.locals.user.id }, (err, newSession) => {
      if (err) {
        const error: ExpressError = {
          log: `sessionController.isLoggedIn: ${err}`,
          status: 500,
          message: { err: 'An error occurred' },
        };
        next(error);
      }

      if (newSession === null)
        return next({
          log: `sessionController.isLoggedIn: New session is null`,
          status: 500,
          message: { err: 'An error occured.' },
        });

      res.cookie('SSID', newSession._id, {
        maxAge: 1800000, // 30 mins
        httpOnly: true,
      });
      return next();
    });
  },
};

export default sessionController;
