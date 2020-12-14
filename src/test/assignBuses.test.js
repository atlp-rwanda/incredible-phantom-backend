import mocha from 'mocha';
import chai, { request } from 'chai';
import { config } from 'dotenv';
import chaiHttp from 'chai-http';
import app from '../index';
import model from '../database/models';

const { Bus, Route } = model;

config();

chai.should();
chai.use(chaiHttp);
const { should, have } = chai;
const { it, describe, before } = mocha;

let token;
let bus;
let route;

describe('assign buses to routes', () => {
  before('creating bus and route for testing', async () => {
    await Bus.destroy({ where: {}, truncate: true });
    await Route.destroy({ where: {}, truncate: true });
    const res = await chai.request(app).post('/api/users/signin').send({
      email: 'admin@test.test',
      password: '123abc',
    });
    token = res.body.data.token;
    bus = await Bus.create({
      brand: 'volcano',
      plateNo: '565kd',
      driver: 'dam',
      seats: 33,
    });
    route = await Route.create({
      origin: 'nyacyonga',
      routeID: 86214,
      destination: 'kicukiro',
      distance: 45,
    });
  });
  it('should assign bus to route', (done) => {
    chai
      .request(app)
      .patch(`/api/assignments/${bus.id}`)
      .send({ routeID: route.id })
      .set({ auth: `Bearer ${token}` })
      .end((error, response) => {
        if (error) done(error);
        response.should.have.status(200);
        done();
      });
  });

  it('should not assign a bus if the bus id is not in database ', (done) => {
    chai
      .request(app)
      .patch(`/api/assignments/${bus.id + 1}`)
      .send({ routeID: route.id })
      .set({ auth: `Bearer ${token}` })
      .end((error, response) => {
        if (error) done(error);
        response.should.have.status(404);
        done();
      });
  });

  it('should get all assigned buses with their respective route ', (done) => {
    chai
      .request(app)
      .get('/api/assignments')
      .set({ auth: `Bearer ${token}` })
      .end((error, response) => {
        if (error) done(error);
        response.should.have.status(200);
        done();
      });
  });
});
