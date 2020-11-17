import { Router } from 'express';
import welcome from '../controllers/welcome';
import translate from '../controllers/translate'
import path from 'path'


const router = Router();

router.get('/', welcome);
router.post('/translate', translate);

export default router;
