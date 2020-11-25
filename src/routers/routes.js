import { Router } from 'express';
import route from '../controllers/route';

const router = Router();


/** 
 * @swagger
 * 
 * /route:
 *  post: 
 *   summary: New Route  
 *   description: This POST request creates a new route in the system
 *   tags: 
 *      - Routes
 *   parameters: 
 *   - in: body
 *     name: Creating route
 *     description: Enter Route Keys and thier values
 *     schema: 
 *       type: object 
 *       properties:
 *        origin: 
 *         type: string
 *        destination: 
 *         type: string
 *        distance: 
 *         type: string
 *   responses:
 *    200: 
 *     description: Route created successfully
 *    404:
 *     description: Route already exists
 *    500:
 *     description: Internal server error
 */

router.post('/' , route.createRoute);

/** 
 * @swagger
 * 
 * /route:
 *  get: 
 *   summary: All routes
 *   description: This GET request retrieves all the routes in the system
 *   tags: 
 *      - Routes
 *   responses:
 *    200: 
 *     description: List of all Routes
 *    404:
 *     description: No created routes, Please add one!
 *    500:
 *     description: Internal server error
 */

router.get('/' , route.getRoute);
/** 
 * @swagger
 * 
 * /route/{routeID}:
 *  get: 
 *    summary: One route
 *    description: This GET request retrieves one route based on the assigned ID
 *    tags:
 *    - Routes
 *    parameters:
 *    - in: path
 *      name: routeID
 *      required: true
 *      type: integer
 *      description: Enter route ID
 *    responses: 
 *     200: 
 *      description: One route
 *     404:
 *      description: Route not found :(
 *     500:
 *      description:  Internal server error
 */

router.get('/:routeID' , route.oneRoute);

/** 
 * @swagger
 * 
 * /route/{routeID}:
 *  patch: 
 *    summary: Update route
 *    description: This PATCH request updates an existing route in the system
 *    tags:
 *    - Routes
 *    parameters:
 *    - in: path
 *      name: routeID
 *      required: true
 *      type: integer
 *      description: Enter route ID
 *    - in: body
 *      name: Route
 *      description: Enter route details
 *      schema: 
 *       type: object 
 *       properties:
 *        origin: 
 *         type: string
 *        destination: 
 *         type: string
 *        distance: 
 *         type: string
 *    responses: 
 *     200: 
 *      description: Route updated successfully
 *     404: 
 *      description: Route not found
 *    400:
 *      description: Another Route has the same information
 *    500:
 *      description: Internal server error
 */

router.patch('/:routeID', route.updateRoute);


/** 
 * @swagger
 * 
 * /route/{routeID}:
 *  delete: 
 *   summary: Delete route
 *   description: This DELETE request deletes a route from the system permanently
 *   tags: 
 *      - Routes
 *   responses:
 *    200: 
 *     description: Route deleted successfully
 *    404:
 *     description: Route not found :(
 *    500:
 *     description: Internal server error
 */

router.delete('/:routeID' , route.deleteRoute);

/** 
 * @swagger
 * 
 * /route/{routeID}/addBusStop/:
 *  patch: 
 *   summary: Add bus stop  
 *   description: This PATCH request adds a bus stop by ID to route with its corresponding ID
 *   tags: 
 *      - Routes
 *   parameters:
 *    - in: path
 *      name: routeID
 *      required: true
 *      type: integer
 *      description: Enter route ID
 *    - in: body
 *      name: busStopId
 *      description: Enter bus stop ID
 *      schema:
 *        type: object 
 *        properties:
 *          busStopId: 
 *            type: integer
 *   responses:
 *    200: 
 *     description: Bus stop added to route successfully
 *    404: 
 *     description: One of the Entered credentials is not found
 *    500:
 *     description: Internal server error
 */

router.patch('/:routeID/addBusStop' , route.addBusStop);

export default router;