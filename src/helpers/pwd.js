import bcrypt from 'bcrypt';

const hashPwd = async (pwd) => {
  const hashed = await bcrypt.hash(pwd, 10);
  return hashed;
};

export default hashPwd;