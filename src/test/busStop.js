import chai from 'chai';
import chaiHttp from 'chai-http';
import { response } from 'express';
import mocha from 'mocha';
import { token } from 'morgan';
import { signin } from '../controllers/usersController';
import app from '../index';
import { mockAdmin } from './mocks/mockUsers';

chai.should();
chai.use(chaiHttp);
const { should, have, expect} = chai;
const { it, describe, beforeEach, afterEach } = mocha;

const signIn = async (user) => {
    const userData = await chai.request(app).post('/api/users/signin').send(user);
    return `Bearer ${userData.body.data.token}`;
  };


describe('busStop API', ()=>{
    describe('GET/API/busStop', ()=>{
        it('it should get all the bus stops', async () =>{
            const token = await signIn(mockAdmin);
            const res = await chai.request(app).get('/api/busStop').set('auth',token);
                if(!res.body.data){
                    expect(res.status).to.be.equal(404)
                }else{
                    expect(res.status).to.be.equal(200)
                }
        });
    });
     describe('GET/API/busStop/:busStopId', ()=>{
        it('it should get One bus stop by ID', async () =>{
            const token = await signIn(mockAdmin);
            const busStopId = 1
            const res = await chai.request(app).get('/api/busStop/' + busStopId).set('auth',token);
            if(!res.body.data){
                expect(res.status).to.be.equal(404);
            }else{
                expect(res.status).to.be.equal(200);
            }
        });
     });
      describe('POST/API/busStop', () => {
        it('it should create a new bus stop', async () =>{
            const token = await signIn(mockAdmin);
            const busStop = {
                sector : 'Kacyiru',
                cell : 'Nyamirambo',
                coordinates : '83891o1231o'
            };
            const response = await chai.request(app).post('/api/busStop').send(busStop).set('auth',token);
            if(response.body.data){
                expect(response.status).to.be.equal(201);
            }else{
                expect(response.status).to.be.equal(400);
            }
        });
      });
       describe('PATCH/API/busStop/:busStopId', () => {
        it('it should Update an existing bus stop', async () =>{
            const token = await signIn(mockAdmin);
            const busStopId = 1;
            const busStop = {
                sector : 'Kacyiru',
            };
            const response = await chai.request(app).patch('/api/busStop/' + busStopId).send(busStop).set('auth',token);
                if(response.body.data){
                    expect(response.status).to.be.equal(200);
                }else if(response.body.message === "One of the Stops has the same information"){
                    expect(response.status).to.be.equal(401);
                }else{
                    expect(response.status).to.be.equal(404);
                }
        });
    });
        describe('DELETE/API/busStop/:busStopId', () => {
            it('it should delete One bus stop by ID', async () =>{
                const token = await signIn(mockAdmin);
                const busStopId = 1
                const response = await chai.request(app).delete('/api/busStop/' + busStopId).set('auth',token);
                    if(response.body.data){
                        expect(response.status).to.be.equal(200);
                    }else{
                        expect(response.status).to.be.equal(404);
                    }
            });
        });
});