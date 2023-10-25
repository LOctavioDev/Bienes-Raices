import dotenv from 'dotenv';
import nodemailer from 'nodemailer'

dotenv.config({path: 'src/.env'})

const emailRegister = async (userData) => {
  console.log(`Trying to send an email to activate the user's account: ${userData.email}`);

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const { name, email, token } = userData;

  try {
    const info = await transporter.sendMail({
      from: '220096@utxicotepec.edu.mx',
      to: email,
      subject: 'RealState-220096: Verify your account.',
      text: 'Welcome to Real Estate-220096. To continue, it is mandatory that you click on the link below to activate your account.',
      html: `
        <p>Hello, ${name}</p>
        <p>Thank you for choosing to search, sell, and buy properties. To continue using our platform, please click the link below.</p>
        <a href="#">Click here to activate your account</a>
        <p>Best regards</p>
        <p>Luis Octavio Lopez Martinez</p>
        <p>CEO of RealState-220096</p>
        <p>* If you did not create this account, please ignore this email.</p>
      `,
    });

    console.log(`Email sent: ${info.response}`);
  } catch (error) {
    console.error(`Error sending email: ${error}`);
  }
};

export { emailRegister };