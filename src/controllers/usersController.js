import bcrypt from 'bcrypt';
import { Op } from 'sequelize';
import jwt from 'jsonwebtoken';
import redisClient from '../configs/redisClient';
import successRes from '../helpers/successHandler';
import errorRes from '../helpers/errorHandler';
import Models from '../database/models';
import generatePassword from '../utils/passwordGenerator';
import sendEmail from '../utils/mail2';
import hashPwd from '../helpers/pwd';

const { User, Role } = Models;

const setToken = (key, value) => Promise.resolve(redisClient.set(key, value));
const deleteToken = (key) => Promise.resolve(redisClient.del(key));

export const register = async (req, res) => {
  const validRole = await Role.findOne({ where: { role: req.body.role } });
  if (!validRole) {
    return errorRes(res, 404, res.__(`Role ${req.body.role} is not allowed`));
  }
  const findUser = await User.findOne({ where: { email: req.body.email } });
  if (findUser) errorRes(res, 400, res.__('User alredy exist'));

  try {
    const userFromToken = req.user;
    const signedUser = await User.findOne({ where: { id: userFromToken.id } });

    if (signedUser.role === 'operator') {
      if (req.body.role === 'operator') {
        return errorRes(res, 401, res.__('Please sign in as admin'));
      }
    }

    const generatedPwd = generatePassword();
    const hash = await hashPwd(generatedPwd);
    const user = await User.create({
      ...req.body,
      language: 'en',
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
      res.__('User created Successfully and email was sent'),
      user,
    );
  } catch (error) {
    return errorRes(
      res,
      500,
      res.__('There was an error while registering a user'),
    );
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
    return successRes(res, 200, res.__('Successfully verfied your Email.'));
  } catch (error) {
    return errorRes(
      res,
      500,
      res.__('There was error while verfing your Account'),
    );
  }
};

export const getAll = async (req, res) => {
  try {
    const userFromToken = req.user;
    const signedUser = await User.findOne({ where: { id: userFromToken.id } });

    if (signedUser.role === 'operator') {
      const users = await User.findAll({ where: { role: 'driver' } });
      successRes(res, 200, res.__('Successfully got All drivers'), users);
    } else {
      const users = await User.findAll({
        where: {
          role: {
            [Op.or]: ['operator', 'driver'],
          },
        },
      });
      return successRes(res, 200, res.__('Successfully got All users'), users);
    }
  } catch (error) {
    return errorRes(
      res,
      500,
      res.__('There was an error while getting all a user'),
    );
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const foundUser = await User.findOne({ where: { email } });
    if (!foundUser) return errorRes(res, 404, res.__('User  Not found '));

    await bcrypt.compare(password, foundUser.password, (err, result) => {
      if (result) {
        const token = jwt.sign(
          { id: foundUser.id, email: foundUser.email },
          process.env.JWT_KEY,
        );
        (async () => {
          await setToken(token, foundUser.id);
          successRes(res, 200, res.__('Signed in successfully'), {
            token,
          });
        })();
      } else {
        return errorRes(res, 400, res.__('Incorrect password'));
      }
    });
  } catch (error) {
    return errorRes(res, 500, res.__('There was error while signining in'));
  }
};

export const logout = async (req, res) => {
  try {
    const token = req.headers.auth?.split(' ')[1];
    const delTok = await deleteToken(token);
    if (!delTok) errorRes(res, 500, res.__('error while clearing your data'));
    successRes(res, 200, res.__('Logged out successfully'));
  } catch (error) {
    return errorRes(res, 500, res.__('There was error loging out'));
  }
};
