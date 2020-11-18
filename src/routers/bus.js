import { Router } from 'express';
import {createBus,
    getBus,
    getOneBus,
    updateBus,
    deleteBus} from '../controllers/bus';
const router = Router();

/** 
 * @swagger
 * 
 * /bus:
 *  post: 
 *   summary: Create New Bus 
 *   description: Create new bus in system
 *   tags: 
 *      - Bus
 *   parameters: 
 *   - in: body
 *     name: Bus
 *     description: Enter bus details
 *     schema: 
 *       type: object 
 *       properties:
 *        brand: 
 *         type: string
 *        plate: 
 *         type: string
 *        driver: 
 *         type: string
 *   responses:
 *    200: 
 *     description: Created Successfully
 */
 
router.post('/bus' , createBus);
/**
 * @swagger
 * /bus:
 *   get:
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

router.get('/bus/' , getBus);
/** 
 * @swagger
 * 
 * /bus/{id}:
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
 *      description: Enquire Bus's info is Successfully
 *     404:
 *      description: Enquire Bus's that does not exist in system
 *     500:
 *      description:  Enquire Bus's info Fails 
 */
router.get('/bus/:id' , getOneBus);
/** 
 * @swagger
 * 
 * /bus/{id}:
 *  patch: 
 *    summary: update existing bus
 *    description: Return updated bus
 *    tags:
 *    - Bus
 *    parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      type: integer
 *      description: Enter bus id
 *    - in: body
 *      name: Bus
 *      description: Enter bus details
 *      schema: 
 *       type: object 
 *       properties:
 *        brand: 
 *         type: string
 *        plate: 
 *         type: string
 *        driver: 
 *         type: string
 *    responses: 
 *     200: 
 *      description: updated Successfully
 *     400: 
 *      description: Invalid Input
 *  delete: 
 *    summary: delete existing bus
 *    description: delete bus
 *    tags:
 *    - Bus
 *    parameters:
 *    - in: header
 *      name: Authorization
 *      required: true
 *      type: string
 *      description: token to authorize
 *    - in: path
 *      name: id
 *      required: true
 *      type: integer
 *      description: Enter bus id
 *    responses: 
 *     200: 
 *      description: Delete Successfully
 */

router.patch('/bus/:id', updateBus);

/**
 * @swagger
 * /bus/{id}:
 *  delete: 
 *    summary: delete existing bus
 *    description: delete bus
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
 *      description: Delete Successfully
 */
router.delete('/bus/:id' , deleteBus);

export default router;