"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var successRes = function successRes(res, status, message) {
  res.status(status).json({
    success: false,
    message: message
  });
};

var _default = successRes;
exports["default"] = _default;