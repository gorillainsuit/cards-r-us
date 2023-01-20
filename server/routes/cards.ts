import { Router, Request, Response } from 'express';
import cardsController from '../controllers/cardsController';
import sessionController from '../controllers/sessionController';
// this logged using localhost:3000/cards
// router.get('/', (req, res) => {
  //   console.log('cards router connected');
  // });
  const router = Router();

//GET REQUEST
router.get(
  '/',
  sessionController.isLoggedIn,
  cardsController.getCards,
  (req : Request, res: Response) => {
    //respond to client with cards collection data retrieved from DB
    console.log('GET REQUEST for cardsController.getCards');
    return res.status(200).json(res.locals.cards);
  }
);

router.get('/card/:cardId', cardsController.getCard, (req: Request, res: Response) => {
  res.status(200).json(res.locals.card);
});

// CREATE
router.post(
  '/',
  sessionController.isLoggedIn,
  cardsController.createCard,
  cardsController.getCards,
  (req: Request, res: Response) => {
    console.log('CREATE REQUEST for cardsController.createCard');
    return res.status(200).json(res.locals.cards);
  }
);

// DELETE
router.delete(
  '/',
  sessionController.isLoggedIn,
  cardsController.deleteCard,
  cardsController.getCards,
  (req: Request, res: Response) => {
    console.log('DELETE REQUEST for cardsController.deleteCard');
    return res.status(200).json(res.locals.cards);
  }
);

export default router
