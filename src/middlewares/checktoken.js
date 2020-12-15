/* eslint-disable consistent-return */
import redisClient from '../configs/redisClient';
import errorRes from '../helpers/errorHandler';
import Models from '../database/models';

const { User } = Models;
export default async (req, res, next) => {
  try {
    const token = req.headers.auth.split(' ')[1];

    if (!token) {
      return errorRes(
        res,
        401,
        res.__('Please login first or check the token you are sending.'),
      );
    }

    redisClient.get(token, async (err, reply) => {
      if (err || !reply) {
        return errorRes(
          res,
          401,
          res.__('You are not allowed. Check Your token'),
        );
      }
      const user = await User.findOne({ where: { id: reply } });

      if (!user) {
        return errorRes(res, 401, res.__('User not found in the database '));
      }
      req.user = user;
      return next();
    });
  } catch (error) {
    return errorRes(res, 401, res.__('Not authorized. No token provided'));
  }
};
