import dotenv from 'dotenv';
import mail from '@sendgrid/mail';

dotenv.config();
mail.setApiKey(process.env.SENDGRID_KEY);

const message = (email) => {
  const toSend = {
    to: email,
    from: 'eaglesphantom1@gmail.com',
    subject: 'Reseting of the password on phantom platform',
    text:
      'Dear customer we are pleased to give you this password to access our platform ',
    html:
      'Dear customer we are pleased to give you this password to access our platform  ',
  };
  mail.send(toSend);
};
export default message;
