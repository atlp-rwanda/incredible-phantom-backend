import cryptoRandomString from 'crypto-random-string';
import sequelize, { Op } from 'sequelize';
import model from '../database/models';
import succesRes from '../helpers/successHandler';
import errorRes from '../helpers/errorHandler';

const { busStop, Route } = model;
const createBusStop = async (req, res) => {
  try {
    const { coordinates, sector, cell } = req.body;
    const createdBusStopId = cryptoRandomString({ length: 5, type: 'numeric' });
    const searchBusStopId = await busStop.findOne({
      where: { busStopId: createdBusStopId, coordinates }
    });
    if (!searchBusStopId) {
      const Stop = await busStop.create({
        coordinates,
        sector,
        cell,
        busStopId: createdBusStopId
      });
      return succesRes(res, 201, res.__('Bus stop created successfully'), Stop);
    }
    return errorRes(res, 409, res.__('Bus stop already exists'));
  } catch (error) {
    return errorRes(
      res,
      500,
      res.__('Internal server error : ') + error.message
    );
  }
};

const getBusStops = async (req, res) => {
  try {
    const foundBusStop = await busStop.findAll();
    if (foundBusStop.length === 0) {
      return errorRes(res, 404, res.__('No created busStops , Please add one'));
    }
    return succesRes(res, 200, res.__('All busStops'), foundBusStop);
  } catch (error) {
    return errorRes(
      res,
      500,
      res.__('Internal server error : ') + error.message
    );
  }
};

const oneStop = async (req, res) => {
  try {
    const { busStopId } = req.params;
    const foundBusStop = await busStop.findOne({ where: { busStopId } });
    if (!foundBusStop) {
      return errorRes(res, 404, res.__('bus stop not found :('));
    }
    return succesRes(res, 200, res.__('One bus stop'), foundBusStop);
  } catch (error) {
    return errorRes(
      res,
      500,
      res.__('Internal server error : ') + error.message
    );
  }
};

const updateBusStop = async (req, res) => {
  try {
    const { busStopId } = req.params;
    const searchBusStopExistence = await busStop.findOne({
      where: { busStopId }
    });
    if (searchBusStopExistence) {
      await busStop.update(req.body, { where: { busStopId } });
      const updatedBusStop = await busStop.findOne({ where: { busStopId } });
      return succesRes(
        res,
        200,
        res.__('Bus stop updated successfully'),
        updatedBusStop
      );
    }
    return errorRes(res, 404, res.__('bus stop not found :('));
  } catch (error) {
    return errorRes(res, res.__('Internal server error : ') + error.message);
  }
};

const deleteBusStop = async (req, res) => {
  try {
    const { busStopId } = req.params;
    const busStopToDelete = await busStop.findOne({ where: { busStopId } });
    if (busStopToDelete) {
      await busStop.destroy({ where: { busStopId } });
      const route = await Route.findAll({
        where: { busStops: { [Op.contains]: [busStopId] } }
      });
      route.forEach(async (foundRoute) => {
        const foundRouteId = foundRoute.dataValues.routeID;
        await Route.update(
          {
            busStops: sequelize.fn(
              'array_remove',
              sequelize.col('busStops'),
              busStopId
            )
          },
          { where: { routeID: foundRouteId } }
        );
      });
      return succesRes(res, 200, res.__('bus stop deleted'), busStopToDelete);
    }
    return errorRes(res, 404, res.__('bus stop not found'));
  } catch (error) {
    return errorRes(
      res,
      500,
      res.__('Internal server error : ') + error.message
    );
  }
};

export { createBusStop, getBusStops, oneStop, updateBusStop, deleteBusStop };
