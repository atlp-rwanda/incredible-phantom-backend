import errorRes from '../helpers/successHandler';
import RegisterValidator from '../validators/userValidator';
import Models from '../database/models';

const { User } = Models;
export const validateRegisterInput = (req, res, next) => {
  const { error } = RegisterValidator.validate(req.body);
  if (error) {
    return errorRes(res, 500, 'Validation error', validateRegisterInput.error);
  }
  return next();
};
export const isNotDriver = async (req, res, next) => {
  const signedInUser = req.user;
  const user = await User.findOne({
    where: {
      id: signedInUser.id,
    },
  });
  if (user.role === 'driver') errorRes(res, 401, 'You are not allowed ');
  return next();
};
export const isNotOperator = async (req, res, next) => {
  const signedInUser = req.user;
  const user = await User.findOne({
    where: {
      id: signedInUser.id,
    },
  });
  if (user.role === 'operator') errorRes(res, 401, 'Please sign in as Admin');
  return next();
};
