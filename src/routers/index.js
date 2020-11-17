import { Router } from 'express';
import welcome from '../controllers/welcome';
import translation from '../controllers/i18n';

const router = Router();

router.get('/', welcome);
router.post('/translate', translate);
router.use('/users', userRouter);

export default router;
