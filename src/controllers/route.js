import  model  from '../database/models'
import succesRes from '../helpers/successHandler'
import errorRes from '../helpers/errorHandler'

const { Route } = model;

// Creating route
const createRoute = async (req,res) => {
    try{
        // const route = await Route.create(req.body);
        const searchRoute = await Route.findAll({ where : req.body });
        if(searchRoute.length === 0){
            const route = await Route.create(req.body);
            return succesRes(res,200,"Route created successfully" , route);
        } else{
            return succesRes(res,200,"Route already exists");
        }
    } catch (error) {
        return errorRes(res,500,"Internal Server Error : " + error.message);
    }
}

//Getting all routes
const getRoute =  async (req,res) => {
    try{
        const route = await Route.findAll();
        if(route.length === 0){
            return succesRes(res,200,"No created routes , Please add one");
        }else{
            return succesRes(res,200,route);
        }
       

    } catch(error){
        return errorRes(res,500,"Internal server error : " + error.message);
    }
}

//Getting one route
const oneRoute = async (req,res) => {
    try{
        const id = req.params;
        const route = await Route.findOne({ where :  id });
        if(!route){
            return succesRes(res,200,"Route not found :(");
        }else{
            return succesRes(res,200,route);
        }
    } catch (error) {
        return errorRes(res,500,"Internal server error :" + error.message);
    }
}

//Updating a route
const updateRoute = async (req,res) => {
    try{
        const id = req.params;
        const searchRoute = await Route.findOne({ where : id });
        if (searchRoute) {
            const [ updated ]  = await  Route.update(req.body , { where :  id });
            const updatedRoute = await Route.findOne({ where : id });
            return succesRes(res,200,"Updated successfully", updatedRoute);
        }else{
            return succesRes(res,200,"Route not found");
        }
    } catch (error) {
            return errorRes(res,500,"Internal server error : " + error.message);
    }
}

//Deleting a route
const deleteRoute = async (req,res) => {
    try{
        const id = req.params;
        const route = await Route.destroy({ where :  id  });
        if(route){
            return succesRes(res,200,"Route deleted");
        }else{
            return succesRes(res,200,"Route not found");
        }
    } catch (error){
        return errorRes(res,200,"Internal server error : " + error.message );
    }
}

module.exports =  { createRoute,getRoute,oneRoute,updateRoute,deleteRoute };

