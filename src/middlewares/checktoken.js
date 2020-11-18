import jwt from 'jsonwebtoken';
import errorRes from '../helpers/errorHandler';
import Models from '../database/models';

const { User } = Models;
export default async (req, res, next) => {
  try {
    const token = req.headers.auth?.split(' ')[1];

    if (!token) return errorRes(res, 401, 'Please login first');

    const decoded = jwt.verify(token, process.env.JWT_KEY);

    if (!decoded) return errorRes('Unauthorized');

    const user = await User.findOne({ where: { id: decoded.id } });

    if (!user) return errorRes(res, 404, 'User Not Authorized');
    req.user = decoded;

    return next();
  } catch (error) {
    return errorRes(res, 401, 'Not Authorized');
  }
};
