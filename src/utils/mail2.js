import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import nodemailer from 'nodemailer';

config();
const { EMAIL, PASS, JWT_KEY, PORT } = process.env;

const sendEmail = async (type, data = {}) => {
  try {
    const token = jwt.sign(data, JWT_KEY, { expiresIn: '8h' });
    console.log(token);
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
        mailOptions.html = `<b>verify your email</b> <a href='http://localhost:${PORT}/api/users/verify/${token}'>click here to verify your Account</a><h2>Remember if you dont do it this link will expire in 1day</h2></p>`;
        break;
        case 'forgotPassword':
          mailOptions.html=`<p>Reset your password use this link <a href="http://localhost:${PORT}/api/users/forgot/${token}">click here to reset your password</a></p>`
        break;
        // case 'resetPassword':
        //   mailOptions.html=`<p>Reset your password use this link</p> <a href='http://localhost:${PORT}/api/users/reset/${token}'></a>`
        //   break;
          case 'password-Conformation':
            mailOptions.html=`<p>Password reseted successfully!<p/>`
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
