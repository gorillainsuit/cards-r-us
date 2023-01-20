import { Router, Request, Response } from 'express';
import authController from '../controllers/authController';
import sessionController from '../controllers/sessionController';

const router = Router();
//POST when user tries to log in
//hash password before it's saved to database
router.post(
  '/login',
  authController.verifyUser,
  sessionController.startSession,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.user);
  }
);

// '/signup' Endpoint
router.post(
  '/signup',
  authController.signUp,
  sessionController.startSession,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.user);
  }
);

router.get('/user', sessionController.isLoggedIn, (req: Request, res: Response) => {
  const { email, username, avatar, name, _id } = res.locals.user;
  res.status(200).json({ email, username, avatar, name, userId: _id });
});

export default router;
