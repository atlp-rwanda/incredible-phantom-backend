import successRes from '../helpers/successHandler';
import errorRes from '../helpers/errorHandler';
import Models from '../database/models';

const { Role } = Models;

export const createRole = async(req,res) =>{
    try {
        const role = await Role.create({
            role:req.body.role
        });

        return successRes(res, 201, 'Role created successfully', role);

    } catch (error) {
        console.log(error);
        return errorRes(res, 500, 'There was an error while creating a role');
    }
};

export const ReadRole = async(req,res) =>{
    try {
        const role = await Role.findAll();
        successRes(res, 200, 'Successfully got All roles', role);
    } catch (error) {
        return errorRes(res, 500, 'There was an error while reading role');
    }
};

export const UpdateRole = async(req,res) =>{
    try {
        const roleId = req.params.id;
        const updated = await Role.update(req.body,{
            where:{id:roleId}})


        if(updated){
                const updatedrole = await Role.findOne({where:{id:roleId}});
               return successRes(res,201, 'Role updated successfully', updatedrole);
            }
        
    } catch (error) {
        console.log(error);
        return errorRes(res, 500, 'There was an error while Updating the Role');
    }
    
    
};

export const DeleteRole = async(req,res) =>{
    try {
        const roleId = req.params.id;
        const findrole = await Role.findOne({where:{id:roleId}});

        if (!findrole){
            errorRes(res,404, "Role not Found")
        }else{
            await Role.destroy({where:{id:roleId}});
            successRes(res,200,'Delete role successfully')
}
    
    } catch (error) {
        errorRes(res,500,'There was an error while deleting the role');
    }
};

