import { Router } from 'express';
import welcome from '../controllers/welcome';
import path from 'path'
import translation from '../controllers/i18n';

import rolesRouter from './rolesRouter';
import userRouter from './usersRouter';
import routes from './routes';
import busStop from './busStops';
import busRouter from './busRouter';
import assignBusToRoute from './assignBuses';
// import viewListOfBuses from './viewBusesRoute';

const router = Router();
/**
 * @swagger
 * /api:
 *   get:
 *     tags:
 *       - Welcome
 *     name: Welcome
 *     summary: Welcome message
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: lang
 *         schema:
 *            type: string
 *         description: Your preferred language
 *     responses:
 *       '200':
 *             description:  Welcome Phantom the which tracks buses.
 *       '500':
 *             description: There was an error while welcoming you.
 * */
router.get('/', welcome);
router.use('/roles', rolesRouter);
router.use('/busStop', busStop);
// router.use('/busesOnRoute', viewListOfBuses);
router.use('/bus', busRouter);
router.use('/assignBusToRoute', assignBusToRoute);
router.use('/route', routes);
router.use('/users', userRouter);
export default router;
