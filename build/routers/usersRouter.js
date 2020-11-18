"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _usersController = require("../controllers/usersController");

var _checktoken = _interopRequireDefault(require("../middlewares/checktoken"));

var _validator = require("../middlewares/validator");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var userRouter = (0, _express.Router)();
/**
 * @swagger
 * /api/users:
 *   post:
 *     tags:
 *       - Users
 *     name: Register
 *     summary: Registering users(admin and operator are allowed only)
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
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               nationalId:
 *                 type: integer
 *               language:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       '201':
 *             description: Created User successfully.
 *       '401':
 *             description: Unauthorized.
 *       '500':
 *             description: There was an error while registering a user.
 * */

/**
 * @swagger
 * /api/users:
 *   get:
 *     tags:
 *       - Users
 *     name: Get all
 *     summary: Getting all Users(Admin  and operator are allowed only)
 *     produces:
 *       - application/json

 *     parameters:
 *       - name: Authorization
 *         in: header
 *         description: Token you get after signin
 *     responses:
 *       '200':
 *             description:  Users fetched successfully.
 *       '401':
 *             description: Unauthorized.
 *       '500':
 *             description: There was an error while getting Users.
 * */

userRouter.route('/').post(_checktoken["default"], _validator.isNotDriver, _validator.validateRegisterInput, _usersController.register).get(_checktoken["default"], _validator.isNotDriver, _usersController.getAll);
userRouter.post('/signin', _usersController.signin);
/**
 * @swagger
 * /api/users/verify/{userId}:
 *   put:
 *     tags:
 *       - Users
 *     name: Verifiy eamil
 *     summary: Verifiying user email after registration
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The id of user
 *     responses:
 *       '200':
 *             description: Verified your email successfully .
 *       '404':
 *             description: User not found
 *       '500':
 *             description: There was an error while comfirming your account
 * */

userRouter.put('/verify/:id', _usersController.verifyAccount);
var _default = userRouter;
exports["default"] = _default;