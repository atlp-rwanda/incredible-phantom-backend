"use strict";

var _mocha = _interopRequireDefault(require("mocha"));

var _chai = _interopRequireDefault(require("chai"));

var _dotenv = require("dotenv");

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _index = _interopRequireDefault(require("../index"));

var _models = _interopRequireDefault(require("../database/models"));

var _mockUsers = require("./mocks/mockUsers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

(0, _dotenv.config)();

_chai["default"].use(_chaiHttp["default"]);

var it = _mocha["default"].it,
    describe = _mocha["default"].describe,
    beforeEach = _mocha["default"].beforeEach,
    afterEach = _mocha["default"].afterEach;
var expect = _chai["default"].expect;
var Role = _models["default"].Role;

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

describe('roles Related Tests', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
  return regeneratorRuntime.wrap(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          beforeEach( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    _context2.next = 2;
                    return Role.destroy({
                      where: {},
                      truncate: true
                    });

                  case 2:
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
                    return Role.destroy({
                      where: {},
                      truncate: true
                    });

                  case 2:
                  case "end":
                    return _context3.stop();
                }
              }
            }, _callee3);
          })));
          it('Should Register new roles as Admin', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
            var token, res;
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    _context4.next = 2;
                    return siginIn(_mockUsers.mockAdmin);

                  case 2:
                    token = _context4.sent;
                    _context4.next = 5;
                    return _chai["default"].request(_index["default"]).post('/api/roles').send({
                      role: 'driver'
                    }).set('Authorization', token);

                  case 5:
                    res = _context4.sent;
                    expect(res.status).to.be.equal(201);
                    expect(res.body).to.have.property('message', 'Role created successfully');

                  case 8:
                  case "end":
                    return _context4.stop();
                }
              }
            }, _callee4);
          })));
          it('Should not Register  new roles as Admin', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
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
                    return _chai["default"].request(_index["default"]).post('/api/roles').send().set('Authorization', token);

                  case 5:
                    res = _context5.sent;
                    expect(res.status).to.be.equal(500);
                    expect(res.body).to.have.property('message', 'There was an error while creating a role');

                  case 8:
                  case "end":
                    return _context5.stop();
                }
              }
            }, _callee5);
          })));
          it('Should Update  a role as Admin', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
            var token, res, res2;
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
                      role: 'driver'
                    }).set('Authorization', token);

                  case 5:
                    res = _context6.sent;
                    _context6.next = 8;
                    return _chai["default"].request(_index["default"]).patch("/api/roles/".concat(res.body.data.id)).send({
                      role: 'driver'
                    }).set('Authorization', token);

                  case 8:
                    res2 = _context6.sent;
                    expect(res2.status).to.be.equal(201);
                    expect(res2.body).to.have.property('message', 'Role updated successfully');

                  case 11:
                  case "end":
                    return _context6.stop();
                }
              }
            }, _callee6);
          })));
          it('Should Delete  a role as Admin', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
            var token, res, res2;
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
                      role: 'driver'
                    }).set('Authorization', token);

                  case 5:
                    res = _context7.sent;
                    _context7.next = 8;
                    return _chai["default"].request(_index["default"])["delete"]("/api/roles/".concat(res.body.data.id)).set('Authorization', token);

                  case 8:
                    res2 = _context7.sent;
                    expect(res2.status).to.be.equal(200);
                    expect(res2.body).to.have.property('message', 'Delete role successfully');

                  case 11:
                  case "end":
                    return _context7.stop();
                }
              }
            }, _callee7);
          })));
          it('Should Get all roles as Admin', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
            var token, res;
            return regeneratorRuntime.wrap(function _callee8$(_context8) {
              while (1) {
                switch (_context8.prev = _context8.next) {
                  case 0:
                    _context8.next = 2;
                    return siginIn(_mockUsers.mockAdmin);

                  case 2:
                    token = _context8.sent;
                    _context8.next = 5;
                    return _chai["default"].request(_index["default"]).get('/api/roles').set('Authorization', token);

                  case 5:
                    res = _context8.sent;
                    expect(res.status).to.be.equal(200);
                    expect(res.body).to.have.property('message', 'Successfully got All roles');

                  case 8:
                  case "end":
                    return _context8.stop();
                }
              }
            }, _callee8);
          })));

        case 7:
        case "end":
          return _context9.stop();
      }
    }
  }, _callee9);
})));