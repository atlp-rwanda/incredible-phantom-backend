import { Router } from 'express';
import { register, getAll, signin } from '../controllers/usersController';

const userRouter = Router();

userRouter.route('/').post(register).get(getAll);
userRouter.post('/signin', signin);
export default userRouter;
