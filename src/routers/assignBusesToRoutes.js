import express from "express";
import {
  assignRoute,
  getAllBuses,
  getBusesByRoute,
  updateBuseRoute,
  deleteAssignedbus,
} from "../controllers/assignBusesToRoutes";
import checktoken from "../middlewares/checktoken";
import validator from "../middlewares/validator";

const router = express.Router();

/**
 * @swagger
 *
 * /assignment:
 *  post:
 *   summary: Create New bus assignment
 *   description: Create new assigned buses in system
 *   tags:
 *      - assignBuses and Route
 *   parameters:
 *   - in: body
 *     name: assignment
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
 *     description: bus assignment created Successfully
 */

router.post("/assignment", checktoken, assignRoute, validator);
/**
 * @swagger
 * /assignment:
 *   get:
 *     tags:
 *       - assignBuses and Route
 *     name: Retrieve all assigned buses
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     responses:
 *       '200':
 *             description: assignmed buses found successfully.
 *       '400':
 *             description: error .
 */

router.get("/assignment", checktoken, getAllBuses, updateBuseRoute, validator);
/**
 * @swagger
 *
 * /assignment
 *  get:
 *    summary: View all assigned buses
 *    description: Get assigned buses
 *    tags:
 *    - assignBuses and Route
 *    parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      type: integer
 *    responses:
 *     200:
 *      description: assigned buses found Successfully
 *     404:
 *      description: assigned buses  not found in the database
 */

router.get(
  "/assignment/id",
  checktoken,
  getBusesByRoute,
  updateBuseRoute,
  validator
);
/**
 * @swagger
 *
 * /assignment/{id}:
 *  get:
 *  summary: View all assigned buses
 *    description: Get assigned buses
 *    tags:
 *    - assignBuses and Route
 *    parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      type: integer
 *      description: Enter bus id
 *     responses:
 *     200:
 *      description: assigned bus found Successfully
 *     404:
 *      description: assigned bus not found in the database
 */

router.put("/assignment/id", updateBuseRoute, checktoken, validator);
/**
/assignment/{id}:
 *  patch: 
 *    summary: update existing bus assignment
 *    description: Return updated bus assignment
 *    tags:
 *    - assignBuses and Route
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
 */

router.delete("/assignment/id", deleteAssignedbus, checktoken, validator);
/**
 *  delete:
 *    summary: delete existing bus assignment
 *    description: delete bus assignment
 *    tags:
 *    - assignBuses and Route
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

export default router;
