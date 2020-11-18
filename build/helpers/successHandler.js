"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var errorRes = function errorRes(res, status, message, data) {
  res.status(status).json({
    success: true,
    message: message,
    data: data
  });
};

var _default = errorRes;
exports["default"] = _default;