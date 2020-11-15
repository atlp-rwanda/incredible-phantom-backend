import { Router } from 'express';
import {
  createRole,
  ReadRole,
  UpdateRole,
  DeleteRole,
} from '../controllers/RolesController';
import checkToken from '../middlewares/checktoken';
import { isNotDriver, isNotOperator } from '../middlewares/validator';

const rolesRouter = Router();

/**
 * @swagger
 * /api/roles:
 *   post:
 *     tags:
 *       - Roles
 *     name: Register
 *     summary: Registering Role(Admin is allowed only)
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
 *               role:
 *                 type: string
 *     responses:
 *       '201':
 *             description: Created Role successfully.
 *       '401':
 *             description: Unauthorized.
 *       '500':
 *             description: There was an error while registering a role.
 * */

/**
 * @swagger
 * /api/roles:
 *   get:
 *     tags:
 *       - Roles
 *     name: Get all
 *     summary: Getting all Role(Admin is allowed only)
 *     produces:
 *       - application/json

 *     parameters:
 *       - name: auth
 *         in: header
 *         description: Token you get after signin
 *     responses:
 *       '200':
 *             description:  Roles fetched successfully.
 *       '401':
 *             description: Unauthorized.
 *       '500':
 *             description: There was an error while getting roles.
 * */

rolesRouter
  .route('/')
  .post(checkToken, isNotOperator, isNotDriver, createRole)
  .get(checkToken, isNotOperator, isNotDriver, ReadRole);

/**
 * @swagger
 * /api/roles/{id}:
 *   patch:
 *     tags:
 *       - Roles
 *     name: Update
 *     summary: Update role (Admin is allowed only)
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Id of role
 *       - name: auth
 *         in : header
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *     responses:
 *       '200':
 *             description: Updated role successfully .
 *       '401':
 *             description: Unauthorized
 *       '500':
 *             description: There was an error while Updating role
 * */

/**
 * @swagger
 * /api/roles/{id}:
 *   delete:
 *     tags:
 *       - Roles
 *     name: Delete
 *     summary: Delete role (Admin is allowed only)
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Id of role
 *       - name: auth
 *         in : header
 *     responses:
 *       '200':
 *             description: Updated role successfully .
 *       '401':
 *             description: Unauthorized
 *       '500':
 *             description: There was an error while Updating role
 * */

rolesRouter
  .route('/:id')
  .patch(checkToken, isNotDriver, isNotDriver, UpdateRole)
  .delete(checkToken, isNotOperator, isNotDriver, DeleteRole);

export default rolesRouter;
