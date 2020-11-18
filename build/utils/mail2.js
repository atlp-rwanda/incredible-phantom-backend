"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = require("dotenv");

var _nodemailer = _interopRequireDefault(require("nodemailer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

(0, _dotenv.config)();
var _process$env = process.env,
    EMAIL = _process$env.EMAIL,
    PASS = _process$env.PASS,
    JWT_KEY = _process$env.JWT_KEY,
    PORT = _process$env.PORT;

var sendEmail = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(type) {
    var data,
        token,
        transporter,
        mailOptions,
        info,
        _args = arguments;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            data = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
            _context.prev = 1;
            token = _jsonwebtoken["default"].sign(data, JWT_KEY, {
              expiresIn: '8h'
            });
            transporter = _nodemailer["default"].createTransport({
              host: 'smtp.gmail.com',
              port: 587,
              secure: false,
              auth: {
                user: EMAIL,
                // generated ethereal user
                pass: PASS // generated ethereal password

              }
            });
            mailOptions = {
              from: '"Phantom" atlpincredible@gmail.com ',
              // sender address
              to: "".concat(data.email),
              // list of receivers
              subject: "".concat(type) // Subject line

            };
            _context.t0 = type;
            _context.next = _context.t0 === 'comfirmation' ? 8 : _context.t0 === 'verify' ? 10 : 12;
            break;

          case 8:
            mailOptions.html = "<h1>Welcome to Phantom  ".concat(data.name, ", Enjoy your new role</h1>");
            return _context.abrupt("break", 13);

          case 10:
            mailOptions.html = "<h1>verify your email</h1>\n        <p>Your Password is <h2>".concat(data.password, "</h2></p>\n         <a href='http://localhost:").concat(PORT, "/users/verify/").concat(token, "'>click here to verify your Account</a><h2>Remember if you dont do it this link will expire in 1day</h2></p>");
            return _context.abrupt("break", 13);

          case 12:
            mailOptions.html = '';

          case 13:
            _context.next = 15;
            return transporter.sendMail(mailOptions);

          case 15:
            info = _context.sent;
            console.log('Preview URL:', _nodemailer["default"].getTestMessageUrl(info));
            _context.next = 22;
            break;

          case 19:
            _context.prev = 19;
            _context.t1 = _context["catch"](1);
            return _context.abrupt("return", console.log(_context.t1));

          case 22:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 19]]);
  }));

  return function sendEmail(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _default = sendEmail;
exports["default"] = _default;