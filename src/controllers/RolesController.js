import successRes from '../helpers/successHandler';
import errorRes from '../helpers/errorHandler';
import Models from '../database/models';

const { Role } = Models;

export const createRole = async (req, res) => {
  try {
    const findRole = await Role.findOne({ where: { role: req.body.role } });
    if (findRole) {
      return errorRes(res, 400, res.__('That role already exist'));
    }
    const role = await Role.create({
      role: req.body.role
    });

    return successRes(res, 201, res.__('Role created successfully'), role);
  } catch (error) {
    return errorRes(
      res,
      500,
      res.__('There was an error while creating a role')
    );
  }
};

export const ReadRole = async (req, res) => {
  try {
    const role = await Role.findAll();
    return successRes(res, 200, res.__('Successfully got All roles'), role);
  } catch (error) {
    return errorRes(res, 500, res.__('There was an error while reading role'));
  }
};

export const UpdateRole = async (req, res) => {
  try {
    const roleId = req.params.id;
    const updated = await Role.update(req.body, {
      where: { id: roleId }
    });
    return successRes(res, 201, res.__('Role updated successfully'), updated);
  } catch (error) {
    return errorRes(
      res,
      500,
      res.__('There was an error while Updating the Role')
    );
  }
};

export const DeleteRole = async (req, res) => {
  try {
    const roleId = req.params.id;
    const findrole = await Role.findOne({ where: { id: roleId } });

    if (!findrole) return errorRes(res, 404, res.__('Role not Found'));

    await Role.destroy({ where: { id: roleId } });
    return successRes(res, 200, res.__('Delete role successfully'), findrole);
  } catch (error) {
    return errorRes(
      res,
      500,
      res.__('There was an error while deleting the role')
    );
  }
};
