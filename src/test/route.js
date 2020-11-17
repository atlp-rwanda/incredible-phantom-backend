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

describe('Route tesing', () => {
  it('it should get all routes ', async () => {
    const token = await signIn(mockAdmin);
    const res = await chai.request(app).get('/api/route').set('auth', token);
    if (res.body.data) {
      expect(res.body.message).to.be.equal('All routes');
      expect(res.status).to.be.equal(200);
    }
  });

  it('its should display a corresponding message on empty response', async () => {
    const token = await signIn(mockAdmin);
    const res = await chai.request(app).get('/api/route').set('auth', token);
    if (!res.body.data) {
      expect(res.status).to.be.equal(404);
      expect(res.body.message).to.be.equal('No created routes , Please add one');
    }
  });

  it('it should create a route', async () => {
    const token = await signIn(mockAdmin);
    const data = {
      origin: 'Test',
      destination: 'Test',
      distance: '45km',
    };
    const res = await chai.request(app).post('/api/route').set('auth', token).send(data);
    if (res.body.data) {
      expect(res.status).to.be.equal(201);
      expect(res.body.message).to.be.equal('Route created successfully');
      expect(res.body.data).to.not.be.empty;
    }
  });

  it('its should display an error message while tempting to create an already existing route', async () => {
    const data = {
      origin: 'Test',
      destination: 'Test',
      distance: '45km',
    };
    const token = await signIn(mockAdmin);
    const res = await chai.request(app).post('/api/route').set('auth', token).send(data);
    if (!res.body.data) {
      expect(res.status).to.be.equal(409);
      expect(res.body.message).to.be.equal('Route already exists');
      expect(res.body.success).to.be.equal(false);
    }
  });

  it('it should update a route', async () => {
    const token = await signIn(mockAdmin);
    const data = {
      origin: 'Remera',
      destination: 'Kabeza',
      distance: '45km',
    };
    const routeID = 42205;
    const res = await chai.request(app).patch(`/api/route/${routeID}`).set('auth', token).send(data);
    if (res.body.data) {
      expect(res.status).to.be.equal(200);
      expect(res.body.data).to.not.be.empty;
      expect(res.body.message).to.be.equal('Route updated successfully');
      expect(res.body.success).to.be.equal(true);
    }
  });

  it('it should display an error message while trying to update a route with already existing credentials', async () => {
    const token = await signIn(mockAdmin);
    const data = {
      origin: 'Remera',
      destination: 'Kabeza',
      distance: '45km',
    };
    const routeID = 42205;
    const res = await chai.request(app).patch(`/api/route/${routeID}`).set('auth', token).send(data);
    if (res.status === 404) {
      expect(res.status).to.be.equal(404);
      expect(res.body.message).to.be.equal('Route not found :(');
      expect(res.body.success).to.be.equal(false);
    } else if (res.body.data) {
      expect(res.status).to.be.equal(200);
      expect(res.body.message).to.be.equal('One route');
      expect(res.body.success).to.be.equal(true);
    } else {
      expect(res.status).to.be.equal(403);
      expect(res.body.message).to.be.equal('One of the routes has the same information');
      expect(res.body.success).to.be.equal(false);
    }
  });

  it('it should get one route', async () => {
    const token = await signIn(mockAdmin);
    const routeID = 42205;
    const res = await chai.request(app).get(`/api/route/${routeID}`).set('auth', token);
    if (res.body.data) {
      expect(res.status).to.be.equal(200);
      expect(res.body.message).to.be.equal('One route');
    } else {
      expect(res.status).to.be.equal(404);
      expect(res.body.message).to.be.equal('Route not found :(');
    }
  });

  it('it should display an error message when the trying to get a route which does not exists', async () => {
    const token = await signIn(mockAdmin);
    const routeID = 10020;
    const res = await chai.request(app).get(`/api/route/${routeID}`).set('auth', token);
    expect(res.body.message).to.be.equal('Route not found :(');
    expect(res.body.success).to.be.equal(false);
    expect(res.status).to.be.equal(404);
  });

  it('it should display an error message when the user is not logged in', async () => {
    const res = await chai.request(app).get('/api/route');
    expect(res.body.message).to.be.equal('Please login first');
    expect(res.body.success).to.be.equal(false);
    expect(res.status).to.be.equal(401);
  });

  it('it should display an error message on unAuthorized users', async () => {
    const res = await chai.request(app).get('/api/route').set('auth', 'Bearer 8389y29idbsibciabxxx');
    expect(res.body.message).to.be.equal('Not Authorized');
    expect(res.body.success).to.be.equal(false);
    expect(res.status).to.be.equal(401);
  });
});
