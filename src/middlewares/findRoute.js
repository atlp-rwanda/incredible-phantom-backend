import Models from '../database/models';
import AssignBusesToRoutesResponses from '../utils/assignBusesToRoutes';

const { Routes } = Models;

const routeToFind = async (req, res, next) => {
  const findRoute = await Routes.findOne({
    where: { routeID: req.body.routeID },
  });

  if (!findRoute) {
    return AssignBusesToRoutesResponses(res, 404, 'We cannot find the route you are looking for');
  }
  next();
};

export default routeToFind;