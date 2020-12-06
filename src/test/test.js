import mocha from 'mocha';
import chai from 'chai';
import jwt from 'jsonwebtoken';
import "dotenv/config";
import chaiHttp from 'chai-http';
import app from '../index.js';

chai.should();
chai.use(chaiHttp);
const { should, have, expect} = chai;
const { it, describe, beforeEach, afterEach } = mocha;


describe('API testing', () => {
    it('it should display the welcome message', async () => {
        const res = await chai.request(app).get('/api');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.have.property('message', 'Welcome to phantom an app which is used to track buses');
    });
});
describe('get/api/post',()=>{
    it ('it should send a link in the email', ()=>{

        const email={
        email:'fake@gmail.com'
        };
        chai.request(app)
        .post('/api/users/forgot')
        .send(email)
        .end((err,response)=>{
            response.should.be.status(200)
            done();
        })
    })
})
describe('get/api/patch',()=>{
    it ('it should update the password', ()=>{

        const data={
            email:'fake@gmail.com',
            password:'fakepassword'
        };
        const token = jwt.sign(
            { id: "foundUser.id", email: "foundUser.email" },
            process.env.JWT_KEY,
          );

        chai.request(app)
        .patch('/api/users/reset')
        .set("authorization",`Bearer ${token}`)
        .send(data)
        .end((err,response)=>{
            response.should.have.status(200)
            done();
        })
    })
})