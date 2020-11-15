const io = require('socket.io')();
import emitter from './eventEmitter';
import jwt from 'jsonwebtoken';
import Models from '../database/models';

const { Notification } = Models;

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_KEY);
};

const findNotifications = async (id) => {
  return Notification.findAll({ where: { receiverId: id, is_read: false } });
};

const socketFunction = {};
socketFunction.socketStarter = (server) => {
  io.attach(server);
  io.on('connection', async (socket) => {
    emitter.on('request created', async () => {
      const token = socket.handshake.auth.token;
      const userData = verifyToken(token);
      const data = await findNotifications(userData.id);
      socket.emit('newNotification', data);
    });
  });
};
export default { socketFunction, io };
