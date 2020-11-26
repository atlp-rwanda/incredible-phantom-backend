import mocha from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import Models from '../database/models';

chai.use(chaiHttp);

const { it, describe, beforeEach, afterEach } = mocha;
const { expect } = chai;

const { User } = Models;

const mockUser = {
  firstName: 'Fake',
  lastName: 'Fakename',
  email: 'fakeemail@gmail.com',
  nationalId: 1199999999999999,
  phone: '0788888888',
  language: 'en',
  role: 'operator',
};

describe('Users Related Tests', () => {
  beforeEach(async () => {
    await User.destroy({
      where: {},
      truncate: true,
    });
  });

  afterEach(async () => {
    await User.destroy({
      where: {},
      truncate: true,
    });
  });

  it('Get all Users', async () => {
    const res = await chai.request(app).get('/api/users');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.have.property('message', 'Successfully got All users');
  });

  it('Register a User', async () => {
    const res = await chai.request(app).post('/api/users').send(mockUser);
    expect(res.status).to.be.equal(201);
    expect(res.body).to.have.property(
      'message',
      'User created Successfully and email was sent',
    );
  });
});
