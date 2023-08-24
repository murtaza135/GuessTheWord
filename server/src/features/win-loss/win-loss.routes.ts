import Router from 'express-promise-router';
import auth from '../../lib/auth';
import validate from '../../middleware/validate';
import * as winLossSchemas from './win-loss.schema';
import * as winLossController from './win-loss.controller';

const router = Router();

router.get(
  '/winLoss',
  auth.authenticate({ strategy: 'protect', message: 'You must login to access this route' }),
  winLossController.sendWinsLosses
);

router.post(
  '/wins/increment',
  validate.body(winLossSchemas.incrementWins),
  auth.authenticate({ strategy: 'protect', message: 'You must login to access this route' }),
  winLossController.incrementWins
);

router.post(
  '/losses/increment',
  validate.body(winLossSchemas.incrementLosses),
  auth.authenticate({ strategy: 'protect', message: 'You must login to access this route' }),
  winLossController.incrementLosses
);

export default router;
