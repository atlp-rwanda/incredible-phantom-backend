import { Router } from 'express';
import route from '../controllers/route';
import checktoken from '../middlewares/checktoken'
import { isNotDriver } from '../middlewares/validator'

const router = Router();


/**
 * @swagger
 * /api/route:
 *   post:
 *     tags:
 *       - Routes
 *     name: Register
 *     summary: Registering routes(admin and operator are allowed only)
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: auth
 *         in: header
 *         description: Token you get after signin
 *       - in: query
 *         name: lang
 *         schema:
 *          type: string
 *         description: Your preferred language   
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               origin:
 *                 type: string
 *               destination:
 *                 type: string
 *               distance:
 *                 type: string
 *     responses:
 *       '201':
 *             description: route created successfully.
 *       '401':
 *             description: Unauthorized.
 *       '500':
 *             description: There was an error while creating the route.
 * */

router.post('/' , checktoken , isNotDriver ,  route.createRoute);

/** 
 * @swagger
 * 
 * /api/route:
 *  get: 
 *   summary: All routes
 *   description: This GET request retrieves all the routes in the system
 *   tags: 
 *      - Routes
 *   parameters: 
 *   - in: header
 *     name: auth
 *     required: true
 *     type: string
 *     description: Enter Authorization token
 *   - in: query
 *     name: lang
 *     schema:
 *         type: string
 *     description: Your preferred language   
 *   responses:
 *    200: 
 *     description: List of all Routes
 *    404:
 *     description: No created routes, Please add one!
 *    500:
 *     description: Internal server error
 */

router.get('/' , checktoken , route.getRoute);
/** 
 * @swagger
 * 
 * /api/route/{routeID}:
 *  get: 
 *    summary: One route
 *    description: This GET request retrieves one route based on the assigned ID
 *    tags:
 *    - Routes
 *    parameters:
 *    - in: header
 *      name: auth
 *      required: true
 *      type: string
 *      description: Enter Authorization token
 *    - in: path
 *      name: routeID
 *      required: true
 *      type: integer
 *      description: Enter route ID
 *    - in: query
 *      name: lang
 *      schema:
 *       type: string
 *      description: Your preferred language   
 *    responses: 
 *     200: 
 *      description: One route
 *     404:
 *      description: Route not found :(
 *     500:
 *      description:  Internal server error
 */

router.get('/:routeID' , checktoken , route.oneRoute);

/**
 * @swagger
 * /api/route/{routeID}:
 *   patch:
 *     tags:
 *       - Routes
 *     name: Update
 *     summary: Updating routes(admin and operator are allowed only)
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: auth
 *         in: header
 *         description: Token you get after signin
 *       - name: routeID
 *         in: path
 *         description: The id of the route you want to update
 *       - in: query
 *         name: lang
 *         schema:
 *          type: string
 *         description: Your preferred language   
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               origin:
 *                 type: string
 *               destination:
 *                 type: string
 *               distance:
 *                 type: string
 *     responses:
 *       '201':
 *             description: Route updated successfully.
 *       '404':
 *             description: Route not found.
 *       '500':
 *             description: There was an error while creating the route.
 * */


router.patch('/:routeID', checktoken , isNotDriver , route.updateRoute);


/** 
 * @swagger
 * 
 * /api/route/{routeID}:
 *  delete: 
 *   summary: Delete route
 *   description: This DELETE request deletes a route from the system permanently
 *   tags: 
 *      - Routes
 *   parameters:
 *    - in: header
 *      name: auth
 *      required: true
 *      type: string
 *      description: Enter Authorization token
 *    - in: path
 *      name: routeID
 *      required: true
 *      type: string
 *      description: Enter route ID to delete
 *    - in: query
 *      name: lang
 *      schema:
 *        type: string
 *      description: Your preferred language   
 *   responses:
 *    200: 
 *     description: Route deleted successfully
 *    404:
 *     description: Route not found :(
 *    500:
 *     description: Internal server error
 */

router.delete('/:routeID' , checktoken , isNotDriver , route.deleteRoute);

/** 
 * @swagger
 * 
 * /api/route/{routeID}/addBusStop/:
 *  patch: 
 *   summary: Add bus stop  
 *   description: This PATCH request adds a bus stop by ID to route with its corresponding ID
 *   tags: 
 *      - Routes
 *   parameters:
 *    - in: header
 *      name: auth
 *      required: true
 *      type: string
 *      description: Enter Authorization token
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
 *    - in: query
 *      name: lang
 *      schema:
 *       type: string
 *      description: Your preferred language   
 *   responses:
 *    200: 
 *     description: Bus stop added to route successfully
 *    404: 
 *     description: One of the Entered credentials is not found
 *    500:
 *     description: Internal server error
 */

router.patch('/:routeID/addBusStop' , checktoken , isNotDriver ,  route.addBusStop);

export default router;