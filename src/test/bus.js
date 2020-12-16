import mocha from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import { mockAdmin } from './mocks/mockUsers';

chai.should();
chai.use(chaiHttp);
const { should, have, expect } = chai;
const {
  it, describe, beforeEach, afterEach,
} = mocha;

const signIn = async (user) => {
  const userData = await chai.request(app).post('/api/users/signin').send(user);
  return `Bearer ${userData.body.data.token}`;
};

describe('Bus CRUD ', () => {
  it('it should get all bus', async () => {
    const res = await chai.request(app).get('/api/bus');
    if (res.body.data) {
      expect(res.body.message).to.be.an('object');
    }
  });

  it('its should display a corresponding message on unauthorized request', async () => {
    const token = await signIn(mockAdmin);
    const res = await chai.request(app).get('/api/bus').set('auth', token);
    if (!res.body.data) {
      expect(res.status).to.be.equal(401);
    }
  });

  it('it should create a bus', async () => {
    const token = await signIn(mockAdmin);
    const data = {
      brand: 'Test',
      plate: 'Test',
      driver: 'Test',
    };
    const res = await chai.request(app).post('/api/bus').set('auth', token).send(data);
    if (res.body.data) {
      expect(res.status).to.be.equal(201);
      expect(res.body.message).to.be.equal('Bus created successfully');
    }
  });

  it('its should display an error message while tempting to create an already existing bus', async () => {
    const data = {
      brand: 'Test',
      plate: 'Test',
      driver: 'Test',
    };
    const token = await signIn(mockAdmin);
    const res = await chai.request(app).post('/api/bus').set('auth', token).send(data);
    if (!res.body.data) {
      expect(res.body.success).to.be.equal(false);
    }
  });

  it('it should update a bus', async () => {
    const token = await signIn(mockAdmin);
    const data = {
      brand: 'updateTest',
      plate: 'updateTest',
      driver: 'updateTest',
    };
    const busID = 1;
    const res = await chai.request(app).patch(`/api/bus/${busID}`).set('auth', token).send(data);
    if (res.body.data) {
      expect(res.status).to.be.equal(200);
      expect(res.body.message).to.be.equal('Bus updated successfully');
      expect(res.body.success).to.be.equal(true);
    }
  });

  it('it should display an error message while trying to update a bus which does not exist', async () => {
    const token = await signIn(mockAdmin);
    const data = {
      brand: 'Test',
      plate: 'Test',
      driver: 'Test',
    };
    const busID = 5;
    const res = await chai.request(app).patch(`/api/bus/${busID}`).set('auth', token).send(data);
    if (res.status === 404) {
      expect(res.status).to.be.equal(404);
      expect(res.body.message).to.be.equal('Bus not registered in the system ');
      expect(res.body.success).to.be.equal(false);
    }
  });

  it('it should get one bus', async () => {
    const busID = 1;
    const res = await chai.request(app).get(`/api/bus/${busID}`);
    if (res.body.data) {
      expect(res.status).to.be.equal(200);
      expect(res.body.message).to.be.equal('Bus found');
    } else {
      expect(res.status).to.be.equal(404);
      expect(res.body.message).to.be.equal('Bus not found');
    }
  });

  it('it should display an error message when the trying to get a bus which does not exists', async () => {
    const token = await signIn(mockAdmin);
    const busID = 111111;
    const res = await chai.request(app).get(`/api/bus/${busID}`).set('auth', token);
    expect(res.body.message).to.be.equal('Bus not found');
    expect(res.body.success).to.be.equal(false);
    expect(res.status).to.be.equal(404);
  });
});
