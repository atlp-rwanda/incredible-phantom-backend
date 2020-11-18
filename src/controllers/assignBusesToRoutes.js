import Sequelize from "sequelize";
import { paginate } from "paginate-info";
import Models from "../database/models";
import successRes from "../helpers/successHandler";
import errorRes from "../helpers/errorHandler";

const { Op } = Sequelize;

const { Bus, Route } = Models;

export const assignRoute = async (req, res) => {
  try {
    const findRoute = await Route.findOne({
      where: { routeID: req.body.routeID },
    });
    if (!findRoute)
      return res.status(404).json({
        msg: "no route found",
      });

    const assignedBuses = await Bus.create({
      route: req.body.routeID,
      buses: req.body.busId,
      include: [
        {
          model: Route,
          as: "routes",
          attributes: ["id", "direction", "routeID"],
        },
      ],
    });
    if (!assignedBuses)
      return res.status(404).json({
        msg: "no bus found",
      });
    return res.json(assignedBuses);
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};
export const getAllBuses = async (req, res) => {
  const allBuses = await assignBuses.findAll();
  res.status(200).json(allBuses);
};
export const getBusesByRoute = async (req, res) => {
  const { routeID } = req.params;
  const busesByRoute = await assignBuses.findAll({
    where: { routeID },
  });

  res.status(200).json(busesByRoute);
};

export const updateBuseRoute = async (req, res) => {
  const { id } = req.params;
  const { route } = req.body;
  const [update] = await assignBuses.update({ route }, { where: { id } });
  if (update) {
    const updatedRoute = assignBuses.findOne({ where: { id } });
    return res.status(200).json(updatedRoute);
  }
  return res.status(404).json({
    msg: "no bus found with such id",
  });
};
export const deleteAssignedbus = async (req, res) => {
  const { id } = req.params;
  const { route } = req.body;
  const [destroy] = await assignBuses.destroy({ route }, { where: { id } });
  if (destroy) {
    const destroyedRoute = assignBuses.findOne({ where: { id } });
    return res.status(200).json(destroyedRoute);
  }
  return res.status(404).json({
    msg: "can't find that bus",
  });
};

export const busesAssigned = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    const { rows, count } = await Buses.findAndCountAll({
      page,
      limit,
      where: { routeId: { [Op.ne]: null } },
      include: [
        {
          model: Route,
          as: "routes",
          attributes: ["id", "direction", "routeID"],
        },
      ],
    });
    const pagination = paginate(page, count, rows, limit);

    if (offset >= count) {
      return errorRes(res, 400, "Page not found ");
    }

    return successRes(res, 200, "buses assigned to routes", pagination, rows);
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};
