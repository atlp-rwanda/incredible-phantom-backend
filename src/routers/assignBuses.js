import express from 'express';
import {
  assignBusToRoute,
  allBusesOnRoute,
  unAssignBusToRoute,
} from '../controllers/assignBusesToRoute';
import checktoken from '../middlewares/checktoken';
import { isNotDriver } from '../middlewares/validator';

const router = express.Router();
/**
 * @swagger
 * /api/assignments/{busId}:
 *   patch:
 *     tags:
 *       - Assign buses to routes
 *     name: Assignments
 *     summary: Assign a bus to routes
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: auth
 *         in: header
 *         description: token after signin
 *       - in: path
 *         name: busId
 *         required: true
 *         type: integer
 *         description: Enter the id of the Bus
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               routeID:
 *                 type: integer
 *     responses:
 *       '200':
 *             description: The bus was assigned to a route successfully.
 *       '404':
 *             description: not found bus or route.
 * */

router.patch('/:busId', checktoken, assignBusToRoute);

/**
 * @swagger
 * /api/assignments?page={page}&limit={limit}:
 *   get:
 *     tags:
 *       - Assign buses to routes
 *     name: Assignments
 *     summary: Assigned buses to routes
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: auth
 *         in: header
 *         description: token after signin
 *       - in: path
 *         name: page
 *         required: true
 *         type: integer
 *         default: 1
 *         description: Enter page number
 *       - in: path
 *         name: limit
 *         required: true
 *         type: integer
 *         default: 5
 *         description: Put in here the limit number of assignmment
 *     responses:
 *       '200':
 *             description: The assigned buses are successfully found.
 *       '404':
 *             description: No assigned buses found.
 * */

router.get('/', checktoken, isNotDriver, allBusesOnRoute);

/**
 * @swagger
 * /api/assignments/unAssignBusToRoute/{busId}:
 *   patch:
 *     tags:
 *       - Assign buses to routes
 *     name: unAssignments
 *     summary: unAssign a bus to routes
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: auth
 *         in: header
 *         description: token after signin
 *       - in: path
 *         name: busId
 *         required: true
 *         type: integer
 *         description: Enter the id of the Bus
 *     responses:
 *       '200':
 *             description: The bus was unassigned to a route successfully.
 *       '404':
 *             description: not found bus or route.
 * */

router.patch('/unAssignBusToRoute/:busId', checktoken, unAssignBusToRoute);

export default router;
