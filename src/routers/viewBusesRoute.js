import { Router } from 'express';
import { viewListOfBuses } from '../controllers/busesOnRouteContoller';

const router = Router();

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
 *         - in: query
 *           name: destination
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
router.get('/', viewListOfBuses);

export default router;
