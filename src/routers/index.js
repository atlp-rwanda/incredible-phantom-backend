import { Router } from 'express';
import welcome from '../controllers/welcome';

<<<<<<< HEAD
import rolesRouter from './rolesRouter';
import userRouter from './usersRouter';
=======
import translate from '../controllers/translate';
import rolesRouter from './rolesRouter';
import userRouter from './usersRouter';
import path from 'path';
>>>>>>> ch-setup(initial setup): setting up project
import translation from '../controllers/i18n';

const router = Router();

<<<<<<< HEAD
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
=======
router.get('/', welcome);
router.use('/users', userRouter);
router.use('/roles', rolesRouter);
router.get('/translate', translation);
>>>>>>> ch-setup(initial setup): setting up project

router.get('/', welcome);
router.use('/users', userRouter);
<<<<<<< HEAD
router.use('/roles', rolesRouter);
router.get('/translate', translation);
=======
>>>>>>> ch-setup(initial setup): setting up project

export default router;
