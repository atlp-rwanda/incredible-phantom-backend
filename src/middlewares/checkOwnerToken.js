import errorRes from '../helpers/successHandler';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();


export default async (req, res, next) => {
  try {
    const token = req.headers.auth.split(' ')[1];
    const info = jwt.decode(token, process.env.JWT_KEY);
    const userId = info.id;
    if (parseInt(req.params.userId) !== userId && req.user.role !== 'admin') {
      return errorRes(res, 401, res.__('Not allowed to perform this action'));
    }
    return next();
  } catch (error) {
    return errorRes(res, 401, res.__(error));
  }
};
