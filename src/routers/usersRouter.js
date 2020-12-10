import { Router } from 'express';
import {
  register,
  getAll,
  signin,
  verifyAccount,
  forgotPassword,
  resetPassword
} from '../controllers/usersController';
import checktoken from '../middlewares/checkpasstoken';
import { isNotDriver, validateRegisterInput } from '../middlewares/validator';

const userRouter = Router();
/** 
 * @swagger
 * 
 * /forgot:
 *  post: 
 *   summary: forgot password 
 *   description: creating a new password
 *   tags: 
 *      - forgot password
 *   parameters: 
 *   - in: body
 *     name: password
 *     description: Enter your email
 *     schema: 
 *       type: object 
 *       properties:
 *        email: 
 *         type: string 
 *   responses:
 *    200: 
 *     description: link sent in your email
 */
userRouter.route('/forgot').post(forgotPassword);
/** 
 * @swagger
 * 
 * /reset:
 *  patch: 
 *   summary: reset password 
 *   description: creating a new password
 *   tags: 
 *      - reset password
 *   parameters: 
 *   - in: body
 *     name: password
 *     description: Enter your email and password
 *     schema: 
 *       type: object 
 *       properties:
 *        email: 
 *         type: string 
 *        password:
 *         type: string
 *   responses:
 *    200: 
 *     description: pasword updated successful
 */
userRouter.route('/reset').patch(checktoken,resetPassword);
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
 *       - name: auth
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
 *         description: The id of user
 *     responses:
 *       '200':
 *             description: Verified your email successfully .
 *       '404':
 *             description: User not found
 *       '500':
 *             description: There was an error while comfirming your account
 * */

userRouter.put('/verify/:id', verifyAccount);

export default userRouter;
