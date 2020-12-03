import Models from '../database/models';
import AssignBusesToRoutesResponses from '../utils/assignBusesToRoutes';

const { Buses } = Models;

const busToFind = async (req, res, next) => {
  const busToAssign = await Buses.findOne({
    where: { id: req.params.id },
  });

  if (!busToAssign) {
    return AssignBusesToRoutesResponses(res, 404, 'We cannot find the bus you are looking for');
  }
  next();
};

export default busToFind;
