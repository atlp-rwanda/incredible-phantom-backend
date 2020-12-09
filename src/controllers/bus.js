import successRes from '../helpers/successHandler';
import errorRes from '../helpers/errorHandler';
import { paginate } from 'paginate-info'
import model from '../database/models';
const {Bus}=model;
export const createBus = async (req,res)=>{
    try {
        const bus= await Bus.create(req.body);
        if(!bus){
            return errorRes(res, 404, 'There was an error while creating a bus');
        } else {
            return successRes(res, 201, 'Bus created successfully', bus);
        }
        
    } catch (error) {
      return errorRes(res, 500,error);
      
    }
}
export const getBus = async (req, res) => {
    try {
      const { query: { page = 1, limit = 10 } } = req;
      const offset = (page - 1) * limit;
      const { rows, count } = await Bus.findAndCountAll({
        page,
        limit,
        offset,
      });
      const pagination = paginate(page, count, rows, limit);
  
      if (offset >= count) {
        errorRes(res,401,'There are no buses registered in the system')
      }
      return successRes(res,200,pagination,rows)
    } catch (error) {
      return errorRes(res,400,error)
    }
  };
export const getOneBus= async (req,res)=>{
    try {
        const { id } = req.params;
        const bus=await Bus.findOne({where: { id }});
        if (!bus) {
          return errorRes(res, 404, 'Bus not found');
          }
          return successRes(res, 200, 'Bus found', bus);
    } catch (error) {
       return errorRes(res, 500, 'There was an error while searching a bus');
        
    }

}
export const updateBus = async (req,res) => {
  try{
      const busID = req.params;
      const searchBus = await Bus.findOne({ where : busID });
      if (searchBus) {
          const existence = await Bus.findAll( { where : req.body } );
          if(existence.length === 0){
              const [ updated ]  = await  Bus.update(req.body , { where :  busID });
              const updatedRoute = await Bus.findOne({ where : busID });
              return successRes(res,200,"Bus updated successfully", updatedRoute);
          }else{
              return errorRes(res,400,"Bus not updated ");
          }
      }else{
          return errorRes(res,404,"Bus not found");
      }
  } catch (error) {
          return errorRes(res,500,"Internal server error : " + error.message);
  }
}


export const deleteBus = async (req,res)=>{
    try {
      
        const id=req.params.id;
        const deletedBus = await Bus.findOne({where:  {id} });
        const bus= await  Bus.destroy({
            where: { id },
          });
        if(bus){
          return successRes(res, 200, 'Bus deleted successfully',deletedBus);
        }
        return errorRes(res, 404, 'Bus not found ');
    } catch (error) {
      return errorRes(res,500,error)
    }
}

