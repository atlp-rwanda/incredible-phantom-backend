import { Router } from 'express';
import welcome from '../controllers/welcome';
import path from 'path'
import translation from '../controllers/i18n'


const router = Router();

router.get('/', welcome);
router.post('/translate' , translation.translate);
router.post('/detect' , translation.detect);


export default router;
