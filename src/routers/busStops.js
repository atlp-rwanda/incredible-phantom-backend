import { Router } from 'express';
import {
  createBusStop, getBusStops, oneStop, updateBusStop, deleteBusStop,
} from '../controllers/busStop';
import checktoken from '../middlewares/checktoken';
import { isNotDriver } from '../middlewares/validator';

const router = Router();

/**
 * @swagger
 *
 * /api/busStop:
 *  get:
 *   summary: All bus stops
 *   description: This GET request retrieves all the bus stops in the system
 *   tags:
 *      - BusStop
 *   parameters:
 *      - in: header
 *        name: auth
 *        required: true
 *        type: string
 *        description: Enter Authorization token
 *   responses:
 *    200:
 *     description: All bus stops
 *    204:
 *     description: No bus stops found, Add one
 *    500:
 *     description: Internal Server Error
 */

router.get('/', checktoken, getBusStops);

/**
 * @swagger
 *
 * /api/busStop/{busStopId}:
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
 *    - in: header
 *      name: auth
 *      required: true
 *      type: string
 *      description: Enter Authorization token
 *    responses:
 *     200:
 *      description: One bus stop retrieved successfully!
 *     204:
 *      description: Bus stop not found :(
 *     500:
 *      description:  Internal Server error
 */

router.get('/:busStopId', checktoken, oneStop);

/**
 * @swagger
 * /api/busStop:
 *   post:
 *     tags:
 *       - BusStop
 *     name: Register
 *     summary: Registering bus stop(admin and operator are allowed only)
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: auth
 *         in: header
 *         description: Token you get after signin
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sector:
 *                 type: string
 *               cell:
 *                 type: string
 *               coordinates:
 *                 type: string
 *     responses:
 *       '201':
 *             description: Bus stop created successfully.
 *       '401':
 *             description: Unauthorized.
 *       '500':
 *             description: There was an error while creating the bus stop.
 * */

router.post('/', checktoken, isNotDriver, createBusStop);

/**
 * @swagger
 * /api/busStop/{busStopId}:
 *   patch:
 *     tags:
 *       - BusStop
 *     name: Update
 *     summary: Updating bus stop(admin and operator are allowed only)
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: auth
 *         in: header
 *         description: Token you get after signin
 *       - name: busStopId
 *         in: path
 *         description: The id of the bus stop you want to update
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sector:
 *                 type: string
 *               cell:
 *                 type: string
 *               coordinates:
 *                 type: string
 *     responses:
 *       '201':
 *             description: bus stop updated successfully.
 *       '404':
 *             description: bus stop not found.
 *       '500':
 *             description: There was an error while creating the bus stop.
 * */

router.patch('/:busStopId', checktoken, isNotDriver, updateBusStop);

/**
 * @swagger
 *
 * /api/busStop/{busStopId}:
 *  delete:
 *   summary: Delete Bus stop
 *   description: This DELETE request deletes a bus stop from the system
 *   tags:
 *      - BusStop
 *   parameters:
 *      - in: header
 *        name: auth
 *        required: true
 *        type: string
 *        description: Enter Authorization token
 *      - in: path
 *        name: busStopId
 *        required: true
 *        type: string
 *        description: Enter the ID of the bus stop to delete
 *   responses:
 *    200:
 *     description: Bus stop deleted successfully
 *    404:
 *     description: Bus stop not found
 *    505:
 *     description: Internal server error
 */
router.delete('/:busStopId', checktoken, isNotDriver, deleteBusStop);

export default router;
