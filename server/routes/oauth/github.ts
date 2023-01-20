import { Request, Response, NextFunction, Router } from 'express';
import sessionController from '../../controllers/sessionController';
import oauth from '../../controllers/oauth/oAuthController';

const router = Router();

const GHCLIENT_ID = process.env.GITHUB_ID;
const GHSECRET = process.env.GITHUB_SECRET;
// TODO: add code to remove a / at the end of the url if it is there
const OAUTH_HOST = process.env.OAUTH_HOST;

// Allow all GH middleware to use the secrects
router.use((req: Request, res: Response, next: NextFunction) => {
  res.locals.GH = { clientId: GHCLIENT_ID, secret: GHSECRET, host: OAUTH_HOST };
  return next();
});

// Authorize
router.get('/', (req: Request, res: Response) => {
  const { clientId, host } = res.locals.GH;
  res
    .status(304)
    .redirect(
      `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${host}/api/oauth/gh/redirect&scope=user`
    );
});

// Get access token
router.get(
  '/redirect',
  oauth.providers.github.getToken,
  oauth.providers.github.getUserInfo,
  oauth.middleware.getUser,
  sessionController.startSession,
  (req: Request, res: Response, next: NextFunction) => {
    res.status(304).redirect('/cards');
  }
);

export default router;
