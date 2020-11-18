"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var generatePassword = function generatePassword() {
  var length = 8,
      posible = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  var generatedPwd = '';

  for (var i = 0, n = posible.length; i < length; ++i) {
    generatedPwd += posible.charAt(Math.floor(Math.random() * n));
  }

  return generatedPwd;
};

var _default = generatePassword;
exports["default"] = _default;