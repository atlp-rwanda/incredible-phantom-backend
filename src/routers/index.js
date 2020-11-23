import { Router } from 'express';
import welcome from '../controllers/welcome';
import path from 'path'
import translation from '../controllers/i18n'


const router = Router();

router.get('/', welcome);
router.get('/translate' , translation);


export default router;
