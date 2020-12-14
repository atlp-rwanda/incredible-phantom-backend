import { paginate } from 'paginate-info';
import Models from '../database/models';
import successRes from '../helpers/successHandler';
import errorRes from '../helpers/errorHandler';

const { Bus, Route } = Models;

export const assignBusToRoute = async (req, res) => {
  try {
    const searchBus = await Bus.findOne({
      where: { id: req.params.busId },
    });
    if (!searchBus) errorRes(res, 404, res.__('That bus is not registered'));
    const searchRoute = await Route.findOne({
      where: { id: req.body.routeID },
    });
    if (!searchRoute) errorRes(res, 404, res.__('That route is not found'));
    const assigned = await Bus.update(
      { routeID: searchRoute.id },
      { where: { id: req.params.busId } }
    );
    if (searchRoute.id === searchBus.routeID) {
      errorRes(res, 400, res.__('Bus is already assigned to this route'));
    }
    if (assigned) {
      const assignedBus = await Route.findOne({
        where: { id: req.params.busId },
        include: ['assignedBuses'],
      });
      return successRes(
        res,
        200,
        res.__('Bus assigned to route successfully'),
        assignedBus
      );
    }
  } catch (error) {
    console.log(error);
    return errorRes(res, 500, res.__('there was an error while assigning bus'));
  }
};
export const unAssignBusToRoute = async (req, res) => {
  try {
    const searchBus = await Bus.findOne({
      where: { id: req.params.busId },
    });
    if (!searchBus) errorRes(res, 404, res.__('That bus is not registered'));
    if (searchBus.routeID === null) {
      errorRes(res, 400, res.__('Bus is not yet assigned to any route'));
    }
    await Bus.update({ routeID: null }, { where: { id: req.params.busId } });
    const bus = await Bus.findOne({ where: { id: req.params.busId } });
    successRes(res, 200, res.__('unAssigned bus from route successfully'), bus);
  } catch (error) {
    console.log(error);
    return errorRes(
      res,
      500,
      res.__('There was an error while unassigning bus')
    );
  }
};
export const allBusesOnRoute = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    const { rows, count } = await Route.findAndCountAll({
      page,
      limit,
      include: ['assignedBuses'],
    });
    const pagination = paginate(page, count, rows, limit);
    if (offset >= count) {
      return errorRes(res, 404, res.__('This page does not exist'));
    }
    return successRes(res, 200, res.__('These are  buses assigned to routes'), {
      pagination,
      rows,
    });
  } catch (error) {
    console.log(error);
    return errorRes(
      res,
      500,
      res.__('there was an error while getting all assigned buses')
    );
  }
};
