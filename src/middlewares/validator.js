import errorRes from '../helpers/errorHandler';
import RegisterValidator from '../validators/userValidator';
import validateBusStop from '../validators/busStopValidator';
import validateRoute from '../validators/routeValidator';
import validateBus from '../validators/busValidator'
import UpdateValidator from '../validators/updateValidator';
import Models from '../database/models';

const { User } = Models;

export const validateRegisterInput = (req, res, next) => {
  const { error } = RegisterValidator.validate(req.body);
  if (error) {
    return errorRes(
      res,
      500,
      res.__(`Validation error: ${error.details[0].message.replace(/"/g, '')}`)
    );
  }
  return next();
};

export const isNotDriver = async (req, res, next) => {
  const signedInUser = req.user;
  const user = await User.findOne({
    where: {
      id: signedInUser.id
    }
  });
  if (user.role === 'driver') {
    return errorRes(res, 401, res.__('Only admin and operators allowed '));
  }
  return next();
};

export const isNotOperator = async (req, res, next) => {
  const signedInUser = req.user;
  const user = await User.findOne({
    where: {
      id: signedInUser.id
    }
  });
  if (user.role === 'operator') {
    return errorRes(res, 401, res.__('Please sign in as Admin'));
  }
  return next();
};

export const validateBusStopInput = (req, res, next) => {
  const { error } = validateBusStop.validate(req.body);
  if (error) {
    return errorRes(
      res,
      500,
      res.__(`Validation error: ${error.details[0].message.replace(/"/g, '')}`)
    );
  }
  return next();
};

export const validateRouteInput = (req, res, next) => {
  const { error } = validateRoute.validate(req.body);
  if (error) {
    return errorRes(
      res,
      500,
      res.__(`Validation error: ${error.details[0].message.replace(/"/g, '')}`),
    );
  }
  return next();
};

export const validateUpdateInput = (req, res, next) => {
  const { error } = UpdateValidator.validate(req.body);
  if (error) {
    return errorRes(
      res,
      400,
      res.__(`Validation error: ${error.details[0].message.replace(/"/g, '')}`),
    );
  }
  return next();
};
export const validateBusInput = (req, res, next) => {
  const { error } = validateBus.validate(req.body);
  if (error) {
    return errorRes(
      res,
      500,
      res.__('Validation error') + error.message
    );
  }
  return next();
};
