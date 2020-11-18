"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = _joi["default"].object({
  firstName: _joi["default"].string().min(2).max(64).required(),
  lastName: _joi["default"].string().min(2).max(64).required(),
  password: _joi["default"].string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  nationalId: _joi["default"].number().min(16).required(),
  language: _joi["default"].string(),
  phone: _joi["default"].string().min(10).max(13),
  role: _joi["default"].string().required(),
  email: _joi["default"].string().required().email({
    minDomainSegments: 2,
    tlds: {
      allow: ['com', 'net', 'rw', 'co']
    }
  })
});

exports["default"] = _default;