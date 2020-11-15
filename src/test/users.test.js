import mocha from 'mocha';
import chai, { request } from 'chai';
import { Op } from 'sequelize';
import { config } from 'dotenv';
import chaiHttp from 'chai-http';
import app from '../index';
import Models from '../database/models';
import { mockAdmin, mockOperator, mockUser, wrongPwd } from './mocks/mockUsers';

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
      where: { email: { [Op.not]: ['admin@test.test', 'operator@test.test'] } },
    });
    await Role.destroy({
      where: {},
      truncate: true,
    });
  });
  afterEach(async () => {
    await User.destroy({
      where: { email: { [Op.not]: ['admin@test.test', 'operator@test.test'] } },
    });
  });

  it(' Should not sign in Incorect password', async () => {
    const res = await chai
      .request(app)
      .post('/api/users/signin')
      .send(wrongPwd);
    expect(res.status).to.be.equal(400);
    expect(res.body).to.have.property('message', 'Incorrect password');
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
      'Successfully got All drivers',
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
      'User created Successfully and email was sent',
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
        firstName: 'tester1',
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
      `/api/users/verify/${res1.body.data.id}`,
    );
    expect(res.status).to.be.equal(200);
    expect(res.body).to.have.property(
      'message',
      'Successfully verfied your Email.',
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
      email: res.body.data.email,
    });

    const resetToken = res1.body.data.split('reset/')[1];
    const res2 = await chai
      .request(app)
      .patch(`/api/users/reset/${resetToken}`)
      .send({ password: 'newpassword' });
    expect(res2.status).to.be.equal(200);
  });
});
