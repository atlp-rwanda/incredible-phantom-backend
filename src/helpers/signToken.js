import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

export default (data) => {
  const token = jwt.sign(data, process.env.JWT_KEY || 'thisShouldWork');
  return token;
};
