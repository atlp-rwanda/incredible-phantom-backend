import  model  from '../database/models'
import succesRes from '../helpers/successHandler'
import errorRes from '../helpers/errorHandler'
import cryptoRandomString from 'crypto-random-string'
import sequelize, { Op } from 'sequelize';

const { Route } = model;
const { busStop } = model;


const createRoute = async (req,res) => {
    try{
        let route_id = cryptoRandomString({length: 5, type: 'numeric'})
        const searchRoute = await Route.findAll( { where : req.body } );
        const searchRouteId = await Route.findAll( { where : { routeID : route_id } } )
        if(searchRoute.length === 0 && searchRouteId.length === 0){
            const route = await Route.create({
                origin : req.body.origin,
                destination : req.body.destination,
                distance : req.body.distance,
                routeID: route_id,
                busStops: [] 
            });
            return succesRes(res,200,"Route created successfully" , route);
        } else{
            return succesRes(res,404,"Route already exists");
        }
    } catch (error) {
        return errorRes(res,500,"Internal Server Error : " + error.message);
    }
}


const getRoute =  async (req,res) => {
    try{
        const route = await Route.findAll();
        if(route.length === 0){
            return succesRes(res,200,"No created routes , Please add one");
        }else{
            return succesRes(res,200,"All routes",route);
        }
       

    } catch(error){
        return errorRes(res,500,"Internal server error : " + error.message);
    }
}


const oneRoute = async (req,res) => {
    try{
        const routeID = req.params;
        const route = await Route.findOne({ where :  routeID });
        if(!route){
            return succesRes(res,404,"Route not found :(");
        }else{
            return succesRes(res,200,"One route",route);
        }
    } catch (error) {
        return errorRes(res,500,"Internal server error :" + error.message);
    }
}


const updateRoute = async (req,res) => {
    try{
        const routeID = req.params;
        const searchRoute = await Route.findOne({ where : routeID });
        if (searchRoute) {
            const existence = await Route.findAll( { where : req.body } );
            if(existence.length === 0){
                const [ updated ]  = await  Route.update(req.body , { where :  routeID });
                const updatedRoute = await Route.findOne({ where : routeID });
                return succesRes(res,200,"Updated successfully", updatedRoute);
            }else{
                return succesRes(res,200,"One of the routes has the same information");
            }
        }else{
            return succesRes(res,404,"Route not found");
        }
    } catch (error) {
            return errorRes(res,500,"Internal server error : " + error.message);
    }
}

const deleteRoute = async (req,res) => {
    try{
        const routeID = req.params;
        const route = await Route.destroy({ where :  routeID  });
        if(route){
            return succesRes(res,200,"Route deleted");
        }else{
            return succesRes(res,404,"Route not found");
        }
    } catch (error){
        return errorRes(res,500,"Internal server error : " + error.message );
    }
}

const addBusStop = async (req,res) => {
    try{
      const routeID = req.params;
      const searchingBusStop = await busStop.findOne({ where :  req.body  });
      const searchingRoute = await Route.findOne({ where : routeID });
      if(searchingBusStop && searchingRoute){
          const existence = await Route.findOne({ where :  { routeID : req.params.routeID , busStops : { [Op.contains] : [ searchingBusStop.busStopId ] }  } });
          if(!existence){
            const [ route ]  = await Route.update({
                busStops : sequelize.fn('array_append', sequelize.col('busStops'), searchingBusStop.busStopId)} , { where : routeID} );
              const updated = await Route.findOne( { where : routeID } )
              return succesRes(res,200,"Bus stop added to route successfully!",updated);
          }else{
              return succesRes(res,404,"Bus stop already exists on that route");
          }
      }else if(searchingBusStop == null){
        return succesRes(res,200,"There is no route corresponding to that ID");
      }else if(searchingRoute == null){
          return succesRes(res,200,"There is no matching bus stops");
      }else{
          return errorRes(res,404,"Not data matching the corresponding inputs :(");
      }
    } catch (error) {
        console.log(error);
        return errorRes(res,500,"Internal server error : " + error.message);
    }
}


module.exports =  { createRoute,getRoute,oneRoute,updateRoute,deleteRoute,addBusStop };

