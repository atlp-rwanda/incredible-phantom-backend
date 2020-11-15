import { Router } from 'express';
import {
  createRoute,
  getRoute,
  oneRoute,
  updateRoute,
  deleteRoute,
  addBusStop,
} from '../controllers/route';
import checktoken from '../middlewares/checktoken';
import { isNotDriver, validateRouteInput } from '../middlewares/validator';

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

router.post('/', checktoken, validateRouteInput, isNotDriver, createRoute);

/**
 * @swagger
 *
 * /api/route?page={page}&limit={limit}:
 *  get:
 *   summary: Getting all routes (admin and operator are allowed only)
 *   description: This GET request retrieves all the routes in the system
 *   tags:
 *      - Routes
 *   parameters:
 *      - name: auth
 *        in: header
 *        description: token after signin
 *      - in: query
 *        name: page
 *        required: true
 *        type: integer
 *        default: 1
 *        description: Enter page number
 *      - in: query
 *        name: limit
 *        required: true
 *        type: integer
 *        default: 5
 *        description: Put in here the limit number of routes
 *      - in: query
 *        name: lang
 *        schema:
 *          type: string
 *          description: Your preferred language
 *   responses:
 *    200:
 *     description: List of all Routes
 *    404:
 *     description: No created routes, Please add one!
 *    500:
 *     description: Internal server error
 */

router.get('/', checktoken, getRoute);
/**
 * @swagger
 *
 * /api/route/{routeID}:
 *  get:
 *    summary: Getting one route(admin and operator are allowed only)
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

router.get('/:routeID', checktoken, oneRoute);

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

router.patch('/:routeID', checktoken, isNotDriver, updateRoute);

/**
 * @swagger
 *
 * /api/route/{routeID}:
 *  delete:
 *   summary: Deleting a route(admin and operator are allowed only)
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

router.delete('/:routeID', checktoken, isNotDriver, deleteRoute);

/**
 * @swagger
 *
 * /api/route/{routeID}/addBusStop:
 *  patch:
 *   summary: Adding a bus stop to a route(admin and operator are allowed only)
 *   description: This PATCH request adds a bus stop to route
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
 *      description: Enter route ID
 *    - in: query
 *      name: lang
 *      schema:
 *        type: string
 *      description: Your preferred language
 *   requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               busStopId:
 *                 type: integer
 *   responses:
 *    200:
 *     description: Bus stop added to route successfully
 *    404:
 *     description: Bus stop not found or route not found
 *    400:
 *     description: Bus stop already exists on that route
 *    500:
 *     description: Internal server error
 */

router.patch('/:routeID/addBusStop', checktoken, isNotDriver, addBusStop);

export default router;
