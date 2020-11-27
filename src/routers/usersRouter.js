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
userRouter.route('/reset').patch(checkToken,resetPassword);
   
userRouter.post('/signin', signin);
userRouter.post('/verify', verifyAccount);
export default userRouter;
