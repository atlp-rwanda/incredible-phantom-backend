const errorRes = (res, status, message) => {
  res.status(status).json({
    success: false,
    message,
    pagination,
    bus,
    rows,
  });
};

export default errorRes;
