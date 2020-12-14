import mocha from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import { mockAdmin } from './mocks/mockUsers';
import { mockBus, updateMockBus } from './mocks/mockBus';
import model from '../database/models';
chai.should();
chai.use(chaiHttp);
const { expect } = chai;
const { it, describe, after } = mocha;
const { Bus } = model;
const signIn = async (user) => {
  const userData = await chai.request(app).post('/api/users/signin').send(user);
  return `Bearer ${userData.body.data.token}`;
};
describe('Bus CRUD tesing', async () => {
  after(async () => {
    await Bus.destroy({ where: { brand: 'test' } });
  });
  it('it should create a bus ', async () => {
    const token = await signIn(mockAdmin);
    const res = await chai
      .request(app)
      .post('/api/bus')
      .set('auth', token)
      .send(mockBus);
    expect(res.status).to.be.equal(201);
    expect(res.body.message).to.be.equal('Bus created successfully.');
  });
  it('it should get all buses ', async () => {
    const token = await signIn(mockAdmin);
    const res = await chai.request(app).get('/api/bus');
    expect(res.status).to.be.equal(200);
  });
  it('it should get one bus', async () => {
    const busID = 1;
    const res = await chai.request(app).get(`/api/bus/${busID}`);
    expect(res.status).to.be.equal(200);
    expect(res.body.message).to.be.equal('Bus found');
  });
  it('it should update a bus', async () => {
    const token = await signIn(mockAdmin);
    const busID = 1;
    const res = await chai
      .request(app)
      .patch(`/api/bus/${busID}`)
      .set('auth', token)
      .send(updateMockBus);
    expect(res.status).to.be.equal(200);
    expect(res.body.message).to.be.equal('Bus updated successfully');
    expect(res.body.success).to.be.equal(true);
  });
  it('it should delete a bus', async () => {
    const busID = 1;
    const token = await signIn(mockAdmin);
    const res = await chai
      .request(app)
      .delete(`/api/bus/${busID}`)
      .set('auth', token);
    expect(res.status).to.be.equal(201);
    expect(res.body.message).to.be.equal('Bus deleted successfully');
  });
});
