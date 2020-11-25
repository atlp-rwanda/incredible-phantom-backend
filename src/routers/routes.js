import { Router } from 'express';
import route from '../controllers/route';

const router = Router();

router.post('/' , route.createRoute);
router.get('/' , route.getRoute);
router.get('/:id' , route.oneRoute);
router.patch('/:id', route.updateRoute);
router.delete('/:id' , route.deleteRoute);

export default router;