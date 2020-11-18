"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteRole = exports.UpdateRole = exports.ReadRole = exports.createRole = void 0;

var _successHandler = _interopRequireDefault(require("../helpers/successHandler"));

var _errorHandler = _interopRequireDefault(require("../helpers/errorHandler"));

var _models = _interopRequireDefault(require("../database/models"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Role = _models["default"].Role;

var createRole = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var role;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return Role.create({
              role: req.body.role
            });

          case 3:
            role = _context.sent;
            return _context.abrupt("return", (0, _successHandler["default"])(res, 201, 'Role created successfully', role));

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", (0, _errorHandler["default"])(res, 500, 'There was an error while creating a role'));

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function createRole(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.createRole = createRole;

var ReadRole = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var role;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return Role.findAll();

          case 3:
            role = _context2.sent;
            return _context2.abrupt("return", (0, _successHandler["default"])(res, 200, 'Successfully got All roles', role));

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", (0, _errorHandler["default"])(res, 500, 'There was an error while reading role'));

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 7]]);
  }));

  return function ReadRole(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.ReadRole = ReadRole;

var UpdateRole = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var roleId, updated;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            roleId = req.params.id;
            _context3.next = 4;
            return Role.update(req.body, {
              where: {
                id: roleId
              }
            });

          case 4:
            updated = _context3.sent;
            return _context3.abrupt("return", (0, _successHandler["default"])(res, 201, 'Role updated successfully', updated));

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3["catch"](0);
            return _context3.abrupt("return", (0, _errorHandler["default"])(res, 500, 'There was an error while Updating the Role'));

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 8]]);
  }));

  return function UpdateRole(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.UpdateRole = UpdateRole;

var DeleteRole = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var roleId, findrole;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            roleId = req.params.id;
            _context4.next = 4;
            return Role.findOne({
              where: {
                id: roleId
              }
            });

          case 4:
            findrole = _context4.sent;

            if (findrole) {
              _context4.next = 7;
              break;
            }

            return _context4.abrupt("return", (0, _errorHandler["default"])(res, 404, 'Role not Found'));

          case 7:
            _context4.next = 9;
            return Role.destroy({
              where: {
                id: roleId
              }
            });

          case 9:
            return _context4.abrupt("return", (0, _successHandler["default"])(res, 200, 'Delete role successfully'));

          case 12:
            _context4.prev = 12;
            _context4.t0 = _context4["catch"](0);
            return _context4.abrupt("return", (0, _errorHandler["default"])(res, 500, 'There was an error while deleting the role'));

          case 15:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 12]]);
  }));

  return function DeleteRole(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.DeleteRole = DeleteRole;