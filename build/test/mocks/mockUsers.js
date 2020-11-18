"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wrongPwd = exports.mockAdmin = exports.mockUser = void 0;
var mockUser = {
  firstName: 'tester1',
  lastName: 'tester60',
  email: 'operator2@gmail.com',
  nationalId: 1392417020048424,
  phone: '0935045502',
  language: 'en',
  role: 'operator'
};
exports.mockUser = mockUser;
var mockAdmin = {
  email: 'admin@gmail.com',
  password: '123abc'
};
exports.mockAdmin = mockAdmin;
var wrongPwd = {
  email: 'admin@gmail.com',
  password: '123ab2'
};
exports.wrongPwd = wrongPwd;