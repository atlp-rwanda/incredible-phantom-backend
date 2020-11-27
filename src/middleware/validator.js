import errorRes from '../helpers/successHandler';
import { RegisterValidator } from '../validators/userValidator';
import Models from '../database/models';
const { User } = Models;
export const validateRegisterInput = (req, res, next) => {
    const { error } = RegisterValidator.validate(req.body);
    if (error) {
    console.log(validateUser.error.message);
    return errorRes(res, 500, 'Validation error', validateUser.error);
}
    return next();
};
export const isNotDriver = async (req, res, next) => {
    const signedInUser = req.user;
    const user = await User.findOne({
    where: {
        id: signedInUser.id,
    },
});
    if (user.role === 'driver')
    return errorRes(res, 401, 'Please sign in as Admin or Operator');
    return next();
};