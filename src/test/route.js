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
            origin : "Test",
            destination : "Test",
            distance : "45km"
        }
        const res = await chai.request(app).post('/route').send(data);
        expect(res.status).to.be.equal(200);
    });
    it('it should update a route' , async () => {
        const data = {
            origin : "Remera",
            destination : "Kimironko",
            distance : "45km"
        }
        const routeID = 42205;
        const res = await chai.request(app).patch(`/route/${routeID}`).send(data);
        if( res.body.data === undefined ){
            expect(res.status).to.be.equal(200);
            expect(res.body.message).to.be.equal('One of the routes has the same information')
        }else{
            expect(res.status).to.be.equal(200);
            expect(res.body.message).to.be.equal("Updated successfully") 
        }
    })
    it('it should get one route' , async () => {
        const routeID = 42205;
        const res = await chai.request(app).get(`/route/${routeID}`);
        expect(res.body.message).to.be.equal("One route");
        expect(res.status).to.be.equal(200);
    })
});



// import mocha from 'mocha';
// import chai from 'chai';
// import chaiHttp from 'chai-http';
// import app from '../index.js';
// import { response } from 'express';
// import model from '../database/models';
// const {Bus}=model;
// chai.should();
// chai.use(chaiHttp);
// const { should, have, expect} = chai;
// const { it, describe, beforeEach, afterEach } = mocha;
// describe('route CRUD Functionality ',()=>{
// it('should create a bus',(done)=>{

//     const bus = { 

//     origin : " test 3",
//     destination : "test 4",
//     distance : "test distance" 
// }

//     chai.request(app)
//     .post("/bus")
//     .send(bus)
//     .end((err,response)=>{
//         response.should.have.status(201);
//         done()
//     })
// })
// it('should not create a bus without data ',(done)=>{
//     const bus={brad:"tyanson",plte:"RA1523",drver:"chech"}
//     chai.request(app)
//     .post("/bus")
//     .send(bus)
//     .end((err,response)=>{
//         response.should.have.status(500);
//         done()
//     })
// })
// it('should get all bus ',(done)=>{
// chai.request(app)
// .get('/bus')
// .end((err,response)=>{
//     response.should.have.status(200);
//     done()
// })
// })
// it('should not get bus',(done)=>{
// chai.request(app)
// .get('/buss')
// .end((err,response)=>{
//     response.should.have.status(404);
//     done()
// })
// })
// it('should get one bus ',async()=>{
//     const bus=await Bus.create({brand:" test 0",plate:"test 9",driver:"test 8"})
//   await bus.save();
//     chai.request(app)
//     .get(`/bus/${bus.id}`)
//     .end((err,response)=>{
//         response.should.have.status(200);
//     })
// })
// it('should not get a bus ',(done)=>{
//     chai.request(app)
//     .get('/buss/1')
//     .end((err,response)=>{
//         response.should.have.status(404);
//         done()
//     })
// })
// it('should update a bus ',async()=>{
//     const bus=await Bus.create({brand:" test 012",plate:"test 023",driver:"test 024"})
//   await bus.save();
//     const updateBus={brand:"test 55",plate:"test 66",driver:"test 77"}
//     chai.request(app)
//     .patch(`/bus/${bus.id}`)
//     .send(updateBus)
//     .end((err,response)=>{
//         response.should.have.status(200);
//     })   
// })
// it('should not update a bus ',(done)=>{
//     const bus={brand:"DBenz",plate:"RAA232",driver:"JayPolly"}
//     chai.request(app)
//     .patch('/bus/')
//     .send(bus)
//     .end((err,response)=>{
//         response.should.have.status(404);
//         done()
//     })   
// })
// it('should delete a bus ',async()=>{
//     const bus = await Bus.create({brand:"test",plate:"test",driver:"test"})
//     await bus.save();
//     chai.request(app)
//     .delete(`/bus/${bus.id}`)
//     .end((err,response)=>{
//         if(err) done(err);
//        response.should.have.status(200);
//        response.body.should.have.property('success');
//    })    
// })
// it('should not delete a bus ',(done)=>{
//     chai.request(app)
//     .delete('/bus/62')
//     .end((err,response)=>{
//         if(err) done(err);
//        response.should.have.status(404);
//        done()
//    })
//     afterEach(async()=>{
//         await Bus.destroy({where:{},truncate:true});
//     })
// })
// })