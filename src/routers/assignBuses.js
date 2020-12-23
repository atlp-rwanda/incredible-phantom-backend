import express from 'express';
import {
  assignBusToRoute,
  unAssignBusToRoute
} from '../controllers/assignBusesToRoute';
import checktoken from '../middlewares/checktoken';
import {
  isNotDriver,
  validateAssignBusToRouteInputs
} from '../middlewares/validator';

const router = express.Router();
/**
 * @swagger
 * /api/assignBusToRoute/{routeID}:
 *   post:
 *     tags:
 *       - Assign buses to routes
 *     name: assignBusToRoute
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
 *         name: routeID
 *         required: true
 *         type: integer
 *         description: Enter the routeID
 *       - in: query
 *         name: lang
 *         schema:
 *          type: string
 *          description: Your preferred language
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               busId:
 *                 type: integer
 *     responses:
 *       '200':
 *             description: The bus was assigned to a route successfully.
 *       '404':
 *             description: not found bus or route.
 *       '400':
 *             description: Validation error.
 * */

router.post(
  '/:routeID',
  checktoken,
  isNotDriver,
  validateAssignBusToRouteInputs,
  assignBusToRoute
);

/**
 * @swagger
 * /api/assignBusToRoute/{routeID}:
 *   delete:
 *     tags:
 *       - Assign buses to routes
 *     name: assignBusToRoute
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
 *         name: routeID
 *         required: true
 *         type: integer
 *         description: Enter the routeID
 *       - in: query
 *         name: lang
 *         schema:
 *          type: string
 *          description: Your preferred language
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               busId:
 *                 type: integer
 *     responses:
 *       '200':
 *             description: The bus was assigned to a route successfully.
 *       '404':
 *             description: not found bus or route.
 *       '400':
 *             description: Validation error.
 * */

router.delete(
  '/:routeID',
  checktoken,
  isNotDriver,
  validateAssignBusToRouteInputs,
  unAssignBusToRoute
);

export default router;
