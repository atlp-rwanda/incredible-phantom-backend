import { Router } from 'express';
import welcome from '../controllers/welcome';
import translate from '../controllers/translate'

const router = Router();

// router.use('/', welcome);
router.use('/translate', translate);

export default router;
