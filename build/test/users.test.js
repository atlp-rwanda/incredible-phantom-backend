"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _mocha = _interopRequireDefault(require("mocha"));

var _chai = _interopRequireWildcard(require("chai"));

var _sequelize = require("sequelize");

var _dotenv = require("dotenv");

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _index = _interopRequireDefault(require("../index"));

var _models = _interopRequireDefault(require("../database/models"));

var _mockUsers = require("./mocks/mockUsers");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

(0, _dotenv.config)();

_chai["default"].use(_chaiHttp["default"]);

var it = _mocha["default"].it,
    describe = _mocha["default"].describe,
    beforeEach = _mocha["default"].beforeEach,
    afterEach = _mocha["default"].afterEach;
var expect = _chai["default"].expect;
var User = _models["default"].User,
    Role = _models["default"].Role;

var siginIn = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(user) {
    var userData;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _chai["default"].request(_index["default"]).post('/api/users/signin').send(user);

          case 2:
            userData = _context.sent;
            return _context.abrupt("return", "Bearer ".concat(userData.body.data.token));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function siginIn(_x) {
    return _ref.apply(this, arguments);
  };
}();

describe('Users Related Tests', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
  return regeneratorRuntime.wrap(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          beforeEach( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    _context2.next = 2;
                    return User.destroy({
                      where: {
                        email: _defineProperty({}, _sequelize.Op.not, 'admin@gmail.com')
                      }
                    });

                  case 2:
                    _context2.next = 4;
                    return Role.destroy({
                      where: {},
                      truncate: true
                    });

                  case 4:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2);
          })));
          afterEach( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    _context3.next = 2;
                    return User.destroy({
                      where: {
                        email: _defineProperty({}, _sequelize.Op.not, 'admin@gmail.com')
                      }
                    });

                  case 2:
                  case "end":
                    return _context3.stop();
                }
              }
            }, _callee3);
          })));
          it(' Should not sign in Incorect password', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
            var res;
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    _context4.next = 2;
                    return _chai["default"].request(_index["default"]).post('/api/users/signin').send(_mockUsers.wrongPwd);

                  case 2:
                    res = _context4.sent;
                    expect(res.status).to.be.equal(500);
                    expect(res.body).to.have.property('message', 'Incorrect password');

                  case 5:
                  case "end":
                    return _context4.stop();
                }
              }
            }, _callee4);
          })));
          it('Should Get all Users as Admin', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
            var token, res;
            return regeneratorRuntime.wrap(function _callee5$(_context5) {
              while (1) {
                switch (_context5.prev = _context5.next) {
                  case 0:
                    _context5.next = 2;
                    return siginIn(_mockUsers.mockAdmin);

                  case 2:
                    token = _context5.sent;
                    _context5.next = 5;
                    return _chai["default"].request(_index["default"]).get('/api/users').set('Authorization', token);

                  case 5:
                    res = _context5.sent;
                    expect(res.status).to.be.equal(200);
                    expect(res.body).to.have.property('message', 'Successfully got All users');

                  case 8:
                  case "end":
                    return _context5.stop();
                }
              }
            }, _callee5);
          })));
          it('Should Register a User', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
            var token, res;
            return regeneratorRuntime.wrap(function _callee6$(_context6) {
              while (1) {
                switch (_context6.prev = _context6.next) {
                  case 0:
                    _context6.next = 2;
                    return siginIn(_mockUsers.mockAdmin);

                  case 2:
                    token = _context6.sent;
                    _context6.next = 5;
                    return _chai["default"].request(_index["default"]).post('/api/roles').send({
                      role: 'operator'
                    }).set('Authorization', token);

                  case 5:
                    _context6.next = 7;
                    return _chai["default"].request(_index["default"]).post('/api/users').send(_mockUsers.mockUser).set('Authorization', token);

                  case 7:
                    res = _context6.sent;
                    expect(res.status).to.be.equal(201);
                    expect(res.body).to.have.property('message', 'User created Successfully and email was sent');

                  case 10:
                  case "end":
                    return _context6.stop();
                }
              }
            }, _callee6);
          })));
          it('Should Comfirm User email', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
            var token, res1, res;
            return regeneratorRuntime.wrap(function _callee7$(_context7) {
              while (1) {
                switch (_context7.prev = _context7.next) {
                  case 0:
                    _context7.next = 2;
                    return siginIn(_mockUsers.mockAdmin);

                  case 2:
                    token = _context7.sent;
                    _context7.next = 5;
                    return _chai["default"].request(_index["default"]).post('/api/roles').send({
                      role: 'operator'
                    }).set('Authorization', token);

                  case 5:
                    _context7.next = 7;
                    return _chai["default"].request(_index["default"]).post('/api/users').send(_mockUsers.mockUser).set('Authorization', token);

                  case 7:
                    res1 = _context7.sent;
                    _context7.next = 10;
                    return (0, _chai.request)(_index["default"]).put("/api/users/verify/".concat(res1.body.data.id));

                  case 10:
                    res = _context7.sent;
                    console.log('THIS MY CONSOLE', res.body);
                    expect(res.status).to.be.equal(200);
                    expect(res.body).to.have.property('message', 'Successfully verfied your Email.');

                  case 14:
                  case "end":
                    return _context7.stop();
                }
              }
            }, _callee7);
          })));

        case 6:
        case "end":
          return _context8.stop();
      }
    }
  }, _callee8);
})));