import { Router } from 'express';
import {
  register,
  getAll,
  signin,
  verifyAccount,
  forgotPassword,
  resetPassword
} from '../controllers/usersController';
import checkToken from '../middlewares/checktoken';

const userRouter = Router();

userRouter.route('/').post(register).get(getAll);
userRouter.route('/forgot').post(forgotPassword);
/** 
 * @swagger
 * 
 * /forgot:
 *  post: 
 *   summary: forgot password 
 *   description: creating a new password
 *   tags: 
 *      - reset password
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

userRouter.route('/reset').patch(checkToken,resetPassword);

   
userRouter.post('/signin', signin);
userRouter.post('/verify', verifyAccount);
export default userRouter;
