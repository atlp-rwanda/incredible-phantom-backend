import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import successRes from '../helpers/successHandler';
import errorRes from '../helpers/errorHandler';
import Models from '../database/models';
import { RegisterValidator } from '../validators/userValidator';

const { User } = Models;

export const register = async (req, res) => {
  try {
    const validateUser = RegisterValidator.validate(req.body);
    const {
      firstName,
      lastName,
      email,
      phone,
      language,
      nationalId,
      password,
      role,
    } = req.body;
    if (validateUser.error) {
      console.log(validateUser.error.message);
      return errorRes(res, 500, 'Validation error', validateUser.error);
    } else {
      await bcrypt.hash(password, 10, async (err, hash) => {
        if (err) {
          errorRes(res, 500, 'error while hashing password');
        }
        const user = await User.create({
          firstName,
          lastName,
          nationalId,
          email,
          language,
          password: hash,
          phone,
          role,
        });
        return successRes(res, 201, 'User created Successfully', user);
      });
    }
  } catch (error) {
    console.log(error);
    return errorRes(res, 500, 'There was an error while registering a user');
  }
};

export const getAll = async (req, res) => {
  try {
    const users = await User.findAll();
    successRes(res, 200, 'Successfully got All users', users);
  } catch (error) {
    errorRes(res, 500, 'There was an error while getting all a user');
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
            { expiresIn: '4h' },
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
    errorRes(res, 500, 'There was error while signining in');
  }
};
