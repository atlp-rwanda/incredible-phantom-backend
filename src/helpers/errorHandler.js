const successRes = (res, status, message) => {
  res.status(status).json({
    success: false,
    message,
  });
};

export default successRes;
