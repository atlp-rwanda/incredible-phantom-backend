import cryptoRandomString from 'crypto-random-string';
import model from '../database/models';
import succesRes from '../helpers/successHandler';
import errorRes from '../helpers/errorHandler';

const { busStop } = model;

const createBusStop = async (req, res) => {
    const { coordinates , sector , cell } = req.body;
  try {
    const busStopId = cryptoRandomString({ length: 5, type: 'numeric' });
    const searchBusStop = await busStop.findAll({ where: req.body });
    const searchBusStopId = await busStop.findAll({
      where: { busStopId: busStopId },
    });
    if (searchBusStop.length === 0 && searchBusStopId.length === 0) {
      const Stop = await busStop.create({
        coordinates: coordinates,
        sector: sector,
        cell: cell,
        busStopId: busStopId,
      });
      return succesRes(res, 201, res.__('Bus stop created successfully'), Stop);
    }
    return errorRes(res, 409, res.__('Bus stop already exists'));
  } catch (error) {
    return errorRes(res, 500, res.__('Internal server error : ') + error.message);
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
    return errorRes(res, 500, res.__('Internal server error : ') + error.message);
  }
};

const oneStop = async (req, res) => {
  try {
    const busStopId = req.params;
    const foundBusStop = await busStop.findOne({ where: busStopId });
    if (!foundBusStop) {
      return errorRes(res, 404, res.__('bus stop not found :('));
    }
    return succesRes(res, 200, res.__('One bus stop'), foundBusStop);
  } catch (error) {
    return errorRes(res, 500, res.__('Internal server error : ') + error.message );
  }
};

const updateBusStop = async (req, res) => {
  try {
    const busStopId = req.params;
    const searchBusStop = await busStop.findOne({ where: busStopId });
    if (searchBusStop) {
      const existence = await busStop.findAll({ where: req.body });
      if (existence.length === 0) {
        const [updated] = await busStop.update(req.body, { where: busStopId });
        const updatedBusStop = await busStop.findOne({ where: busStopId });
        return succesRes(
          res,
          200,
          res.__('Bus stop updated successfully'),
          updatedBusStop
        );
      }
      return errorRes(
        res,
        401,
        res.__('One of the bus stops has the same information')
      );
    }
    return errorRes(res, 404, res.__('bus stop not found :('));
  } catch (error) {
    return errorRes(res, 500, res.__('Internal server error : ') + error.message);
  }
};

const deleteBusStop = async (req, res) => {
  try {
    const busStopId = req.params;
    const foundBusStop = await busStop.destroy({ where: busStopId });
    if (foundBusStop) {
      return succesRes(res, 200, res.__('bus stop deleted'));
    }
    return errorRes(res, 404, res.__('bus stop not found'));
  } catch (error) {
    return errorRes(res, 500, res.__('Internal server error : ') + error.message);
  }
};

export {
  createBusStop,
  getBusStops,
  oneStop,
  updateBusStop,
  deleteBusStop,
};
