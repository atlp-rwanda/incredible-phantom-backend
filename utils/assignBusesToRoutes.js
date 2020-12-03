const AssignBusesToRoutesResponses = (res, status, message, pagination, bus, rows) => res.status(status).json({
  status,
  message: res.__(message),
  pagination,
  bus,
  rows,
});

export default AssignBusesToRoutesResponses;
