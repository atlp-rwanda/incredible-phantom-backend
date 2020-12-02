import { Router } from 'express';
import route from '../controllers/route';

const router = Router();


/** 
 * @swagger
 * 
 * /route:
 *  post: 
 *   summary: create a new Route  
 *   description: Creating a new Route in system
 *   tags: 
 *      - Routes
 *   parameters: 
 *   - in: body
 *     name: Routes
 *     description: Show a created Route details
 *     schema: 
 *       type: object 
 *       properties:
 *        origin: 
 *         type: string
 *        destination: 
 *         type: string
 *        distance: 
 *         type: string
 *         routeID:
 *          type: integer
 *         busStops:
 *          type: string
 *   responses:
 *    200: 
 *     description: Route created
 */

router.post('/' , route.createRoute);

/** 
 * @swagger
 * 
 * /route:
 *  get: 
 *   summary: Get all Routes
 *   description: Get all Routes in system
 *   tags: 
 *      - Routes
 *   parameters: 
 *   - in: body
 *     name: Routes
 *     description: Show All the Routes details
 *     schema: 
 *       type: object 
 *       properties:
 *        origin: 
 *         type: string
 *        destination: 
 *         type: string
 *        distance: 
 *         type: string
 *         routeID:
 *          type: integer
 *         busStops:
 *          type: Array
 *   responses:
 *    200: 
 *     description: List of all Routes
 */

router.get('/' , route.getRoute);

/** 
 * @swagger
 * 
 * /route:
 *  get: 
 *   summary: Get One Route  
 *   description: Get One Route in system
 *   tags: 
 *      - Routes
 *   parameters: 
 *   - in: body
 *     name: Routes
 *     description: Show A Routes details
 *     schema: 
 *       type: object 
 *       properties:
 *        origin: 
 *         type: string
 *        destination: 
 *         type: string
 *        distance: 
 *         type: string
 *         routeID:
 *          type: integer
 *         busStops:
 *          type: Array
 *   responses:
 *    200: 
 *     description: this one of the Routes
 */

router.get('/:routeID' , route.oneRoute);


/** 
 * @swagger
 * 
 * /route:
 *  patch: 
 *   summary: Update a Route  
 *   description: Updating a Route in system
 *   tags: 
 *      - Routes
 *   parameters: 
 *   - in: body
 *     name: Routes
 *     description: Show one Route details
 *     schema: 
 *       type: object 
 *       properties:
 *        origin: 
 *         type: string
 *        destination: 
 *         type: string
 *        distance: 
 *         type: string
 *         routeID:
 *          type: integer
 *         busStops:
 *          type: string
 *   responses:
 *    200: 
 *     description: Updated route
 */

router.patch('/:routeID', route.updateRoute);


/** 
 * @swagger
 * 
 * /route:
 *  delete: 
 *   summary: Delete a Route  
 *   description: Deleting a Route in system
 *   tags: 
 *      - Routes
 *   parameters: 
 *   - in: body
 *     name: Routes
 *     description: delete one Route details
 *     schema: 
 *       type: object 
 *       properties:
 *        origin: 
 *         type: string
 *        destination: 
 *         type: string
 *        distance: 
 *         type: string
 *         routeID:
 *          type: integer
 *         busStops:
 *          type: Array
 *   responses:
 *    200: 
 *     description: Deleted route
 */
router.patch('/:routeID/addBusStop' , route.addBusStop);
router.delete('/:routeID' , route.deleteRoute);

export default router;