import chai from 'chai';
import chaiHttp from 'chai-http';
import mocha from 'mocha';
import app from '../index';
import { mockAdmin } from './mocks/mockUsers';
import { mockBusStop, updateMockBusStop, mockRoute } from './mocks/mockRoutes';

chai.should();
chai.use(chaiHttp);
const { expect } = chai;
const { it, describe } = mocha;

const signIn = async (user) => {
  const userData = await chai.request(app).post('/api/users/signin').send(user);
  return `Bearer ${userData.body.data.token}`;
};

describe('busStop API', () => {
  it('it should create a new bus stop', async () => {
    const token = await signIn(mockAdmin);
    const response = await chai
      .request(app)
      .post('/api/busStop')
      .send(mockBusStop)
      .set('auth', token);
    expect(response.status).to.be.equal(201);
    expect(response.body).to.have.property(
      'message',
      'Bus stop created successfully',
    );
  });
  it('it should get all the bus stops', async () => {
    const token = await signIn(mockAdmin);
    const res = await chai.request(app).get('/api/busStop').set('auth', token);
    expect(res.status).to.be.equal(200);
    expect(res.body).to.have.property('message', 'All busStops');
  });
  it('it should get One bus stop by ID', async () => {
    const token = await signIn(mockAdmin);
    const foundBusStop = await chai
      .request(app)
      .get('/api/busStop')
      .set('auth', token);
    const id = foundBusStop.body.data[0].busStopId;
    const res = await chai
      .request(app)
      .get(`/api/busStop/${id}`)
      .set('auth', token);
    expect(res.status).to.be.equal(200);
    expect(res.body).to.have.property('message', 'One bus stop');
  });
  it('it should Update an existing bus stop', async () => {
    const token = await signIn(mockAdmin);
    const foundBusStop = await chai
      .request(app)
      .get('/api/busStop')
      .set('auth', token);
    const id = foundBusStop.body.data[0].busStopId;
    const response = await chai
      .request(app)
      .patch(`/api/busStop/${id}`)
      .send(updateMockBusStop)
      .set('auth', token);
    expect(response.status).to.be.equal(200);
    expect(response.body).to.have.property(
      'message',
      'Bus stop updated successfully',
    );
  });
  it('it should delete One bus stop by ID', async () => {
    const token = await signIn(mockAdmin);
    const foundBusStop = await chai
      .request(app)
      .get('/api/busStop')
      .set('auth', token);
    await chai
      .request(app)
      .post('/api/route')
      .set('auth', token)
      .send(mockRoute);
    const route = await chai.request(app).get('/api/route').set('auth', token);
    const foundRouteId = route.body.data.routes[0].routeID;
    const { busStopId } = foundBusStop.body.data[0];
    const response = await chai
      .request(app)
      .delete(`/api/busStop/${busStopId}`)
      .set('auth', token);
    await chai
      .request(app)
      .delete(`/api/route/${foundRouteId}`)
      .set('auth', token);
    expect(response.status).to.be.equal(200);
    expect(response.body).to.have.property('message', 'bus stop deleted');
  });
});
