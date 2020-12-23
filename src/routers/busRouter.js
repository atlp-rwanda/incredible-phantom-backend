import { Router } from 'express';
import {
  createBus,
  getBus,
  getOneBus,
  updateBus,
  deleteBus
} from '../controllers/busControllers';
import checkToken from '../middlewares/checktoken';
import { viewListOfBuses } from '../controllers/busesOnRouteContoller';
import { isNotDriver, validateBusInput } from '../middlewares/validator';
const busRouter = Router();
/**
 * @swagger
 *
 * /api/bus:
 *  post:
 *   summary: Create new Bus
 *   description: Create a new Bus in the system
 *   produces:
 *      - application/json
 *   consumes:
 *      - application/json
 *   tags:
 *      - Bus
 *   parameters:
 *       - name: auth
 *         in : header
 *       - in: query
 *         name: lang
 *   requestBody:
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             brand:
 *               type: string
 *             plateNo:
 *               type: string
 *             driver:
 *               type: string
 *             seats:
 *               type: integer
 *   responses:
 *    201:
 *     description: Bus created successfully
 *    400:
 *     description: Bus already exists in the system.
 *    500:
 *     description:  Internal server error
 */
busRouter.post('/', validateBusInput, checkToken, isNotDriver, createBus);

/**
 * @swagger
 * /api/bus:
 *   get:
 *     summary: Get Buses information
 *     tags:
 *       - Bus
 *     name: Retrieve all Buses
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: lang
 *     responses:
 *       '200':
 *             description: Buses found successfully.
 *       '400':
 *             description: error .
 *     500:
 *      description:  Internal server error
 */
busRouter.get('/', getBus);

/**
 * @swagger
 * /api/bus/busesOnRoute?origin=value&destination=value:
 *   get:
 *     summary: Get Bus list on a Specific route
 *     tags:
 *       - Bus
 *     parameters:
 *         - in: query
 *           name: origin
 *           required: true
 *         - in: query
 *           name: destination
 *           required: true
 *         - in: query
 *           name: lang
 *           schema:
 *           type: string
 *           description: Your preferred language
 *     name: Retrieve all Buses on a Specific route
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     responses:
 *       '200':
 *             description: Buses found successfully.
 *       '404':
 *             description: no Bus available for this route .
 */
busRouter.get('/busesOnRoute', viewListOfBuses);

/**
 * @swagger
 *
 * /api/bus/{id}:
 *  get:
 *    summary: View Bus's information
 *    description: Get Bus's Info
 *    tags:
 *    - Bus
 *    parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      type: integer
 *    - in: query
 *      name: lang
 *      description: Enter bus id
 *    responses:
 *     200:
 *      description: Bus found
 *     404:
 *      description: There are no buses registered in the system
 *     500:
 *      description:  Internal server error
 */
busRouter.get('/:id', getOneBus);

/**
 * @swagger
 *
 * /api/bus/{id}:
 *  patch:
 *    summary: update existing bus
 *    description: Update bus in system
 *    tags:
 *    - Bus
 *    parameters:
 *    - name: auth
 *      in : header
 *    - in: path
 *      name: id
 *      required: true
 *      type: integer
 *      description: Enter bus id
 *    - in: query
 *      name: lang
 *    requestBody:
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             brand:
 *               type: string
 *             plateNo:
 *               type: string
 *             driver:
 *               type: string
 *             seats:
 *               type: integer
 *    responses:
 *     200:
 *      description: Bus updated successfully
 *     404:
 *      description: Bus not found
 *     500:
 *      description:  Internal server error
 */
busRouter.patch('/:id', checkToken, isNotDriver, updateBus);
/**
 * @swagger
 * /api/bus/{id}:
 *  delete:
 *    summary: delete existing bus
 *    description: delete bus
 *    tags:
 *    - Bus
 *    parameters:
 *    - name: auth
 *      in : header
 *    - in: path
 *      name: id
 *      required: true
 *      type: integer
 *      description: Enter bus id
 *    - in: query
 *      name: lang
 *    responses:
 *     201:
 *      description: Delete Successfully
 *     404:
 *      description: Bus not registered in the system
 *     500:
 *      description:  Internal server error
 */
busRouter.delete('/:id', checkToken, isNotDriver, deleteBus);
export default busRouter;
