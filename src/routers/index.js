import { Router } from 'express';
import welcome from '../controllers/welcome';

import rolesRouter from './rolesRouter';
import userRouter from './usersRouter';
import busRouter from './bus';
import translation from '../controllers/i18n';

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
 *     responses:
 *       '200':
 *             description:  Welcome Phantom the which tracks buses.
 *       '500':
 *             description: There was an error while welcoming you.
 * */


router.get('/', welcome);
router.use('/users', userRouter);
router.use('/roles', rolesRouter);
router.use('/bus', busRouter);
router.get('/translate', translation);

router.use('/users', userRouter);

export default router;
