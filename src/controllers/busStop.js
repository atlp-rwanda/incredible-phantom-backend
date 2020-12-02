import  model  from '../database/models'
import succesRes from '../helpers/successHandler'
import errorRes from '../helpers/errorHandler'
import cryptoRandomString from 'crypto-random-string'

import { Router } from 'express';
const router = Router();

const { busStop } = model;


const createBusStop = async (req,res) => {
    try{
        let Stop_id = cryptoRandomString({length: 5, type: 'numeric'})
        const searchBusStop = await busStop.findAll( { where : req.body } );
        const searchBusStopId = await busStop.findAll( { where : { busStopId : Stop_id } } )
        if(searchBusStop.length === 0 && searchBusStopId.length === 0){
            const Stop = await busStop.create({
                coordinates : req.body.coordinates,
                sector : req.body.sector,
                cell : req.body.cell,
                busStopId: Stop_id,
            });
            return succesRes(res,200,"busStop created successfully" , Stop);
        } else{
            return succesRes(res,200,"busStop already exists");
        }
    } catch (error) {
        return errorRes(res,500,"Internal Server Error : " + error.message);
    }
}

const getBusStops =  async (req,res) => {
    try{
        const Stop = await busStop.findAll();
        if(Stop.length === 0){
            return succesRes(res,200,"No created busStops , Please add one");
        }else{
            return succesRes(res,200,"All busStops",Stop);
        }
       

    } catch(error){
        return errorRes(res,500,"Internal server error : " + error.message);
    }
}

const oneStop = async (req,res) => {
    try{
        const busStopId = req.params;
        const Stop = await busStop.findOne({ where :  busStopId });
        if(!Stop){
            return succesRes(res,200,"busStop not found :(");
        }else{
            return succesRes(res,200,"One Stop",Stop);
        }
    } catch (error) {
        return errorRes(res,500,"Internal server error :" + error.message);
    }
}

const updateBusStop = async (req,res) => {
    try{
        const busStopId = req.params;
        const searchBusStop = await busStop.findOne({ where : busStopId });
        if (searchBusStop) {
            const existence = await busStop.findAll( { where : req.body } );
            if(existence.length === 0){
                const [ updated ]  = await  busStop.update(req.body , { where :  busStopId });
                const updatedBusStop = await busStop.findOne({ where : busStopId });
                return succesRes(res,200,"Updated successfully", updatedBusStop);
            }else{
                return succesRes(res,200,"One of the Stops has the same information");
            }
        }else{
            return succesRes(res,200,"busStop not found");
        }
    } catch (error) {
            return errorRes(res,500,"Internal server error : " + error.message);
    }
}

const deleteBusStop = async (req,res) => {
    try{
        const busStopId = req.params;
        const Stop = await busStop.destroy({ where :  busStopId  });
        if(Stop){
            return succesRes(res,200,"busStop deleted");
        }else{
            return succesRes(res,200,"busStop not found");
        }
    } catch (error){
        return errorRes(res,200,"Internal server error : " + error.message );
    }
}

module.exports =  { createBusStop,getBusStops,oneStop,updateBusStop,deleteBusStop };

