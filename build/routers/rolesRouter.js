"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _RolesController = require("../controllers/RolesController");

var _checktoken = _interopRequireDefault(require("../middlewares/checktoken"));

var _validator = require("../middlewares/validator");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var rolesRouter = (0, _express.Router)();
/**
 * @swagger
 * /api/roles/register:
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
 *       - name: Authorization
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
 *       - name: Authorization
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

rolesRouter.route('/').post(_checktoken["default"], _validator.isNotOperator, _validator.isNotDriver, _RolesController.createRole).get(_checktoken["default"], _validator.isNotOperator, _validator.isNotDriver, _RolesController.ReadRole);
/**
 * @swagger
 * /api/roles/{roleId}:
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
 *         description: The id of admin
 *       - name: Authorization
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
 * /api/roles/{roleId}:
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
 *         description: The id of admin
 *       - name: Authorization
 *         in : header
 *     responses:
 *       '200':
 *             description: Updated role successfully .
 *       '401':
 *             description: Unauthorized
 *       '500':
 *             description: There was an error while Updating role
 * */

rolesRouter.route('/:id').patch(_checktoken["default"], _validator.isNotDriver, _validator.isNotDriver, _RolesController.UpdateRole)["delete"](_checktoken["default"], _validator.isNotOperator, _validator.isNotDriver, _RolesController.DeleteRole);
var _default = rolesRouter;
exports["default"] = _default;