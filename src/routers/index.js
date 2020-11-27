import { Router } from 'express';
import welcome from '../controllers/welcome';


import translate from '../controllers/translate';
import rolesRouter from './rolesRouter'
import userRouter from './usersRouter';
import path from 'path'
import translation from '../controllers/i18n'


const router = Router();

router.get('/', welcome);
router.use('/users', userRouter);
router.use('/roles', rolesRouter)
router.get('/translate' , translation);

router.post('/translate', translate);
router.use('/users', userRouter);


export default router;
