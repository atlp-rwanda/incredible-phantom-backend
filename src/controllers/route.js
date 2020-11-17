import cryptoRandomString from 'crypto-random-string';
import sequelize, { Op } from 'sequelize';
import model from '../database/models';
import succesRes from '../helpers/successHandler';
import errorRes from '../helpers/errorHandler';

const { Route } = model;
const { busStop } = model;

const createRoute = async (req, res) => {
  const { origin, destination, distance } = req.body;
  try {
    const createdId = cryptoRandomString({ length: 5, type: 'numeric' });
    const searchRoute = await Route.findAll({
      where: {
        origin : origin,
        destination : destination,
      },
    });
    const searchRouteId = await Route.findAll({ where: { routeID: createdId } });
    if (searchRoute.length === 0 && searchRouteId.length === 0) {
      const route = await Route.create({
        origin : origin,
        destination : destination,
        distance : distance,
        routeID: createdId,
        busStops: [],
      });
      return succesRes(res, 201, res.__('Route created successfully'), route);
    }
    return errorRes(res, 409, res.__('Route already exists'));
  } catch (error) {
    return errorRes(res, 500, res.__('Internal Server Error : ') + error.message);
  }
};

const getRoute = async (req, res) => {
  try {
    const route = await Route.findAll();
    if (route.length === 0) {
      return errorRes(res, 404, res.__('No created routes , Please add one'));
    }
    return succesRes(res, 200, res.__('All routes'), route);
  } catch (error) {
    return errorRes(res, 500, res.__('Internal server error : ') + error.message);
  }
};

const oneRoute = async (req, res) => {
  try {
    const routeID = req.params;
    const route = await Route.findOne({ where: routeID });
    if (!route) {
      return errorRes(res, 404, res.__('Route not found :('));
    }
    return succesRes(res, 200, res.__('One route'), route);
  } catch (error) {
    return errorRes(res, 500, res.__('Internal server error : ') + error.message);
  }
};

const updateRoute = async (req, res) => {
  try {
    const routeID = req.params;
    const searchRoute = await Route.findOne({ where: routeID });
    if (searchRoute) {
      const existence = await Route.findAll({ where: req.body });
      if (existence.length === 0) {
        const [updated] = await Route.update(req.body, { where: routeID });
        const updatedRoute = await Route.findOne({ where: routeID });
        return succesRes(res, 200, res.__('Route updated successfully'), updatedRoute);
      }
      return errorRes(res, 403, res.__('One of the routes has the same information'));
    }
    return errorRes(res, 404, res.__('Route not found :('));
  } catch (error) {
    return errorRes(res, 500, res.__('Internal server error : ') + error.message);
  }
};

const deleteRoute = async (req, res) => {
  try {
    const routeID = req.params;
    const route = await Route.destroy({ where: routeID });
    if (route) {
      return succesRes(res, 200, res.__('Route deleted'));
    }
    return succesRes(res, 404, res.__('Route not found :('));
  } catch (error) {
    return errorRes(res, 500, res.__('Internal server error : ') + error.message);
  }
};

const addBusStop = async (req, res) => {
  try {
    const routeID = req.params;
    const searchingBusStop = await busStop.findOne({ where: req.body });
    const searchingRoute = await Route.findOne({ where: routeID });
    console.log(searchingRoute, searchingBusStop);
    if (searchingBusStop && searchingRoute) {
      const existence = await Route.findOne({ where: {
           routeID: req.params.routeID, busStops: { [Op.contains]: [searchingBusStop.busStopId] } } });
      if (!existence) {
        const [route] = await Route.update({ busStops: sequelize.fn('array_append', sequelize.col('busStops'), searchingBusStop.busStopId) }, { where: routeID });
        const updated = await Route.findOne({ where: routeID });
        return succesRes(res, 200, res.__('Bus stop added to route successfully!'), updated);
      }
      return errorRes(res, 404, res.__('Bus stop already exists on that route'));
    } if (!searchingRoute) {
      return errorRes(res, 404, res.__('There is no route corresponding to that ID'));
    } if (!searchingBusStop) {
      return errorRes(res, 404, res.__('There is no matching bus stops'));
    }
    return errorRes(res, 404, res.__('Neither bus stop ID or route ID does not exists'));
  } catch (error) {
    console.log(error);
    return errorRes(res, 500, res.__('Internal server error : ') + error.message);
  }
};

export {
  createRoute, getRoute, oneRoute, updateRoute, deleteRoute, addBusStop,
};
