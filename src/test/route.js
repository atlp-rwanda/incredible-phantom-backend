import mocha from 'mocha'
import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../index'

chai.should();
chai.use(chaiHttp);
const { should, have, expect} = chai;
const { it, describe, beforeEach, afterEach } = mocha;


describe('Route tesing' , () => {
    it('it should get all routes ' , async () => {
        const res = await chai.request(app).get('/route');
        if(res.body.data === undefined ){
            expect(res.body).to.have.property('message' , 'No created routes , Please add one');
        }else{
            expect(res.status).to.be.equal(200);
            expect(res.body.message).to.be.eql('All routes');
        }
    });
    it('it should create a route' , async () => {
        const data = {
            start : "Remera",
            end : "Kimironko",
            distance : "45km"
        }
        const res = await chai.request(app).post('/route').send(data);
        expect(res.status).to.be.equal(200);
    });
    it('it should update a route' , async () => {
        const data = {
            start : "Remera",
            end : "Kimironko",
            distance : "45km"
        }
        const id = 8;
        const res = await chai.request(app).patch(`/route/${id}`).send(data);
        expect(res.status).to.be.equal(200);
    })
    it('it should get one route' , async () => {
        const id = 8;
        const res = await chai.request(app).get(`/route/${id}`);
        expect(res.body.message).to.be.equal("One route");
        expect(res.status).to.be.equal(200);
    })
});