import Models from '../database/models';
const { Route, Bus } = Models;
import successRes from '../helpers/successHandler';
import errorRes from '../helpers/errorHandler';
export const viewListOfBuses = async (req, res) => {
  try {
    const { origin, destination } = req.query;
    const route = await Route.findAll({ where: { origin, destination } });
    if (route.length === 0) {
      return errorRes(res, 404, res.__('route with locations not found'));
    }
    const { assignedBuses } = route[0].dataValues;
    const buses = assignedBuses.map(async (assignedBus) => {
      const oneBus = await Bus.findOne({ where: { id: assignedBus } });
      return oneBus.dataValues;
    });
    const response = await Promise.all(buses);
    return successRes(
      res,
      200,
      res.__('Buses on this route returned successfully'),
      {
        counts: response.length,
        buses: response
      }
    );
  } catch (err) {
    return errorRes(
      res,
      500,
      res.__('There was an error while getting the list of buses on this route')
    );
  }
};
