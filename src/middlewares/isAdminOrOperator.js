import Models from '../database/models';

const { Users } = Models;

export const isAdminOrOperator = async (req, res, next) => {
  const { email } = req.body;
  const user = await Users.findOne({ where: { email } });
  if (!user) {
    res.status(404).json({
      status: 404,
      message: res.__('Email not found'),
    });
    return false;
  }
  if (user.role !== 'admin' && user.role !== 'operator') {
    return res
      .status(404)
      .json({ status: 404, message: res.__('Your role not a driver or operator') });
  }
  next();
};


