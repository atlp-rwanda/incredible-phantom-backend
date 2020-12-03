import { paginate } from 'paginate-info';
import successRes from '../helpers/successHandler';
import errorRes from '../helpers/errorHandler';
import model from '../database/models';

const { Bus } = model;
export const createBus = async (req, res) => {
  try {
    const { plateNo, brand, type } = req.body;
    const existingBus = await Bus.findOne({
      where: { plateNo }
    });
    if (existingBus) {
      return res.status(400).json({
        status: 400,
        message: res.__('Bus already exists in the system.')
      });
    }
    const createdBus = await Bus.create({
      plateNo,
      brand,
      type
    });
    return res.status(201).json({
      status: 201,
      message: res.__('Bus created successfully.'),
      Bus: createdBus
    });
  } catch (error) {
    return errorRes(
      res,
      500,
      res.__('Internal Server Error : ') + error.message
    );
  }
};
export const getBus = async (req, res) => {
  try {
    const {
      query: { page = 1, limit = 10 }
    } = req;
    const offset = (page - 1) * limit;
    const { rows, count } = await Bus.findAndCountAll({
      page,
      limit,
      offset
    });
    const pagination = paginate(page, count, rows, limit);

    if (offset >= count) {
      return errorRes(
        res,
        404,
        res.__('There are no buses registered in the system')
      );
    }
    return successRes(res, 200, pagination, rows);
  } catch (error) {
    return errorRes(
      res,
      500,
      res.__('Internal Server Error : ') + error.message
    );
  }
};
export const getOneBus = async (req, res) => {
  try {
    const { id } = req.params;
    const bus = await Bus.findOne({ where: { id } });
    if (!bus) {
      return errorRes(res, 404, res.__('Bus not found'));
    }
    return successRes(res, 200, res.__('Bus found'), bus);
  } catch (error) {
    return errorRes(
      res,
      500,
      res.__('Internal Server Error : ') + error.message
    );
  }
};
export const updateBus = async (req, res) => {
  try {
    const { id } = req.params;
    const searchBus = await Bus.findOne({ where: { id } });
    if (searchBus) {
      const existence = await Bus.findAll({ where: req.body });
      if (existence.length === 0) {
        const [updated] = await Bus.update(req.body, { where: { id } });
        const updatedBus = await Bus.findOne({ where: { id } });
        return successRes(
          res,
          200,
          res.__('Bus info updated successfully'),
          updatedBus
        );
      }
      return errorRes(res, 400, res.__('Bus not updated '));
    }
    return errorRes(res, 404, res.__('Bus not registered in the system '));
  } catch (error) {
    return errorRes(
      res,
      500,
      res.__('Internal Server Error : ') + error.message
    );
  }
};

export const deleteBus = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBus = await Bus.findOne({ where: { id } });
    const bus = await Bus.destroy({
      where: { id }
    });
    if (bus) {
      return successRes(
        res,
        201,
        res.__('Bus deleted successfully'),
        deletedBus
      );
    }
    return errorRes(res, 404, res.__('Bus not found '));
  } catch (error) {
    return errorRes(
      res,
      500,
      res.__('Internal Server Error : ') + error.message
    );
  }
};
export const busesInfo = async (req, res) => {
  try {
    const response = await Bus.findAll({
      attributes: ['id', 'location', 'status', 'commuters', 'type', 'seats']
    });
    successRes(
      res,
      200,
      res.__('All information you need about the bus'),
      response
    );
  } catch (error) {
    
    errorRes(res, 500, res.__('error occured!Try again'));
  }
};
export const onebusInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Bus.findOne({
      where: { id },
      attributes: ['id', 'location', 'status', 'commuters', 'type', 'seats']
    });
    successRes(
      res,
      200,
      res.__('All information you need about the bus'),
      response
    );
  } catch (error) {
    errorRes(res, 500, res.__('error occured!Try again'));
  }
};
export const updateoneBus = async (req, res) => {
  try {
    const { id } = req.params;
    const searchBus1 = await Bus.findOne({ where: { id } });
    if (searchBus1) {
      const existence = await Bus.findAll({ where: req.body });
      if (existence.length === 0) {
        const [updatedone] = await Bus.update(req.body, { where: { id } });
        const updatedBus = await Bus.findOne({ where: { id } });
        return successRes(
          res,
          200,
          res.__('Information updated successfully'),
          updatedBus
        );
      }
      return errorRes(res, 400, res.__('information not updated '));
    }
    return errorRes(res, 404, res.__('Bus not registered in the system '));
  } catch (error) {
    return errorRes(
      res,
      500,
      res.__('Internal Server Error : ') + error.message
    );
  }
};
