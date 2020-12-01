import { Router } from 'express';
import route from '../controllers/route';

const router = Router();

router.post('/' , route.createRoute);
router.get('/' , route.getRoute);
router.get('/:routeID' , route.oneRoute);
router.patch('/:routeID', route.updateRoute);
router.delete('/:routeID' , route.deleteRoute);

export default router;