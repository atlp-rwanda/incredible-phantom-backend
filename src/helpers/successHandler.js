const errorRes = (res, status, message, data, pagination, bus, rows) => {
  res.status(status).json({
    success: true,
    message,
    data,
    pagination,
    bus,
    rows,
  });
};

export default errorRes;
