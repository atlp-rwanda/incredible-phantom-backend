import { Router } from 'express';
import welcome from '../controllers/welcome';
import translation from '../controllers/i18n'


const router = Router();

router.get('/', welcome);

//Path for translations
router.post('/translate' , translation.translate);
router.post('/detect' , translation.detect);



export default router;
