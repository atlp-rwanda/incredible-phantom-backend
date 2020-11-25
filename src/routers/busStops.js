import busStop from '../controllers/busStop';
import { Router } from 'express';

const router = Router();

/** 
 * @swagger
 * 
 * /busStop:
 *  get: 
 *   summary: All bus stops
 *   description: This GET request retrieves all the bus stops in the system
 *   tags: 
 *      - BusStop
 *   responses:
 *    200: 
 *     description: All bus stops
 *    204:
 *     description: No bus stops found, Add one
 *    500:
 *     description: Internal Server Error
 */

router.get('/',busStop.getBusStops);

/** 
 * @swagger
 * 
 * /busStop/{busStopId}:
 *  get: 
 *    summary: View Bus's information
 *    description: Get Bus's Info
 *    tags:
 *    - BusStop
 *    parameters:
 *    - in: path
 *      name: busStopId
 *      required: true
 *      type: integer
 *      description: Enter bus stop id
 *    responses: 
 *     200: 
 *      description: One bus stop retrieved successfully!
 *     204:
 *      description: Bus stop not found :(
 *     500:
 *      description:  Internal Server error
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
 *     description: Bus stop created Successfully
 * 
 *    204:
 *      description: Bus stop already exists
 * 
 *    500:
 *      description: Bus Internal server error
 */

router.post('/',busStop.createBusStop);

/** 
 * @swagger
 * 
 * /busStop/{busStopId}:
 *  patch: 
 *    summary: update existing bus
 *    description: Return updated bus
 *    tags:
 *    - BusStop
 *    parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      type: integer
 *      description: Enter bus stop Id
 *    - in: body
 *      name: Bus Stop
 *      description: Enter bus stop update details details
 *      schema: 
 *       type: object 
 *       properties:
 *        coordinates: 
 *         type: string
 *        sector: 
 *         type: string
 *        cell: 
 *         type: string
 *    responses: 
 *     200: 
 *      description: updated Successfully
 *     204: 
 *      description: Bus stop you are trying to update is not found :(
 *     404:
 *      description: One of the bus stops has the same details
 *     500:
 *      description: Internal server error
 */


router.patch('/:busStopId',busStop.updateBusStop);


/** 
 * @swagger
 * 
 * /busStop/{busStopId}:
 *  delete: 
 *   summary: Delete Bus stop
 *   description: This DELETE request deletes a bus stop from the system
 *   tags: 
 *      - BusStop
 *   responses:
 *    200: 
 *     description: Bus stop deleted successfully
 *    404:
 *     description: Bus stop not found
 *    505:
 *     description: Internal server error
 */
router.delete('/:busStopId', busStop.deleteBusStop);


export default router;
