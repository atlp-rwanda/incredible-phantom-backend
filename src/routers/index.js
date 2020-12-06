import { Router } from 'express';
import welcome from '../controllers/welcome';
import translate from '../controllers/translate';

import userRouter from './usersRouter';
import path from 'path'
import translation from '../controllers/i18n'


const router = Router();

router.get('/', welcome);
router.post('/translate', translate);
router.use('/users', userRouter);
router.get('/translate' , translation);


export default router;
