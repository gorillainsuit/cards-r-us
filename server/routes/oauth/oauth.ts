import { Router } from 'express';

const router = Router();

// Github oauth provider route
import gitHubRouter from './github';
router.use('/gh', gitHubRouter);

export default router;
