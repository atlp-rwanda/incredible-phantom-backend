import redisClient from '../configs/redisClient';
import errorRes from '../helpers/errorHandler';
import Models from '../database/models';

const { User } = Models;
export default async (req, res, next) => {
  try {
    const token = req.headers.auth?.split(' ')[1];

    if (!token) return errorRes(res, 401, 'Please login first');

    redisClient.get(token, async (err, reply) => {
      if (err || !reply) errorRes(res, 401, 'Not Authorized');
      const user = await User.findOne({ where: { id: reply } });

      if (!user) return errorRes(res, 404, 'User Not Authorized');
      req.user = user;
      return next();
    });
  } catch (error) {
    return errorRes(res, 401, 'Not Authorized');
  }
};
