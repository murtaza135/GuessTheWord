import Router from 'express-promise-router';
import validate from '../../middleware/validate';
import * as winLossSchemas from './win-loss.schema';
import * as winLossController from './win-loss.controller';
import { protect } from '../auth';

const router = Router();

router.get(
  '/winLoss',
  protect({ message: 'You must login to access this route' }),
  winLossController.sendWinsLosses
);

router.post(
  '/wins/increment',
  validate.body(winLossSchemas.incrementWins),
  protect({ message: 'You must login to access this route' }),
  winLossController.incrementWins
);

router.post(
  '/losses/increment',
  validate.body(winLossSchemas.incrementLosses),
  protect({ message: 'You must login to access this route' }),
  winLossController.incrementLosses
);

export default router;
