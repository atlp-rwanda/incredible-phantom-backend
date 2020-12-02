import busStop from '../controllers/busStop';
import { Router } from 'express';

const router = Router();

router.get('/',busStop.getBusStops);
router.get('/:busStopId',busStop.oneStop);
router.post('/',busStop.createBusStop);
router.patch('/:busStopId',busStop.updateBusStop);
router.delete('/:busStopId', busStop.deleteBusStop);


export default router;
