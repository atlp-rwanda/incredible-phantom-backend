import { config } from 'dotenv';
import mail from '@sendgrid/mail';
import MailGen from 'mailgen';

config();

mail.setApiKey(process.env.SENDGRID_KEY);

const sendEmail = async (
  name,
  mailTo,
  subject,
  buttonText,
  intro,
  instructions,
  link,
  template,
) => {
  const mailGenerator = new MailGen({
    theme: template || 'salted',
    product: {
      name: 'Phantom',
      link: 'http://example.com',
      // logo: your app logo url
    },
  });

  const email = {
    body: {
      name,
      intro,
      action: {
        instructions,
        button: {
          color: '#33b5e5',
          buttonText,
          link,
        },
      },
    },
  };
  const emailTemplate = mailGenerator.generate(email);

  const msg = {
    to: mailTo,
    from: 'atlpincredible@gmail.com',
    subject,
    html: emailTemplate,
  };

  mail
    .send(msg)
    .then(() => {
      console.log('email sent');
    })
    .catch((err) => {
      console.log(err);
    });
};
export default sendEmail;
