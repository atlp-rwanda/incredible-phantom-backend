import cryptoRandomString from 'crypto-random-string';
import sequelize, { Op } from 'sequelize';
import { paginate } from 'paginate-info';
import model from '../database/models';
import succesRes from '../helpers/successHandler';
import errorRes from '../helpers/errorHandler';

const { Route } = model;
const { busStop } = model;

const createRoute = async (req, res) => {
  try {
    const { origin, destination, distance } = req.body;
    const routeId = cryptoRandomString({ length: 5, type: 'numeric' });
    const existenceOfRoute = await Route.findOne({
      where: { origin, destination },
    });
    if (existenceOfRoute === null) {
      const route = await Route.create({
        origin,
        destination,
        distance,
        routeID: routeId,
        busStops: [],
      });
      return succesRes(res, 201, res.__('Route created successfully'), route);
    }
    return errorRes(res, 409, res.__('Route already exists'));
  } catch (error) {
    return errorRes(
      res,
      500,
      res.__('Internal Server Error : ') + error.message,
    );
  }
};

const getRoute = async (req, res) => {
  try {
    const {
      query: { page = 1, limit = 10 }
    } = req;
    const offset = (page - 1) * limit;
    const { rows, count } = await Route.findAndCountAll({
      page,
      limit,
      offset
    });
    const route = await Route.findAll();
    if (route.length === 0) {
      return errorRes(res, 404, res.__('No created routes , Please add one'));
    }
    const pagination = paginate(page, count, rows, limit);
    if (offset >= count) {
      return errorRes(res, 404, res.__('This page does not exist'));
    }
    return succesRes(res, 200, res.__('All routes'), {
      pagination,
      routes: rows
    });
  } catch (error) {
    return errorRes(
      res,
      500,
      res.__('Internal server error : ') + error.message,
    );
  }
};

const oneRoute = async (req, res) => {
  try {
    const { routeID } = req.params;
    const route = await Route.findOne({ where: { routeID } });
    if (!route) {
      return errorRes(res, 404, res.__('Route not found :('));
    }
    return succesRes(res, 200, res.__('One route'), route);
  } catch (error) {
    return errorRes(
      res,
      500,
      res.__('Internal server error : ') + error.message,
    );
  }
};

const updateRoute = async (req, res) => {
  try {
    const { routeID } = req.params;
    const searchRoute = await Route.findOne({ where: { routeID } });
    if (searchRoute) {
      const existenceOfInfo = await Route.findOne({ where: req.body });
      if (!existenceOfInfo) {
        await Route.update(req.body, { where: { routeID } });
        const updatedRoute = await Route.findOne({ where: { routeID } });
        return succesRes(
          res,
          200,
          res.__('Route updated successfully'),
          updatedRoute,
        );
      }
      return errorRes(
        res,
        403,
        res.__('One of the routes has the same information'),
      );
    }
    return errorRes(res, 404, res.__('Route not found :('));
  } catch (error) {
    return errorRes(
      res,
      500,
      res.__('Internal server error : ') + error.message,
    );
  }
};

const deleteRoute = async (req, res) => {
  try {
    const { routeID } = req.params;
    const foundRoute = await Route.findOne({ where: { routeID } });
    if (foundRoute) {
      await Route.destroy({ where: { routeID } });
      return succesRes(res, 200, res.__('Route deleted'), foundRoute);
    }
    return succesRes(res, 404, res.__('Route not found :('));
  } catch (error) {
    return errorRes(
      res,
      500,
      res.__('Internal server error : ') + error.message,
    );
  }
};

const addBusStop = async (req, res) => {
  try {
    const { routeID } = req.params;
    const searchingBusStop = await busStop.findOne({ where: req.body });
    const searchingRoute = await Route.findOne({ where: { routeID } });
    if (searchingBusStop && searchingRoute) {
      const existence = await Route.findOne({
        where: {
          routeID,
          busStops: { [Op.contains]: [searchingBusStop.dataValues.busStopId] },
        },
      });
      if (!existence) {
        await Route.update(
          {
            busStops: sequelize.fn(
              'array_append',
              sequelize.col('busStops'),
              searchingBusStop.dataValues.busStopId,
            ),
          },
          { where: { routeID } },
        );
        const updated = await Route.findOne({ where: { routeID } });
        return succesRes(
          res,
          200,
          res.__('Bus stop added to route successfully!'),
          updated,
        );
      }
      return errorRes(
        res,
        400,
        res.__('Bus stop already exists on that route'),
      );
    }
    if (!searchingRoute) {
      return errorRes(
        res,
        404,
        res.__('There is no route corresponding to that ID'),
      );
    }
    if (!searchingBusStop) {
      return errorRes(res, 404, res.__('There is no matching bus stops'));
    }
    return errorRes(res, 400, res.__('Invalid input'));
  } catch (error) {
    return errorRes(
      res,
      500,
      res.__('Internal server error : ') + error.message,
    );
  }
};

export {
  createRoute,
  getRoute,
  oneRoute,
  updateRoute,
  deleteRoute,
  addBusStop,
};
