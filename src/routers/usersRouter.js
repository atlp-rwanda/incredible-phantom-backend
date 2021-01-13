import { Router } from 'express';
import {
  register,
  getAll,
  signin,
  verifyAccount,
  forgotPassword,
  resetPassword,
  logout,
  updateProfile,
  allNotifications,
  readOneNotification,
  deleteNotification,
  getOne,
  deleteOne
} from '../controllers/usersController';
import checktoken from '../middlewares/checktoken';
import {
  isNotDriver,
  validateRegisterInput,
  validateUpdateInput
} from '../middlewares/validator';
import checkTokenreset from '../middlewares/checkpasstoken';
import {
  assignDriverToBus,
  driversAssignedTobus,
  unAssignDriverToBus
} from '../controllers/assignDriverTobusController';
import checkOwner from '../middlewares/checkOwnerToken';
const userRouter = Router();
userRouter.route('/reset').patch(checktoken, resetPassword);
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
 * /api/users/update/{id}:
 *   patch:
 *     tags:
 *       - Users
 *     name: Update
 *     summary: Update User Profile
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: auth
 *         in: header
 *         description: The token you get after signin
 *       - name: id
 *         in: path
 *         description: The id of user
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
 *               phone:
 *                 type: string
 *               language:
 *                 type: string
 *               role:
 *                 type: string
 *
 *     responses:
 *       '200':
 *             description: Updated User .
 *
 *       '500':
 *             description: There was an error while updating the User
 * */
userRouter.patch('/update/:id', checktoken, validateUpdateInput, updateProfile);

/**
 * @swagger
 * /api/users/{driverId}/assignToBus:
 *   patch:
 *     tags:
 *       - Assignments
 *     name: Assign Driver to Bus
 *     summary: Assigning drivers to buses
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: driverId
 *         in: path
 *         description: Id of driver
 *       - name: auth
 *         in: header
 *         description: Token you get after signin
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               busId:
 *                  type: integer
 *     responses:
 *       '200':
 *             description: Driver assigned to bus successfully.
 *       '404':
 *             description: User not found or not authorized
 *       '500':
 *             description: There was an error while assigning driver to bus
 * */

userRouter.patch(
  '/:driverId/assignToBus',
  checktoken,
  isNotDriver,
  assignDriverToBus
);

/**
 * @swagger
 * /api/users/{driverId}/unassignToBus:
 *   patch:
 *     tags:
 *       - Assignments
 *     name: Unassign Driver to Bus
 *     summary: Unassigning drivers to buses
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: driverId
 *         in: path
 *         description: Id of driver
 *       - name: auth
 *         in: header
 *         description: Token you get after signin
 *     responses:
 *       '200':
 *             description: Driver Unassigned to bus successfully.
 *       '404':
 *             description: User not found or not authorized
 *       '500':
 *             description: There was an error while Unassigning driver to bus
 * */

userRouter.patch(
  '/:driverId/unAssignToBus',
  checktoken,
  isNotDriver,
  unAssignDriverToBus
);

/**
 * @swagger
 * /api/users/driversAssignedToBuses:
 *   get:
 *     tags:
 *       - Assignments
 *     name: Get drivers at work
 *     summary: Getting all drivers who are assigned to a certain bus
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
 *             description:  drivers fetched successfully.
 *       '401':
 *             description: Unauthorized.
 *       '500':
 *             description: There was an error while getting Drivers.
 * */

userRouter.get(
  '/driversAssignedToBuses',
  checktoken,
  isNotDriver,
  driversAssignedTobus
);

/**
 * @swagger
 * /api/users/notifications:
 *   get:
 *     tags:
 *       - Users
 *     name: Get all notifications
 *     summary: Getting all notifcations
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
 *             description:  all notification fetched successfully.
 *       '401':
 *             description: Unauthorized.
 *       '500':
 *             description: There was an error while getting All notifications.
 * */
userRouter.get('/notifications', checktoken, allNotifications);

/**
 * @swagger
 * /api/users/notifications/{notificationId}:
 *   get:
 *     tags:
 *       - Users
 *     name: Get one notification
 *     summary: Getting one notifcation
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
 *       - name: notificationId
 *         in: path
 *         description: Id of notification
 *         required: true
 *         type: integer
 *     responses:
 *       '200':
 *             description: Notification fetched successfully.
 *       '401':
 *             description: Unauthorized.
 *       '500':
 *             description: There was an error while getting Notifications.
 * */

userRouter.get(
  '/notifications/:notificationId',
  checktoken,
  readOneNotification
);

/**
 * @swagger
 * /api/users/notifications/{notificationId}:
 *   delete:
 *     tags:
 *       - Users
 *     name: Delete  notification
 *     summary: Delete one notifcation
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
 *       - name: notificationId
 *         in: path
 *         description: Id of notification
 *         required: true
 *         type: string
 *     responses:
 *       '200':
 *             description: Notification Deleted successfully.
 *       '401':
 *             description: Unauthorized.
 *       '500':
 *             description: There was an error while deleting Notifications.
 * */

userRouter.delete(
  '/notifications/:notificationId',
  checktoken,
  deleteNotification
);

/**
 * @swagger
 *
 * /api/users/{userID}:
 *  delete:
 *   summary: Deleting a user(admin and operator are allowed only)
 *   description: This DELETE request deletes a user from the system permanently
 *   tags:
 *      - Users
 *   parameters:
 *    - in: header
 *      name: auth
 *      required: true
 *      type: string
 *      description: Enter Authorization token
 *    - in: path
 *      name: userID
 *      required: true
 *      type: string
 *      description: Enter User ID to delete
 *    - in: query
 *      name: lang
 *      schema:
 *        type: string
 *      description: Your preferred language
 *   responses:
 *    200:
 *     description: User deleted successfully
 *    404:
 *     description: User not found :(
 *    500:
 *     description: Internal server error
 */

userRouter.delete('/:userId', [checktoken, isNotDriver, checkOwner], deleteOne);

/**
 * @swagger
 *
 * /api/users/{userID}:
 *  get:
 *    summary: Getting one user
 *    description: This GET request retrieves one user based on the assigned ID
 *    tags:
 *    - Users
 *    parameters:
 *    - name: auth
 *      in: header
 *      description: Token you get after signin
 *    - in: path
 *      name: userID
 *      required: true
 *      type: integer
 *      description: Enter user ID
 *    - in: query
 *      name: lang
 *      schema:
 *      type: string
 *      description: Your preferred language
 *    responses:
 *     200:
 *      description: One User
 *     404:
 *      description: User not found :(
 *     500:
 *      description:  Internal server error
 */

userRouter.get('/:userId', [checktoken, checkOwner], getOne);

export default userRouter;
