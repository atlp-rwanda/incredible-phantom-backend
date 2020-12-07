const successRes = (res, status, message, pagination, bus, rows) => {
  res.status(status).json({
    success: false,
    message,
    pagination,
    bus,
    rows,
  });
};

export default successRes;
