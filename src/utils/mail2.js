import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';

config();
const { EMAIL, PASS, JWT_KEY, HOST } = process.env;

const sendEmail = async (type, data = {}) => {
  try {
    const mailGenerator = new Mailgen({
      theme: 'default',
      product: {
        name: 'Phantom',
        link: `${process.env.HOST}`,
      },
    });

    const token = jwt.sign(data, JWT_KEY, { expiresIn: '8h' });
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: EMAIL,
        pass: PASS,
      },
    });
    const mailOptions = {
      to: `${data.email}`,
      subject: `${type}`,
      html: '',
    };
    let email = '';
    switch (type) {
      case 'comfirmation':
        email = {
          body: {
            name: 'John Appleseed',
            intro:
              'Welcome to Phantom! You have successfully Verified Your email. Enjoy Your New role',
            outro:
              "Need help, or have questions? Just reply to this email, we'd love to help.",
          },
        };

        mailOptions.html = mailGenerator.generate(email);

        break;
      case 'verify':
        email = {
          body: {
            name: data.name,
            intro: `Welcome to Phantom! We're very excited to have you on board. Your Password is: <h1>${data.password}</h1> `,
            action: {
              instructions: 'Click the button below to verify your Email',
              button: {
                color: '#008c52',
                text: 'Confirm your Email',
                link: `${HOST}/users/verify/${token}`,
              },
            },
            outro:
              "Remember, if you don't do it this link will expire in 1day.",
          },
        };

        mailOptions.html = mailGenerator.generate(email);
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
