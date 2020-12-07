import Models from '../database/models';
import errorRes from '../helpers/errorHandler';
const { Routes } = Models;

export const routeToFind = async (req, res, next) => {
  const findRoute = await Routes.findOne({
    where: { routeID: req.body.routeID },
  });

  if (!findRoute) {
    return errorRes(res, 404, 'Route not found');
  }
  next();
};

