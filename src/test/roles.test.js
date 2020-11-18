import mocha from 'mocha';
import chai from 'chai';
import { config } from 'dotenv';
import chaiHttp from 'chai-http';
import app from '../index';
import Models from '../database/models';
import { mockAdmin } from './mocks/mockUsers';

config();

chai.use(chaiHttp);

const { it, describe, beforeEach, afterEach } = mocha;
const { expect } = chai;

const { Role } = Models;

const siginIn = async (user) => {
  const userData = await chai.request(app).post('/api/users/signin').send(user);
  return `Bearer ${userData.body.data.token}`;
};

describe('roles Related Tests', async () => {
  beforeEach(async () => {
    await Role.destroy({
      where: {},
      truncate: true,
    });
  });
  afterEach(async () => {
    await Role.destroy({
      where: {},
      truncate: true,
    });
  });

  it('Should Register new roles as Admin', async () => {
    const token = await siginIn(mockAdmin);
    const res = await chai
      .request(app)
      .post('/api/roles')
      .send({ role: 'driver' })
      .set('auth', token);
    expect(res.status).to.be.equal(201);
    expect(res.body).to.have.property('message', 'Role created successfully');
  });

  it('Should not Register  new roles as Admin', async () => {
    const token = await siginIn(mockAdmin);
    const res = await chai
      .request(app)
      .post('/api/roles')
      .send()
      .set('auth', token);
    expect(res.status).to.be.equal(500);
    expect(res.body).to.have.property(
      'message',
      'There was an error while creating a role',
    );
  });
  it('Should Update  a role as Admin', async () => {
    const token = await siginIn(mockAdmin);

    const res = await chai
      .request(app)
      .post('/api/roles')
      .send({ role: 'driver' })
      .set('auth', token);

    const res2 = await chai
      .request(app)
      .patch(`/api/roles/${res.body.data.id}`)
      .send({ role: 'driver' })
      .set('auth', token);
    expect(res2.status).to.be.equal(201);
    expect(res2.body).to.have.property('message', 'Role updated successfully');
  });

  it('Should Delete  a role as Admin', async () => {
    const token = await siginIn(mockAdmin);

    const res = await chai
      .request(app)
      .post('/api/roles')
      .send({ role: 'driver' })
      .set('auth', token);

    const res2 = await chai
      .request(app)
      .delete(`/api/roles/${res.body.data.id}`)
      .set('auth', token);
    expect(res2.status).to.be.equal(200);
    expect(res2.body).to.have.property('message', 'Delete role successfully');
  });

  it('Should Get all roles as Admin', async () => {
    const token = await siginIn(mockAdmin);
    const res = await chai.request(app).get('/api/roles').set('auth', token);
    console.log('RESPONSE', res);
    expect(res.status).to.be.equal(200);
    expect(res.body).to.have.property('message', 'Successfully got All roles');
  });
});
