"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _welcome = _interopRequireDefault(require("../controllers/welcome"));

var _translate = _interopRequireDefault(require("../controllers/translate"));

var _rolesRouter = _interopRequireDefault(require("./rolesRouter"));

var _usersRouter = _interopRequireDefault(require("./usersRouter"));

var _i18n = _interopRequireDefault(require("../controllers/i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)();
/**
 * @swagger
 * /api:
 *   get:
 *     tags:
 *       - Welcome
 *     name: Welcome
 *     summary: Welcome message
 *     produces:
 *       - application/json
 *     responses:
 *       '200':
 *             description:  Welcome Phantom the which tracks buses.
 *       '500':
 *             description: There was an error while welcoming you.
 * */

router.get('/', _welcome["default"]);
router.use('/users', _usersRouter["default"]);
router.use('/roles', _rolesRouter["default"]);
router.get('/translate', _i18n["default"]);
router.post('/translate', _translate["default"]);
router.use('/users', _usersRouter["default"]);
var _default = router;
exports["default"] = _default;