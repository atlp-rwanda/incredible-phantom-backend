import { Router } from 'express';
import {createBus,
    getBus,
    getOneBus,
    updateBus,
    deleteBus} from '../controllers/bus';
import checkToken from '../middlewares/checktoken'
import {isNotDriver} from '../middlewares/validator'

const router = Router();

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
 *   requestBody:
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             brand:
 *               type: string
 *             plate:
 *               type: string
 *             driver:
 *               type: string
 *             seats:
 *               type: integer
 *   responses:
 *    200: 
 *     description: Bus created successfully
 *    404:
 *     description: Bus already exists
 */
 
router.post('/api/bus' ,checkToken , isNotDriver,createBus);
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
 *     responses:
 *       '200':
 *             description: Buses found successfully.
 *       '400':
 *             description: error .
 */

router.get('/api/bus/',getBus);
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
 *      description: Enter bus id
 *    responses: 
 *     200: 
 *      description: Bus found 
 *     404:
 *      description: Bus not found 
 */
router.get('/api/bus/:id',getOneBus);
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
 *    requestBody:
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             brand:
 *               type: string
 *             plate:
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
 */

router.patch('/api/bus/:id',checkToken , isNotDriver, updateBus);

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
 *    responses: 
 *     200: 
 *      description: Delete Successfully
 */
router.delete('/api/bus/:id' ,checkToken , isNotDriver, deleteBus);

export default router;