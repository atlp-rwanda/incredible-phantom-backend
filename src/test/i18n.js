import mocha from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.should();
chai.use(chaiHttp);
const { expect } = chai;
const { it, describe } = mocha;

describe('Testing translations', () => {
  it('it should translate the welcoming message to french', async () => {
    const res = await chai.request(app).get('/api?lang=fr');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.have.property(
      'message',
      'Bienvenue dans Phantom, une application utilisée pour suivre les bus',
    );
  });
  it('it should translate the welcoming message to kinyarwanda', async () => {
    const res = await chai.request(app).get('/api?lang=kin');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.have.property(
      'message',
      'Murakza neza kuri phantom igufasha kureba ingendo za bus yawe',
    );
  });
});
