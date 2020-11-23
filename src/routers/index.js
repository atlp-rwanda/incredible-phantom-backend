import { Router } from 'express';
import welcome from '../controllers/welcome';

import translation from '../controllers/i18n'

import translate from '../controllers/translate';
import userRouter from './usersRouter';
import path from 'path'
import translation from '../controllers/i18n'


const router = Router();

router.get('/', welcome);
router.get('/translate' , translation);

router.post('/translate', translate);
router.use('/users', userRouter);


export default router;
