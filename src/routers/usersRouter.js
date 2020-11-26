import { Router } from 'express';
import {
  register,
  getAll,
  signin,
  verifyAccount,
} from '../controllers/usersController';

const userRouter = Router();

userRouter.route('/').post(register).get(getAll);
userRouter.route('/forgot_password');

userRouter.route('/reset_password').post(forgotPassword);
   
userRouter.post('/signin', signin);
userRouter.post('/verify', verifyAccount);
export default userRouter;
