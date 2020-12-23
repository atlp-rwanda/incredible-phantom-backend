import mocha from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import model from '../database/models';
import { mockRoute } from './mocks/mockRoutes';
import { mockBus } from './mocks/mockBus';
import { mockAdmin } from './mocks/mockUsers';

chai.use(chaiHttp);

const { Route, Bus } = model;
const { expect } = chai;
const { it, describe, beforeEach, afterEach } = mocha;

describe('List of Buses on a Specific Route ', () => {
  beforeEach(async () => {
    const userData = await chai
      .request(app)
      .post('/api/users/signin')
      .send(mockAdmin);
    const token = `Bearer ${userData.body.data.token}`;
    const route = await chai
      .request(app)
      .post('/api/route')
      .set('auth', token)
      .send(mockRoute);
    const bus = await chai
      .request(app)
      .post('/api/bus')
      .set('auth', token)
      .send(mockBus);
    await chai
      .request(app)
      .post(`/api/assignBusToRoute/${route.body.data.routeID}`)
      .set('auth', token)
      .send({ busId: bus.body.Bus.id });
  });
  afterEach(async () => {
    await Route.destroy({
      where: { origin: 'test' },
      truncate: true
    });
    await Bus.destroy({
      truncate: true
    });
  });
  it('it should get all bus on a specific route', async () => {
    const res = await chai
      .request(app)
      .get('/api/bus/busesOnRoute?origin=test&destination=test');
    expect(res.status).to.be.equal(200);
    expect(res.body.message).to.be.equal(
      'Buses on this route returned successfully'
    );
  });

  it('it should return route with locations not found', async () => {
    const res = await chai
      .request(app)
      .get('/api/bus/busesOnRoute?origin=test&destination=testttttttt');
    expect(res.status).to.be.equal(404);
    expect(res.body.message).to.be.equal('route with locations not found');
  });
  it('it should return there was an error while getting the list of buses on this route', async () => {
    const res = await chai
      .request(app)
      .get('/api/bus/busesOnRoute?originn=test&destination=test');
    expect(res.status).to.be.equal(500);
    expect(res.body.message).to.be.equal(
      'There was an error while getting the list of buses on this route'
    );
  });
});
