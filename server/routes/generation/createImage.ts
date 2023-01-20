import { Router, Response, Request } from 'express';
const router = Router();
import openaiController from '../../controllers/openaiController';

router.post(
  '/create',
  openaiController.createImage,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.image);
  }
);

export default router;
