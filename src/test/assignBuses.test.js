import mocha from 'mocha';
import chai from 'chai';
import { config } from 'dotenv';
import chaiHttp from 'chai-http';
import app from '../index';
import model from '../database/models';
import { mockAdmin } from './mocks/mockUsers';
import { mockBus } from './mocks/mockBus';
import { mockRoute } from './mocks/mockRoutes';
const { Bus, Route } = model;
config();
chai.use(chaiHttp);
const { expect } = chai;
const { it, describe, before } = mocha;
const signIn = async (user) => {
  const userData = await chai.request(app).post('/api/users/signin').send(user);
  return `Bearer ${userData.body.data.token}`;
};
let bus;
let route;
let token;
describe('assign buses to routes', () => {
  beforeEach(async () => {
    token = await signIn(mockAdmin);
    bus = await chai
      .request(app)
      .post('/api/bus')
      .set('auth', token)
      .send(mockBus);

    route = await chai
      .request(app)
      .post('/api/route')
      .set('auth', token)
      .send(mockRoute);
  });
  afterEach(async () => {
    await Bus.destroy({ where: {}, truncate: true });
    await Route.destroy({ where: {}, truncate: true });
  });
  it('should assign bus to route', async () => {
    const response = await chai
      .request(app)
      .post(`/api/assignBusToRoute/${route.body.data.routeID}`)
      .set('auth', token)
      .send({ busId: bus.body.Bus.id });
    expect(response.status).to.be.equal(200);
    expect(response.body).to.have.property(
      'message',
      'Bus assigned to route successfully'
    );
  });

  it('should not assign a bus if the bus id is not in database ', async () => {
    const response = await chai
      .request(app)
      .post(`/api/assignBusToRoute/${route.body.data.routeID}`)
      .send({ busId: 4847 })
      .set('auth', token);
    expect(response.status).to.be.equal(404);
    expect(response.body).to.have.property('message');
    expect(response.body.message).to.be.equal('Bus not found');
  });
  it('should not assign the bus if the route id is not in database ', async () => {
    const response = await chai
      .request(app)
      .post('/api/assignBusToRoute/123')
      .send({ busId: 1234 })
      .set('auth', token);
    expect(response.status).to.be.equal(404);
    expect(response.body).to.have.property('message');
    expect(response.body.message).to.be.equal('Route not found');
  });

  it('should unassign bus to route', async () => {
    await chai
      .request(app)
      .post(`/api/assignBusToRoute/${route.body.data.routeID}`)
      .set('auth', token)
      .send({ busId: bus.body.Bus.id });

    const response = await chai
      .request(app)
      .delete(`/api/assignBusToRoute/${route.body.data.routeID}`)
      .send({ busId: bus.body.Bus.id })
      .set('auth', token);
    expect(response.status).to.be.equal(200);
    expect(response.body).to.have.property('message');
    expect(response.body.message).to.be.equal(
      'Bus is un-assigned to this route successfully'
    );
  });
});
