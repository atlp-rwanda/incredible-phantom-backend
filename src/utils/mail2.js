import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import nodemailer from 'nodemailer';

config();
const { EMAIL, PASS, JWT_KEY, PORT } = process.env;

const sendEmail = async (type, data = {}) => {
  try {
    const token = jwt.sign(data, JWT_KEY, { expiresIn: '8h' });
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: EMAIL, // generated ethereal user
        pass: PASS, // generated ethereal password
      },
    });
    const mailOptions = {
      from: '"Phantom" atlpincredible@gmail.com ', // sender address
      to: `${data.email}`, // list of receivers
      subject: `${type}`, // Subject line
    };

    switch (type) {
      case 'comfirmation':
        mailOptions.html = `<h1>Welcome to Phantom  ${data.name}, Your confimation was received. Enjoy your new role</h1>`;
        break;
      case 'verify':
        mailOptions.html = `<b>verify your email</b> <a href='http://localhost:${PORT}/users/verify/${token}'>click here to verify your Account</a><h2>Remember if you dont do it this link will expire in 1day</h2></p>`;
        break;

      default:
        mailOptions.html = '';
    }

    const info = await transporter.sendMail(mailOptions);
    console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    return console.log(error);
  }
};

export default sendEmail;
