import {NextFunction, Request, Response, Router} from 'express';
const router = Router();

// Image generation
import createImage from "./createImage"
router.use('/image', createImage);

// Prompt generation
router.use('/prompt', (req: Request, res: Response, next: NextFunction) =>
  res.status(400).json({ error: 'This route is in progress' })
);

export default router;
