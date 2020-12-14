import { Router } from 'express';
import welcome from '../controllers/welcome';
import rolesRouter from './rolesRouter';
import userRouter from './usersRouter';

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
 *           type: string
 *         description: Your preferred language locale
 *     responses:
 *       '200':
 *             description:  Welcome Phantom the which tracks buses.
 *       '500':
 *             description: There was an error while welcoming you.
 * */

router.get('/', welcome);
router.use('/users', userRouter);
router.use('/roles', rolesRouter);

export default router;
