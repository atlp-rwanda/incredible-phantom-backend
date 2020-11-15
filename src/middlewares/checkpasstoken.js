import redisClient from '../configs/redisClient';
import Models from '../database/models';
import errorRes from '../helpers/successHandler';

const { User } = Models;

export default async (req, res, next) => {
  try {
    const { token } = req.params;
    if (!token) errorRes(res, 404, res.__('No token received'));

    redisClient.get(token, async (err, reply) => {
      if (err || !reply) {
        return errorRes(res, 401, res.__('No user found with that token'));
      }
      const user = await User.findOne({ where: { id: reply } });

      if (!user) {
        return errorRes(res, 401, res.__('User not found in the database '));
      }
      req.user = user;
      req.user.token = token;
      return next();
    });
  } catch (error) {
    return errorRes(res, 401, res.__('Not authorized, check your token'));
  }
};
