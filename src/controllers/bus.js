import successRes from '../helpers/successHandler';
import errorRes from '../helpers/errorHandler';

import model from '../database/models';
const {Bus}=model;
const createBus= async (req,res)=>{
    try {
        const bus= await Bus.create(req.body);
        if(!bus){
            return errorRes(res, 400, 'There was an error while creating a bus');
        } else {
            return successRes(res, 201, 'Bus created successfully', bus);
        }
        
    } catch (error) {
      return errorResc(res, 500,'Bus exist in the system ');
    }
}
const getBus= async (req,res)=>{
    try {
        const bus=await Bus.findAll();
        return successRes(res, 200, 'Buses found successfully', bus);

    } catch (error) {
        return res.status(400).send({
            status: 400,
            message: error.message,
          });
        
    }

}
const getOneBus= async (req,res)=>{
    try {
        const { id } = req.params;
        const bus=await Bus.findOne({where: { id }});
        if (!bus) {
          return errorRes(res, 400, 'Bus not found ');
          }
          return successRes(res, 200, 'Bus found successfully', bus);
    } catch (error) {
       return errorRes(res, 400, 'There was an error while searching a bus');
        
    }

}
const updateBus = async (req, res) => {
    try {
      const id = req.params.id;
      const [updated] = await Bus.update(req.body, {
        where: { id: id },
      });
      if (updated) {
        const updatedBus = await Bus.findOne({ where: { id: id } });
        return successRes(res, 200, 'Bus updated successfully', updatedBus);
      }
      return errorRes(res, 400, 'Bus not found ');
    } catch (error) {
      return res.status(500).send(error.message);
    }
  };
const deleteBus = async (req,res)=>{
    try {
      
        const id=req.params.id;
        const bus= await  Bus.destroy({
            where: { id },
          });
        if(bus){
          return successRes(res, 200, 'Bus deleted successfully', bus);
        }
        return errorRes(res, 404, 'Bus not found ');
    } catch (error) {
      return res.status(500).send(error.message);
    }
}

module.exports = {
    createBus,
    getBus,
    getOneBus,
    updateBus,
    deleteBus
  };