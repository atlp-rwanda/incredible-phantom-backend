import { Router } from 'express';
import {
  register,
  getAll,
  signin,
  verifyAccount,
  forgotPassword,
  resetPassword,
  logout,
} from '../controllers/usersController';
import checktoken from '../middlewares/checktoken';
import { isNotDriver, validateRegisterInput } from '../middlewares/validator';
import checkTokenreset from '../middlewares/checkpasstoken';

const userRouter = Router();
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
 *       - name: auth
 *         in: header
 *         description: Token you get after signin
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
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
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: auth
 *         in: header
 *         description: Token you get after signin
 *         required: true
 *         type: string
 *     responses:
 *       '200':
 *             description:  Users fetched successfully.
 *       '401':
 *             description: Unauthorized.
 *       '500':
 *             description: There was an error while getting Users.
 * */

userRouter
  .route('/')

  .post(checktoken, isNotDriver, validateRegisterInput, register)
  .get(checktoken, isNotDriver, getAll);

/**
 * @swagger
 * /api/users/signin:
 *   post:
 *     tags:
 *       - Users
 *     name: Signin
 *     summary:
 *     produces:
 *       - application/json
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *             description:  Signed in successfully
 *       '500':
 *             description: There was an error while signing in or incorrect password.
 * */

userRouter.route('/').post(register).get(getAll);
userRouter.route('/forgot').post(forgotPassword);
/**
 * @swagger
 * /api/users/forgot:
 *   post:
 *     tags:
 *       - Users
 *     name: forgot Password
 *     summary: Forgot password
 *     produces:
 *       - application/json
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *
 *     responses:
 *       '200':
 *             description:  check your Email!
 *       '500':
 *             description: error while requesting.
 * */
userRouter.route('/reset/:token').patch(checkTokenreset, resetPassword);
/**
 * @swagger
 * /api/users/reset/{token}:
 *   patch:
 *     tags:
 *       - Users
 *     name: reset Password
 *     summary: Reset password
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: token
 *         in: path
 *         description: Token from link without Bearer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                  type: string
 *     responses:
 *       '200':
 *             description:  Your Password is reseted Successfully
 *       '500':
 *             description: There was an error while reseting ypur password.
 * */

userRouter.post('/signin', signin);

/**
 * @swagger
 * /api/users/verify/{id}:
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
 *         description: Id of user
 *     responses:
 *       '200':
 *             description: Verified your email successfully .
 *       '404':
 *             description: User not found
 *       '500':
 *             description: There was an error while comfirming your account
 * */

userRouter.put('/verify/:id', verifyAccount);

/**
 * @swagger
 * /api/users/logout:
 *   post:
 *     tags:
 *       - Users
 *     name: Logout
 *     summary: Logout from account
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: auth
 *         in: header
 *         description: The token you get after signin
 *     responses:
 *       '200':
 *             description: Logged out successfully .
 *       '401':
 *             description: User not found
 *       '500':
 *             description: There was an error while logging out
 * */

userRouter.post('/logout', checktoken, logout);

/**
 * @swagger
 * /api/users/logout:
 *   post:
 *     tags:
 *       - Users
 *     name: Logout
 *     summary: Logout from account
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: auth
 *         in: header
 *         description: The token you get after signin
 *     responses:
 *       '200':
 *             description: Logged out successfully .
 *       '401':
 *             description: User not found
 *       '500':
 *             description: There was an error while logging out
 * */

userRouter.post('/logout', checktoken, logout);

/**
 * @swagger
 * /api/users/logout:
 *   post:
 *     tags:
 *       - Users
 *     name: Logout
 *     summary: Logout from account
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: auth
 *         in: header
 *         description: The token you get after signin
 *     responses:
 *       '200':
 *             description: Logged out successfully .
 *       '401':
 *             description: User not found
 *       '500':
 *             description: There was an error while logging out
 * */

userRouter.post('/logout', checktoken, logout);

export default userRouter;
