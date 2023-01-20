import { Router, Response, Request } from 'express';
const router = Router();
const openaiController = require('../../controllers/openaiController.js');

router.post(
  '/create',
  openaiController.createImage,
  (req: Request, res: Response) => {
    res.status(200).json(res.locals.image);
  }
);

export default router;
