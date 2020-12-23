import mocha from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import { mockAdmin } from './mocks/mockUsers';
import { mockRoute, updateMockRoute, mockBusStop } from './mocks/mockRoutes';
import model from '../database/models';

chai.should();
chai.use(chaiHttp);
const { expect } = chai;
const { it, describe, after } = mocha;
const { Route, busStop } = model;

const signIn = async (user) => {
  const userData = await chai.request(app).post('/api/users/signin').send(user);
  return `Bearer ${userData.body.data.token}`;
};

describe('Route testing', async () => {
  after(async () => {
    await Route.destroy({ where: { origin: 'test' } });
    await busStop.destroy({ where: { sector: 'test' } });
  });
  it('it should create a route', async () => {
    const token = await signIn(mockAdmin);
    const res = await chai
      .request(app)
      .post('/api/route')
      .set('auth', token)
      .send(mockRoute);
    expect(res.status).to.be.equal(201);
    expect(res.body.message).to.be.equal('Route created successfully');
  });
  it('it should get all routes ', async () => {
    const token = await signIn(mockAdmin);
    const res = await chai.request(app).get('/api/route').set('auth', token);
    expect(res.status).to.be.equal(200);
    expect(res.body).to.have.property('message', 'All routes');
  });
  it('it should update a route', async () => {
    const token = await signIn(mockAdmin);
    const route = await chai.request(app).get('/api/route').set('auth', token);
    const id = route.body.data.routes[0].routeID;
    const res = await chai
      .request(app)
      .patch(`/api/route/${id}`)
      .set('auth', token)
      .send(updateMockRoute);
    expect(res.status).to.be.equal(200);
    expect(res.body.message).to.be.equal('Route updated successfully');
  });
  it('it should get one route', async () => {
    const token = await signIn(mockAdmin);
    const route = await chai.request(app).get('/api/route').set('auth', token);
    const id = route.body.data.routes[0].routeID;
    const res = await chai
      .request(app)
      .get(`/api/route/${id}`)
      .set('auth', token);
    expect(res.status).to.be.equal(200);
    expect(res.body.message).to.be.equal('One route');
  });
  it('it should add a bus stop to a route', async () => {
    const token = await signIn(mockAdmin);
    await chai
      .request(app)
      .post('/api/busStop')
      .send(mockBusStop)
      .set('auth', token);
    const route = await chai.request(app).get('/api/route').set('auth', token);
    const routeId = route.body.data.routes[0].routeID;
    const stop = await chai.request(app).get('/api/busStop').set('auth', token);
    const { busStopId } = stop.body.data[0];
    const res = await chai
      .request(app)
      .patch(`/api/route/${routeId}/addBusStop`)
      .set('auth', token)
      .send({ busStopId });
    expect(res.status).to.be.equal(200);
    expect(res.body.message).to.be.equal(
      'Bus stop added to route successfully!'
    );
  });
  it('it should delete a route', async () => {
    const token = await signIn(mockAdmin);
    const route = await chai.request(app).get('/api/route').set('auth', token);

    const id = route.body.data.routes[0].routeID;
    const res = await chai
      .request(app)
      .delete(`/api/route/${id}`)
      .set('auth', token);
    expect(res.status).to.be.equal(200);
    expect(res.body.message).to.be.equal('Route deleted');
  });
});
