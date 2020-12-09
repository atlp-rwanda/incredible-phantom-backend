import bcrypt from 'bcrypt';
import { Op } from 'sequelize';
import jwt from 'jsonwebtoken';
import successRes from '../helpers/successHandler';
import errorRes from '../helpers/errorHandler';
import Models from '../database/models';
import userValidationSchema from '../validators/userValidator';
import generatePassword from '../utils/passwordGenerator';
import sendEmail from '../utils/mail2';

const { User } = Models;

export const register = async (req, res) => {
  try {
    const validateUser = userValidationSchema.validate(req.body);
    const { firstName, lastName, email, nationalId, phone, role } = req.body;
    if (validateUser.error) {
      console.log(validateUser.error.message)
      return errorRes(res, 500, 'Validation error', validateUser.error);
    } else {
      const generatedPwd = generatePassword();
      console.log('This is a password', generatedPwd);

      await bcrypt.hash(generatedPwd, 10, async (err, hash) => {
        if (err) {
          return errorRes(res, 500, 'error while hashing password');
        }
        const user = await User.create({
        
          firstName: firstName.req,
          lastName,
          email,
          nationalId,
          password: hash,
          phone,
          role,
          language: 'en',
        });
        await sendEmail('verify', {
          name: user.firstName,
          email: user.email,
          id: user.id,
          password: generatedPwd,
        });

        return successRes(
          res,
          201,
          'User created Successfully and email was sent',
          user,
        );
      });
    }
  } catch (error) {
    return errorRes(res, 500, 'There was an error while registering a user');

  }
};

export const verifyAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ where: { id } });
    await User.update({ comfirmed: true }, { where: { id } });
    await sendEmail('comfirmation', {
      name: user.firstName,
      email: user.email,
      id,
    });
    return successRes(res, 200, 'Successfully verfied your Email.');
  } catch (error) {
    return errorRes(res, 500, 'There was error while verfing your Account');
  }
};

export const getAll = async (req, res) => {
  try {
    const userFromToken = req.user;
    const signedUser = await User.findOne({ where: { id: userFromToken.id } });

    if (signedUser.role === 'operator') {
      const users = await User.findAll({ where: { role: 'driver' } });
      successRes(res, 200, 'Successfully got All drivers', users);
    } else {
      const users = await User.findAll({
        where: {
          role: {
            [Op.or]: ['operator', 'driver'],
          },
        },
      });
      return successRes(res, 200, 'Successfully got All users', users);
    }
  } catch (error) {
    return errorRes(res, 500, 'There was an error while getting all a user');
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const foundUser = await User.findOne({ where: { email } });
    if (!foundUser) {
      errorRes(res, 404, 'User  Not found ');
    } else {
      await bcrypt.compare(password, foundUser.password, (err, result) => {
        if (result) {
          const token = jwt.sign(
            { id: foundUser.id, email: foundUser.email },
            process.env.JWT_KEY,
            { expiresIn: '8h' },
          );
          successRes(res, 200, 'Signed in successfullt', {
            token,
            user: foundUser,
          });
        } else {
          errorRes(res, 500, 'Incorrect password');
        }
      });
    }
  } catch (error) {
   return errorRes(res, 500, 'There was error while signining in');
  }
};

export const forgotPassword= async  (req, res)=> {
  try{const email = req.body.email
 const user=await User.findOne({where:{email: email}})

  if (!user) {
  return errorRes(res,500,'No user found with that email address.')
  }else{
 await  sendEmail('forgotPassword',{
      email:user.email,
      id:user.id
    })
    successRes(res,200,"check your email")
  }}
  catch(error){
    errorRes(res,500,'error while requesting!')
  }
}
export const resetPassword= async (req, res)=>{

  try{const{ email,password}=req.body
  
  const user=await User.findOne({where:{email:email}})
  if(!user){
    return errorRes(res,'Sorry!No user found with that email address.')
  }else{
    const newPassword  = await bcrypt.hash(password,10, async(err,result)=>{
      if(result){
     await  User.update({password:newPassword},{where:{id:user.id}})

    //  await sendEmail('resetPassword',{email:user.email})
      successRes(res,200,"your Password is reseted Successfully",user)
      }
    })
  }}
  catch(error){
    errorRes(res,500,'No reset!try again!')
  }
}
export const enquireBusInfo=(req,res)=>{
  
}
