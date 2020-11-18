import mocha from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.should();
chai.use(chaiHttp);
const { expect } = chai;
const { it, describe } = mocha;

describe('API testing', () => {
  it('it should display the welcome message', async () => {
    const res = await chai.request(app).get('/api');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.have.property(
      'message',
      'Welcome to phantom an app which is used to track buses',
    );
  });
});
