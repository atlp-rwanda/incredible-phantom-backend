import { Router } from 'express';

import welcome from '../controllers/welcome';

const router = Router();

router.use('/', welcome);

export default router;
