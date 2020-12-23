import { paginate } from 'paginate-info';
import sequelize, { Op } from 'sequelize';
import Models from '../database/models';
import successRes from '../helpers/successHandler';
import errorRes from '../helpers/errorHandler';

const { Bus, Route } = Models;

export const assignBusToRoute = async (req, res) => {
  try {
    const { routeID } = req.params;
    const { busId } = req.body;
    const route = await Route.findOne({ where: { routeID } });
    const bus = await Bus.findOne({ where: { id: busId } });

    if (route === null) {
      return errorRes(res, 404, res.__('Route not found'));
    }
    if (bus === null) {
      return errorRes(res, 404, res.__('Bus not found'));
    }

    const alreadyAssignedBus = await Route.findOne({
      where: {
        routeID,
        assignedBuses: { [Op.contains]: [busId] }
      }
    });

    if (alreadyAssignedBus === null) {
      const updatedRoute = await Route.update(
        {
          assignedBuses: sequelize.fn(
            'array_append',
            sequelize.col('assignedBuses'),
            busId
          )
        },
        { where: { routeID }, returning: true }
      );

      return successRes(
        res,
        200,
        res.__('Bus assigned to route successfully'),
        updatedRoute[1]
      );
    }
    return errorRes(res, 400, res.__('Bus is already assigned to this route'));
  } catch (error) {
    return errorRes(res, 500, res.__('there was an error while assigning bus'));
  }
};
export const unAssignBusToRoute = async (req, res) => {
  try {
    const { routeID } = req.params;
    const { busId } = req.body;
    const route = await Route.findOne({ where: { routeID } });
    const bus = await Bus.findOne({ where: { id: busId } });

    if (!route) {
      return errorRes(res, 404, res.__('Route not found'));
    }
    if (!bus) {
      return errorRes(res, 404, res.__('Bus not found'));
    }

    const foundAssignedBusses = await Route.findOne({
      where: {
        routeID,
        assignedBuses: { [Op.contains]: [busId] }
      }
    });

    if (foundAssignedBusses) {
      const updatedRoute = await Route.update(
        {
          assignedBuses: sequelize.fn(
            'array_remove',
            sequelize.col('assignedBuses'),
            busId
          )
        },
        { where: { routeID }, returning: true }
      );

      return successRes(
        res,
        200,
        res.__('Bus is un-assigned to this route successfully'),
        updatedRoute[1]
      );
    }
    if (foundAssignedBusses === null) {
      return errorRes(
        res,
        400,
        res.__('Bus is already un-assigned to this route')
      );
    }
  } catch (error) {
    return errorRes(res, 500, res.__('there was an error while assigning bus'));
  }
};
