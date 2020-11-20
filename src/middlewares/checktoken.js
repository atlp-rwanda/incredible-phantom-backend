import jwt from 'jsonwebtoken';
import errorRes from '../helpers/errorHandler';

export default (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.Data = decoded;
    return next();
  } catch (error) {
    console.log(error);
    return errorRes(res, 401, 'Not Authorized');
  }
};
