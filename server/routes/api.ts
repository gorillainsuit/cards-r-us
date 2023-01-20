import { Router } from 'express';
// const router = express.Router(); //common js
 //es6
 // LoginRouter
 import authRouter from './auth';
 //cardsRouter
 import cardsRouter from './cards';
 // oauth router
 import oauthRouter from './oauth/oauth';
 // Ai generation router
 import aiGeneration from './generation/generation';

const router = Router();


// auth route
router.use('/auth', authRouter);

//cardsRoute
router.use('/cards', cardsRouter);

//createRoute
router.use('/generate', aiGeneration);

// oauth
router.use('/oauth', oauthRouter);

export default router;
