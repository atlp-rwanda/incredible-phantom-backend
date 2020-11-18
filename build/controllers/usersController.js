"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signin = exports.getAll = exports.verifyAccount = exports.register = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _sequelize = require("sequelize");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _successHandler = _interopRequireDefault(require("../helpers/successHandler"));

var _errorHandler = _interopRequireDefault(require("../helpers/errorHandler"));

var _models = _interopRequireDefault(require("../database/models"));

var _passwordGenerator = _interopRequireDefault(require("../utils/passwordGenerator"));

var _mail = _interopRequireDefault(require("../utils/mail2"));

var _pwd = _interopRequireDefault(require("../helpers/pwd"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var User = _models["default"].User,
    Role = _models["default"].Role;

var register = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var validRole, userFromToken, signedUser, generatedPwd, hash, user, verficationLink, resetLink;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return Role.findOne({
              where: {
                role: req.body.role
              }
            });

          case 2:
            validRole = _context.sent;
            if (!validRole) (0, _errorHandler["default"])(res, 404, "Role ".concat(req.body.role, " is not allowed"));
            _context.prev = 4;
            userFromToken = req.user;
            _context.next = 8;
            return User.findOne({
              where: {
                id: userFromToken.id
              }
            });

          case 8:
            signedUser = _context.sent;

            if (!(signedUser.role === 'operator')) {
              _context.next = 12;
              break;
            }

            if (!(req.body.role === 'operator')) {
              _context.next = 12;
              break;
            }

            return _context.abrupt("return", (0, _errorHandler["default"])(res, 401, 'Please sign in as admin'));

          case 12:
            generatedPwd = (0, _passwordGenerator["default"])();
            _context.next = 15;
            return (0, _pwd["default"])(generatedPwd);

          case 15:
            hash = _context.sent;
            _context.next = 18;
            return User.create(_objectSpread(_objectSpread({}, req.body), {}, {
              password: hash,
              verficationLink: '',
              comfirmed: false,
              resetLink: ''
            }));

          case 18:
            user = _context.sent;
            verficationLink = "http://localhost:".concat(process.env.PORT, "/api/users/verify/").concat(user.id);
            resetLink = "http://localhost:".concat(process.env.PORT, "/api/users/reset/").concat(user.id);
            _context.next = 23;
            return User.update({
              verficationLink: verficationLink,
              resetLink: resetLink
            }, {
              where: {
                id: user.id
              }
            });

          case 23:
            _context.next = 25;
            return (0, _mail["default"])('verify', {
              name: user.firstName,
              email: user.email,
              id: user.id,
              password: generatedPwd
            });

          case 25:
            return _context.abrupt("return", (0, _successHandler["default"])(res, 201, 'User created Successfully and email was sent', user));

          case 28:
            _context.prev = 28;
            _context.t0 = _context["catch"](4);
            return _context.abrupt("return", (0, _errorHandler["default"])(res, 500, 'There was an error while registering a user'));

          case 31:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[4, 28]]);
  }));

  return function register(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.register = register;

var verifyAccount = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var id, user;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            id = req.params.id;
            _context2.next = 4;
            return User.findOne({
              where: {
                id: id
              }
            });

          case 4:
            user = _context2.sent;
            _context2.next = 7;
            return User.update({
              comfirmed: true
            }, {
              where: {
                id: id
              }
            });

          case 7:
            _context2.next = 9;
            return (0, _mail["default"])('comfirmation', {
              name: user.firstName,
              email: user.email,
              id: id
            });

          case 9:
            return _context2.abrupt("return", (0, _successHandler["default"])(res, 200, 'Successfully verfied your Email.'));

          case 12:
            _context2.prev = 12;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", (0, _errorHandler["default"])(res, 500, 'There was error while verfing your Account'));

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 12]]);
  }));

  return function verifyAccount(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.verifyAccount = verifyAccount;

var getAll = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var userFromToken, signedUser, users, _users;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            userFromToken = req.user;
            _context3.next = 4;
            return User.findOne({
              where: {
                id: userFromToken.id
              }
            });

          case 4:
            signedUser = _context3.sent;

            if (!(signedUser.role === 'operator')) {
              _context3.next = 12;
              break;
            }

            _context3.next = 8;
            return User.findAll({
              where: {
                role: 'driver'
              }
            });

          case 8:
            users = _context3.sent;
            (0, _successHandler["default"])(res, 200, 'Successfully got All drivers', users);
            _context3.next = 16;
            break;

          case 12:
            _context3.next = 14;
            return User.findAll({
              where: {
                role: _defineProperty({}, _sequelize.Op.or, ['operator', 'driver'])
              }
            });

          case 14:
            _users = _context3.sent;
            return _context3.abrupt("return", (0, _successHandler["default"])(res, 200, 'Successfully got All users', _users));

          case 16:
            _context3.next = 21;
            break;

          case 18:
            _context3.prev = 18;
            _context3.t0 = _context3["catch"](0);
            return _context3.abrupt("return", (0, _errorHandler["default"])(res, 500, 'There was an error while getting all a user'));

          case 21:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 18]]);
  }));

  return function getAll(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getAll = getAll;

var signin = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var _req$body, email, password, foundUser;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _req$body = req.body, email = _req$body.email, password = _req$body.password;
            _context4.next = 4;
            return User.findOne({
              where: {
                email: email
              }
            });

          case 4:
            foundUser = _context4.sent;

            if (foundUser) {
              _context4.next = 7;
              break;
            }

            return _context4.abrupt("return", (0, _errorHandler["default"])(res, 404, 'User  Not found '));

          case 7:
            _context4.next = 9;
            return _bcrypt["default"].compare(password, foundUser.password, function (err, result) {
              if (result) {
                var token = _jsonwebtoken["default"].sign({
                  id: foundUser.id,
                  email: foundUser.email
                }, process.env.JWT_KEY, {
                  expiresIn: '8h'
                });

                (0, _successHandler["default"])(res, 200, 'Signed in successfullt', {
                  token: token,
                  user: foundUser
                });
              } else {
                return (0, _errorHandler["default"])(res, 500, 'Incorrect password');
              }
            });

          case 9:
            _context4.next = 14;
            break;

          case 11:
            _context4.prev = 11;
            _context4.t0 = _context4["catch"](0);
            return _context4.abrupt("return", (0, _errorHandler["default"])(res, 500, 'There was error while signining in'));

          case 14:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 11]]);
  }));

  return function signin(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.signin = signin;