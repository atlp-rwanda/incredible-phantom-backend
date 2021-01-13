import { Op } from 'sequelize';
import { paginate } from 'paginate-info';
import successRes from '../helpers/successHandler';
import errorRes from '../helpers/errorHandler';
import Models from '../database/models';
import sendEmail from '../utils/mail2';
import emitter from '../utils/eventEmitter';

const { User, Bus, Notification } = Models;

const checkDriverExistence = async (res, driverId) => {
  const driver = await User.findOne({ where: { id: driverId } });
  if (!driver) errorRes(res, 404, res.__('The driver does not exit'));

  if (driver.role !== 'driver') {
    return errorRes(res, 400, res.__('The user is not a driver'));
  }
  const data = {
    email: driver.email,
    id: driver.id,
    name: driver.firstName,
    busId: driver.busId
  };
  return data;
};

const checkBusExistence = async (res, busId) => {
  const searchBus = await Bus.findOne({ where: { id: busId } });
  if (!searchBus) errorRes(res, 404, res.__('The bus does not exit'));
  const busInfo = {
    plate: searchBus.plateNo,
    brand: searchBus.brand
  };
  return busInfo;
};

const sendNotification = async (user, content) => {
  await Notification.create({
    is_read: false,
    content,
    receiverId: user.id
  });
};

export const assignDriverToBus = async (req, res) => {
  try {
    const { driverId } = req.params;
    const { busId } = req.body;
    const driver = await checkDriverExistence(res, driverId, busId);

    if (driver.busId !== null) {
      return errorRes(res, 400, res.__('Assigned to another bus'));
    }

    const busInfo = await checkBusExistence(res, busId);
    await User.update({ busId }, { where: { id: driverId } });

    await sendNotification(
      driver,
      `You are assigned to bus: Plate no:${busInfo.plate} Brand: ${busInfo.brand}`
    );

    const afterAssignment = await User.findOne({
      where: { id: driverId },
      include: ['bus', 'notifications']
    });
    await sendEmail('assignment', driver, busInfo);
    emitter.emit('request created', '');

    successRes(
      res,
      200,
      res.__('Assigned Driver to a bus successfully'),
      afterAssignment
    );
  } catch (error) {
    return errorRes(res, 500, res.__('Error assigning driver to bus'));
  }
};

export const unAssignDriverToBus = async (req, res) => {
  try {
    const { driverId } = req.params;
    const driver = await checkDriverExistence(res, driverId);
    if (driver.busId === null) {
      return errorRes(
        res,
        400,
        res.__('Driver already unassigned to this bus')
      );
    }
    await User.update({ busId: null }, { where: { id: driverId } });

    await sendNotification(
      driver,
      'You are Unassigned to the bus you were driving'
    );

    const afterUnassignment = await User.findOne({
      where: { id: driverId },
      include: ['notifications']
    });
    await sendEmail('unassignment', driver);

    emitter.emit('request created', '');

    successRes(
      res,
      200,
      res.__('UnAssigned Driver to bus successfully'),
      afterUnassignment
    );
  } catch (error) {
    return errorRes(res, 500, res.__('Error Unassigning driver to bus'));
  }
};

export const driversAssignedTobus = async (req, res) => {
  try {
    const { page = 1, limit = 8 } = req.query;
    const offset = (page - 1) * limit;
    const { rows, count } = await User.findAndCountAll({
      page,
      limit,
      where: { busId: { [Op.ne]: null } },
      include: ['bus'],
      order: [['updatedAt', 'DESC']]
    });
    const pagination = paginate(page, count, rows, limit);

    if (offset >= count) {
      return errorRes(res, 404, res.__("We can't get that page"));
    }

    return successRes(res, 200, res.__('Successfully got drivers at work'), {
      pagination,
      rows
    });
  } catch (error) {
    return errorRes(res, 500, res.__('Error while getting occupied drivers'));
  }
};
