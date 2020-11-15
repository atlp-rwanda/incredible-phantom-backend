import mocha from 'mocha';
import chai from 'chai';
import { config } from 'dotenv';
import chaiHttp from 'chai-http';
import app from '../index';
import Models from '../database/models';
import { mockAdmin, mockDriver } from './mocks/mockUsers';
import { mockBus } from './mocks/mockBus';

config();

chai.use(chaiHttp);

const { it, describe } = mocha;
const { expect } = chai;
const { Notification } = Models;

const siginIn = async (user) => {
  const userData = await chai.request(app).post('/api/users/signin').send(user);
  const data = {
    id: userData.body.data.id,
    token: `Bearer ${userData.body.data.token}`,
  };
  return data;
};

describe('Assigning driver to route related tests', async () => {
  it('Should assign Driver to bus', async () => {
    const userData = await siginIn(mockAdmin);
    const token = userData.token;

    const driverData = await siginIn(mockDriver);
    const driverId = await driverData.id;

    const bus = await chai
      .request(app)
      .post('/api/bus')
      .set('auth', token)
      .send(mockBus);

    const busId = bus.body.Bus.id;

    const res = await chai
      .request(app)
      .patch(`/api/users/${driverId}/assignToBus`)
      .send({ busId })
      .set('auth', token);

    expect(res.status).to.be.equal(200);
  });

  it('Should unassign Driver to bus', async () => {
    const userData = await siginIn(mockAdmin);
    const token = userData.token;

    const driverData = await siginIn(mockDriver);
    const driverId = await driverData.id;
    const res = await chai
      .request(app)
      .patch(`/api/users/${driverId}/unassignToBus`)
      .set('auth', token);
    expect(res.status).to.be.equal(200);
  });

  it('Should get all notifications ', async () => {
    const driverData = await siginIn(mockDriver);
    const driverToken = driverData.token;
    const res = await chai
      .request(app)
      .get('/api/users/notifications')
      .set('auth', driverToken);
    expect(res.status).to.be.equal(200);
  });

  it('Should get one notifications ', async () => {
    const driverData = await siginIn(mockDriver);
    const driverToken = driverData.token;
    const driverId = await driverData.id;

    const notification = await Notification.create({
      is_read: false,
      content: 'test not',
      receiverId: driverId,
    });

    const res = await chai
      .request(app)
      .get(`/api/users/notifications/${notification.dataValues.id}`)
      .set('auth', driverToken);
    expect(res.status).to.be.equal(200);
  });

  it('Should delete notifications ', async () => {
    const driverData = await siginIn(mockDriver);
    const driverToken = driverData.token;
    const driverId = await driverData.id;

    const notification = await Notification.create({
      is_read: false,
      content: 'test not',
      receiverId: driverId,
    });
    const res = await chai
      .request(app)
      .delete(`/api/users/notifications/${notification.dataValues.id}`)
      .set('auth', driverToken);
    expect(res.status).to.be.equal(200);
  });

  it('Should get a list of driver assignment to buses ang get 404 when it none  ', async () => {
    const userData = await siginIn(mockAdmin);
    const token = userData.token;

    const res = await chai
      .request(app)
      .get('/api/users/driversAssignedToBuses')
      .set('auth', token);

    expect(res.status).to.be.equal(404);
  });
});
