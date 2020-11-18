"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isNotOperator = exports.isNotDriver = exports.validateRegisterInput = void 0;

var _successHandler = _interopRequireDefault(require("../helpers/successHandler"));

var _userValidator = _interopRequireDefault(require("../validators/userValidator"));

var _models = _interopRequireDefault(require("../database/models"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var User = _models["default"].User;

var validateRegisterInput = function validateRegisterInput(req, res, next) {
  var _RegisterValidator$va = _userValidator["default"].validate(req.body),
      error = _RegisterValidator$va.error;

  if (error) {
    return (0, _successHandler["default"])(res, 500, 'Validation error', validateRegisterInput.error);
  }

  return next();
};

exports.validateRegisterInput = validateRegisterInput;

var isNotDriver = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var signedInUser, user;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            signedInUser = req.user;
            _context.next = 3;
            return User.findOne({
              where: {
                id: signedInUser.id
              }
            });

          case 3:
            user = _context.sent;
            if (user.role === 'driver') (0, _successHandler["default"])(res, 401, 'You are not allowed ');
            return _context.abrupt("return", next());

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function isNotDriver(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.isNotDriver = isNotDriver;

var isNotOperator = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
    var signedInUser, user;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            signedInUser = req.user;
            _context2.next = 3;
            return User.findOne({
              where: {
                id: signedInUser.id
              }
            });

          case 3:
            user = _context2.sent;
            if (user.role === 'operator') (0, _successHandler["default"])(res, 401, 'Please sign in as Admin');
            return _context2.abrupt("return", next());

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function isNotOperator(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

exports.isNotOperator = isNotOperator;