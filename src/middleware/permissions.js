import Models from '../database/models';
import errorRes from '../helpers/errorHandler';

const { User } = Models;

export const isAdmin  = async(req, res, next) => {
    const { email, role } = req.user.payload;
    const user = await User.findOne({ where: { email: email } });
    if (!user){
        return errorRes(res,403,'Sorry user not found');
    } 
    if (role != admin){
        return errorRes(res,403,'Please sign as the admin');
    }
    next();
    };

export const isOperator = async(req, res, next) => {
    const { email, role } = req.user.payload;
    const user = await Users.findOne({ where: { email } });
    if (!user) {
        errorRes(res,403,'Sorry the User with the following Email is NOT FOUND');
}
    if (role !== 'operator') {
        errorRes(res,403,'Please SignIn as an operator');
    }
next();
}

export const isDriverOrOperator = async (req, res, next) => {
    const { email } = req.body;
    const user = await Users.findOne({ where: { email } });
    if (!user) {
        return errorRes(res,403,'Sorry User with the following Email is not found')
    }
    if (user.role !== 'operator' && user.role !== 'driver') {
        return errorRes(res,403,'You are not an Operator or a Driver')
    }
    next();
};