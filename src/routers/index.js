import { Router } from 'express';
import welcome from '../controllers/welcome';
import translation from '../controllers/i18n';

import translate from '../controllers/translate';
import userRouter from './usersRouter';


const router = Router();

router.get('/', welcome);
router.post('/translate', translate);
router.use('/users', userRouter);

export default router;
