import bcrypt from 'bcrypt';
import { Op } from 'sequelize';
import jwt from 'jsonwebtoken';
import successRes from '../helpers/successHandler';
import errorRes from '../helpers/errorHandler';
import Models from '../database/models';
import generatePassword from '../utils/passwordGenerator';
import sendEmail from '../utils/mail2';
import hashPwd from '../helpers/pwd';

const { User, Role } = Models;

export const register = async (req, res) => {
  const validRole = await Role.findOne({ where: { role: req.body.role } });
  if (!validRole) errorRes(res, 404, `Role ${req.body.role} is not allowed`);

  try {
    const userFromToken = req.user;
    const signedUser = await User.findOne({ where: { id: userFromToken.id } });

    if (signedUser.role === 'operator') {
      if (req.body.role === 'operator') {
        return errorRes(res, 401, 'Please sign in as admin');
      }
    }

    const generatedPwd = generatePassword();
    const hash = await hashPwd(generatedPwd);
    const user = await User.create({
      ...req.body,
      password: hash,
      verficationLink: '',
      comfirmed: false,
      resetLink: '',
    });
    const verficationLink = `${process.env.HOST}/api/users/verify/${user.id}`;
    const resetLink = `${process.env.HOST}/api/users/reset/${user.id}`;

    await User.update(
      { verficationLink, resetLink },
      { where: { id: user.id } },
    );

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
    if (!foundUser) return errorRes(res, 404, 'User  Not found ');

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
        return errorRes(res, 500, 'Incorrect password');
      }
    });
  } catch (error) {
    return errorRes(res, 500, 'There was error while signining in');
  }
};