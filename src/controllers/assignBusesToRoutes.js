
import Sequelize from 'sequelize';
import { paginate } from 'paginate-info';
import Models from '../database/models';
import successRes from '../helpers/successHandler';
import errorRes from '../helpers/errorHandler';

const { Op } = Sequelize;

const { Buses, Routes } = Models;


  export const assignRoute = async(req, res) => {
    try {
      const findRoute = await Routes.findOne({
        where: { routeID: req.body.routeID },
      });

      const updated = await Buses.update({ routeId: findRoute.id },
        { where: { id: req.params.id } });

      if (updated) {
        const assignedBus = await Buses.findOne({
          where: { id: req.params.id },
          include: [{
            model: Routes,
            as: 'route',
            attributes: ['id', 'direction', 'routeID'],
          }],
        });
        return successRes(res, 201, 'Bus assigned successfully', assignedBus);
      }
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  }

  export const busesAssignedToRoutes= async(req, res) =>{
    try {
      const { page = 1, limit = 10 } = req.query;
      const offset = (page - 1) * limit;
      const { rows, count } = await Buses.findAndCountAll({
        page,
        limit,
        where: { routeId: { [Op.ne]: null } },
        include: [{
          model: Routes,
          as: 'route',
          attributes: ['id', 'direction', 'routeID'],
        }],
      });
      const pagination = paginate(page, count, rows, limit);

      if (offset >= count) {
        return errorRes(res, 400, 'Bus not found ');
      }

      return successRes(res, 200, 'These are buses assigned to routes', pagination, rows);
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  }



