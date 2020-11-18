const generatePassword = () => {
  const length = 8,
    posible = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let generatedPwd = '';
  for (let i = 0, n = posible.length; i < length; ++i) {
    generatedPwd += posible.charAt(Math.floor(Math.random() * n));
  }
  return generatedPwd;
};
export default generatePassword;
