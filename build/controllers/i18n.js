"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _i18n = _interopRequireDefault(require("i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function translate(req, res) {
  _i18n["default"].configure({
    locales: ['en', 'kin', 'fr', 'sw'],
    directory: "".concat(__dirname, "/locales"),
    defaultLocale: 'en',
    headers: 'Accept-language'
  });

  _i18n["default"].init(req, res);

  res.end(res.__('Welcome to phantom'));
}

var _default = translate;
exports["default"] = _default;