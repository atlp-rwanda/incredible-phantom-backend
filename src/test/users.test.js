import mocha from 'mocha';
import chai, { request } from 'chai';
import { Op } from 'sequelize';
import { config } from 'dotenv';
import chaiHttp from 'chai-http';
import app from '../index';
import Models from '../database/models';
import {
  mockAdmin,
  mockOperator,
  mockUser,
  wrongPwd,
  mockUpdate,
  noNameFound,
  emptyFirstname,
  emptyLastname
} from './mocks/mockUsers';
config();
chai.use(chaiHttp);
const { it, describe, beforeEach, afterEach } = mocha;
const { expect } = chai;
const { User, Role } = Models;
const siginIn = async (user) => {
  const userData = await chai.request(app).post('/api/users/signin').send(user);
  return `Bearer ${userData.body.data.token}`;
};
describe('Users Related Tests', async () => {
  beforeEach(async () => {
    await User.destroy({
      where: { email: { [Op.not]: ['admin@test.test', 'operator@test.test'] } }
    });
    await Role.destroy({
      where: {},
      truncate: true
    });
  });
  afterEach(async () => {
    await User.destroy({
      where: { email: { [Op.not]: ['admin@test.test', 'operator@test.test'] } }
    });
  });
  it(' Should not sign in Incorect password', async () => {
    const res = await chai
      .request(app)
      .post('/api/users/signin')
      .send(wrongPwd);
    expect(res.status).to.be.equal(400);
    expect(res.body).to.have.property('message', 'Incorrect Email or password');
  });
  it('Should Get all Users as Admin', async () => {
    const token = await siginIn(mockAdmin);
    const res = await chai.request(app).get('/api/users').set('auth', token);
    expect(res.status).to.be.equal(200);
    expect(res.body).to.have.property('message', 'Successfully got All users');
  });
  it('Should Get all Users as Operator', async () => {
    const token = await siginIn(mockOperator);
    const res = await chai.request(app).get('/api/users').set('auth', token);
    expect(res.status).to.be.equal(200);
    expect(res.body).to.have.property(
      'message',
      'Successfully got All drivers'
    );
  });
  it('Should Register a User', async () => {
    const token = await siginIn(mockAdmin);
    await chai
      .request(app)
      .post('/api/roles')
      .send({ role: 'operator' })
      .set('auth', token);
    const res = await chai
      .request(app)
      .post('/api/users')
      .send(mockUser)
      .set('auth', token);
    expect(res.status).to.be.equal(201);
    expect(res.body).to.have.property(
      'message',
      'User created Successfully and email was sent'
    );
  });
  it('Should Not Register a User (validation error)', async () => {
    const token = await siginIn(mockAdmin);
    await chai
      .request(app)
      .post('/api/roles')
      .send({ role: 'operator' })
      .set('auth', token);
    const res = await chai
      .request(app)
      .post('/api/users')
      .send({
        firstName: 'tester1'
      })
      .set('auth', token);
    expect(res.status).to.be.equal(500);
    expect(res.body).to.have.property('message');
  });
  it('Should Comfirm User email', async () => {
    const token = await siginIn(mockAdmin);
    await chai
      .request(app)
      .post('/api/roles')
      .send({ role: 'operator' })
      .set('auth', token);
    const res1 = await chai
      .request(app)
      .post('/api/users')
      .send(mockUser)
      .set('auth', token);
    const res = await request(app).put(
      `/api/users/verify/${res1.body.data.id}`
    );
    expect(res.status).to.be.equal(200);
    expect(res.body).to.have.property(
      'message',
      'Successfully verfied your Email.'
    );
  });
  it('Should Logout a User', async () => {
    const token = await siginIn(mockAdmin);
    const res = await chai
      .request(app)
      .post('/api/users/logout')
      .set('auth', token);
    expect(res.status).to.be.equal(200);
    expect(res.body).to.have.property('message', 'Logged out successfully');
  });
  it('Should test forgot and reset password reset', async () => {
    const token = await siginIn(mockAdmin);
    await chai
      .request(app)
      .post('/api/roles')
      .send({ role: 'operator' })
      .set('auth', token);
    const res = await chai
      .request(app)
      .post('/api/users')
      .send(mockUser)
      .set('auth', token);
    const res1 = await request(app).post('/api/users/forgot').send({
      email: res.body.data.email
    });
    const resetToken = res1.body.data.split('reset/')[1];
    const res2 = await chai
      .request(app)
      .patch(`/api/users/reset/${resetToken}`)
      .send({ password: 'newpassword' });
    expect(res2.status).to.be.equal(200);
  });
  it('should update a user', async () => {
    const token = await siginIn(mockAdmin);
    await chai
      .request(app)
      .post('/api/roles')
      .send({ role: 'operator' })
      .set('auth', token);
    const res2 = await chai
      .request(app)
      .post('/api/users')
      .send(mockUser)
      .set('auth', token);
    const updateId = res2.body.data.id;
    const res = await chai
      .request(app)
      .patch(`/api/users/update/${updateId}`)
      .send(mockUpdate)
      .set('auth', token);
    expect(res.status).to.be.equal(200);
    expect(res.body).to.have.property('message', 'User Updated');
  });
  it('should be able to update the user if you are the user who logged in ', async () => {
    const token = await siginIn(mockAdmin);
    const token2 = await siginIn(mockOperator);
    const res1 = await chai.request(app).get('/api/users/').set('auth', token);
    const res2 = await chai.request(app).get('/api/users/').set('auth', token2);
    const updateId = res1.body.data[0].id;
    const res = await chai
      .request(app)
      .patch(`/api/users/update/${updateId}`)
      .send(mockUpdate)
      .set('auth', token2);
    expect(res.status).to.be.equal(200);
    expect(res.body).to.have.property('message', 'User Updated');
  });
  it('should find Names not provided', async () => {
    const token = await siginIn(mockAdmin);
    const res = await chai
      .request(app)
      .patch('/api/users/update/3')
      .send(noNameFound)
      .set('auth', token);
    expect(res.status).to.be.equal(400);
  });
  it('should not find First Name', async () => {
    const token = await siginIn(mockAdmin);
    const res = await chai
      .request(app)
      .patch('/api/users/update/3')
      .send(emptyFirstname)
      .set('auth', token);
    expect(res.status).to.be.equal(400);
  });
  it('should not find Last Name', async () => {
    const token = await siginIn(mockAdmin);
    const res = await chai
      .request(app)
      .patch('/api/users/update/3')
      .send(emptyLastname)
      .set('auth', token);
    expect(res.status).to.be.equal(400);
  });

  it('Should Get one User', async () => {
    const token = await siginIn(mockAdmin);
    const res = await chai
      .request(app)
      .get(`/api/users/${3}`)
      .set('auth', token);
    expect(res.status).to.be.equal(200);
    expect(res.body).to.have.property('message', 'Successfully got a user');
  });

  it('Should Delete one User', async () => {
    const token = await siginIn(mockAdmin);
    const res = await chai
      .request(app)
      .delete(`/api/users/${3}`)
      .send(mockUser)
      .set('auth', token);
    expect(res.status).to.be.equal(200);
    expect(res.body).to.have.property('message', 'Successfully deleted a user');
  });
});
