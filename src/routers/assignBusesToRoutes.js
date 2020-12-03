import express from 'express';
import assign from '../controllers/assignBusesToRoutes';
import checkUser from '../middleware/checkUser';
import isOperator from '../middleware/isOperator';
import { validationBusesRoutes } from '../validations/assignmentBusesRoutes';
import findBus from '../middleware/findBus';
import findRoute from '../middleware/findRoute';

const router = express.Router();

/**
* @swagger
* /api/v1/assignment/{id}:
*   patch:
*     tags:
*       - Buses And Routes
*     name: Assignment
*     summary: Assign a bus to routes
*     produces:
*       - application/json
*     consumes:
*       - application/json
*     parameters:
*       - name: x-access-token
*         in: header
*         description: jwt token of the operator
*       - in: path
*         name: id
*         required: true
*         type: integer
*         description: Enter the id of the bus
*     requestBody:
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               routeID:
*                 type: integer
*     responses:
*       '201':
*             description: The bus was assign to a route successfully.
*       '400':
*             description: Bad request.
* */

router.patch('/assignment/:id', checkUser, isOperator, validationBusesRoutes, findBus, findRoute, assign.assignRoute);

/**
* @swagger
* /api/v1/assignment?page={page}&limit={limit}:
*   get:
*     tags:
*       - Buses And Routes
*     name: Assignment
*     summary: Assigned buses to routes
*     produces:
*       - application/json
*     consumes:
*       - application/json
*     parameters:
*       - name: x-access-token
*         in: header
*         description: jwt token of the operator
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
*             description: The assigned bus(es) are successfully found.
*       '404':
*             description: No assigned bus(es) found.
* */

router.get('/assignment', checkUser, isOperator, assign.busesAssignedToRoutes);

export default router;
