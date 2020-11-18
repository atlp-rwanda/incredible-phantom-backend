import mocha from 'mocha';
import chai, { request } from 'chai';
import { config } from 'dotenv';
import chaiHttp from 'chai-http';
import app from '../index';
import model from '../database/models';

const {assignBuses} = model;

config();

chai.should();
chai.use(chaiHttp);
const { should, have, expect} = chai;
const { it, describe, beforeEach, afterEach } = mocha;

describe('assign buses to routes', (done)=>{
  beforeEach((done) =>{
    assignBuses.remove({}, (error) =>{
     if(error) done(error);
     done();
    });
   });

  it('should assign bus to route', (done)=>{
    const assignedBus ={brand:" test 3",plate:"test 4",driver:"test 5", routeID:"1"}
    chai.request(app)
    .post("/assignBuses")
    .send(assignedBus)
    .end((error,response)=>{
      if(error) done(error);
        response.should.have.status(201);
        done();
    });
});

it('should not assign a bus if the bus id is not in database ',(done)=>{
  const assignedBus={brad:"tyanson",plte:"RA1523",drver:"chech"}
  chai.request(app)
  .post("/assignBuses")
  .send(assignedBus)
  .end((error,response)=>{
    if(error) done(error);
      response.should.have.status(404);
      done();
  });
});

it('should get all assigned buses with their respective route ',(done)=>{
  chai.request(app)
  .get('/assignBuses')
  .end((error,response)=>{
    if(error) done(error);
    response.should.have.status(200);
    done();
  });
  });

  it('should not get all assigned buses if there is no bus in database',(done)=>{
  chai.request(app)
  .get('/assignBuses')
  .end((error,response)=>{
    if(error) done(error);
      response.should.have.status(404);
      done();
  });
  });

  it('should update assigned bus ',async()=>{
    const assignedBus=await assignBuses.create({brand:" test 012",plate:"test 023",driver:"test 024"})
  await assignedBus.save();
    const updateBus={brand:"test 55",plate:"test 66",driver:"test 77"}
    chai.request(app)
    .patch(`/assignBuses/${assignedBus.id}`)
    .send(updateBus)
    .end((error,response)=>{
      if(error) done(error);
        response.should.have.status(200);
    
    });   
});

it('should not update assigned bus ',(done)=>{
    const assignedBus={brand:"DBenz",plate:"RAA232",driver:"JayPolly"}
    chai.request(app)
    .patch('/assignBuses/')
    .send(assignedBus)
    .end((error,response)=>{
      if(error) done(error);
        response.should.have.status(404);
        done();
    });   
});

it('should delete assigned bus ',async()=>{
  const assignedBus = await assignBuses.create({brand:"test",plate:"test",driver:"test"})
  await assignedBus.save();
  chai.request(app)
  .delete(`/assignBuses/${assignedBus.id}`)
  .end((error,response)=>{
      if(error) done(error);
     response.should.have.status(200);
     response.body.should.have.property('success');
     done();
 });   
});

it('should not delete assigned bus ',(done)=>{
  chai.request(app)
  .delete('/asignBuses/62')
  .end((error,response)=>{
      if(error) done(error);
     response.should.have.status(404);
     done();     
 });
  afterEach(async()=>{
      await assignBuses.destroy({where:{},truncate:true});
  });
});
});

