import busStop from '../controllers/busStop';
import { Router } from 'express';

const router = Router();

/** 
 * @swagger
 * 
 * /busStop:
 *  get: 
 *   summary: Get all Bus Stop 
 *   description: Get all bus Stop in system
 *   tags: 
 *      - BusStop
 *   parameters: 
 *   - in: body
 *     name: Bus Stop
 *     description: Show bus Stop details
 *     schema: 
 *       type: object 
 *       properties:
 *        coordinates: 
 *         type: string
 *        sector: 
 *         type: string
 *        cell: 
 *         type: string
 *   responses:
 *    200: 
 *     description: List of all bus Stops
 */

router.get('/',busStop.getBusStops);

/** 
 * @swagger
 * 
 * /oneStop:
 *  get: 
 *   summary: Get One Bus Stop 
 *   description: Get One bus Stop in system
 *   tags: 
 *      - BusStop
 *   parameters: 
 *   - in: body
 *     name: Bus Stop
 *     description: Show One bus Stop details
 *     schema: 
 *       type: object 
 *       properties:
 *        coordinates: 
 *         type: string
 *        sector: 
 *         type: string
 *        cell: 
 *         type: string
 *   responses:
 *    200: 
 *     description: List of One bus Stops
 */


router.get('/:busStopId',busStop.oneStop);
/** 
 * @swagger
 * 
 * /busStop:
 *  post: 
 *   summary: Create New Bus Stop 
 *   description: Create new bus Stop in system
 *   tags: 
 *      - BusStop
 *   parameters: 
 *   - in: body
 *     name: Bus Stop
 *     description: Enter bus Stop details
 *     schema: 
 *       type: object 
 *       properties:
 *        coordinates: 
 *         type: string
 *        sector: 
 *         type: string
 *        cell: 
 *         type: string
 *   responses:
 *    200: 
 *     description: Created Successfully
 */

router.post('/',busStop.createBusStop);

/** 
 * @swagger
 * 
 * /busStop:
 *  patch: 
 *   summary: Update one Bus Stop 
 *   description: Update One bus Stop in system
 *   tags: 
 *      - BusStop
 *   parameters: 
 *   - in: body
 *     name: Bus Stop
 *     description: Update bus Stop details
 *     schema: 
 *       type: object 
 *       properties:
 *        coordinates: 
 *         type: string
 *        sector: 
 *         type: string
 *        cell: 
 *         type: string
 *   responses:
 *    200: 
 *     description: Updated bus Stop
 */


router.patch('/:busStopId',busStop.updateBusStop);


/** 
 * @swagger
 * 
 * /busStop:
 *  delete: 
 *   summary: delete one Bus Stop 
 *   description: delete One bus Stop in system
 *   tags: 
 *      - BusStop
 *   parameters: 
 *   - in: body
 *     name: Bus Stop
 *     description: delete bus Stop details
 *     schema: 
 *       type: object 
 *       properties:
 *        coordinates: 
 *         type: string
 *        sector: 
 *         type: string
 *        cell: 
 *         type: string
 *   responses:
 *    200: 
 *     description: deleted bus Stop
 */


router.delete('/:busStopId', busStop.deleteBusStop);


export default router;
