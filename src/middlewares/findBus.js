import Models from '../database/models';
import errorRes from '../helpers/errorHandler';

const { Buses } = Models;

export  const busToFind = async (req, res, next) => {
  const busToAssign = await Buses.findOne({
    where: { id: req.params.id },
  });

  if (!busToAssign) {
    return errorRes(res, 404, 'Bus not found');
  next();
};


