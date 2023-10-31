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
      from: 'no-reply@realestate-220096.com',
      to: email,
      subject: 'RealState-220096: Verify your account.',
      html: `
        <html>
          <head>
            <style>
              body {
                font-family: sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f0eae4;
              }
    
              .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #ffffff;
              }
    
              header {
                text-align: center;
                background-color: #1D2173;
                color: #ffffff;
                padding: 10px 0;
              }
    
              h1 {
                font-size: 28px;
                font-weight: bold;
                color: #D96B43;
                text-align: center;
                margin: 20px 0;
              }
    
              span {
                font-size: 18px;
                font-weight: normal;
                color: #000000;
              }
    
              p {
                font-size: 14px;
                color: #000000;
                text-align: justify;
                margin: 10px 0;
              }
    
              a {
                display: block;
                width: 200px;
                margin: 0 auto;
                background-color: #D96B43;
                color: #ffffff;
                padding: 10px 20px;
                text-align: center;
                font-size: 16px;
                text-decoration: none;
                margin-top: 20px;
              }
    
              footer {
                text-align: center;
                background-color: #1D2173;
                color: #ffffff;
                padding: 10px 0;
              }
    
              .signature {
                font-size: 14px;
                text-align: left;
                margin: 20px 0;
              }
            </style>
          </head>
          <body>
            <div class="container">
            
            <header style="display: flex; justify-content: space-between; align-items: center;">
  <div style="display: flex; align-items: center;">
    <h1 style="font-size: 28px; font-weight: bold; color: #D96B43;">Real<span>State</span></h1>
  </div>
</header> 
              <p style="font-size: 18px; margin-top: 20px;">Welcome to RealState-220096, ${name}!</p>
              <p>Thank you for choosing to search, sell, and buy properties. To continue using our platform, please click the link below to activate your account:</p>
              <a href="http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/login/confirm/${token}" class="button">Click here to activate your account</a>
              <p>Best regards,</p>
              <div class="signature">
                <p>Luis Octavio Lopez Martinez</p>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Firma_Josep_Irla.png/1200px-Firma_Josep_Irla.png" alt="Firma" style="display: block; margin: 20px 0; width: 100px; height: auto;">

                <p>CEO of RealState-220096</p>
              </div>
              <p>* If you did not create this account, please ignore this email.</p>
              <footer>
                &copy; 2023 RealState-220096
              </footer>
            </div>
          </body>
        </html>
      `,
    });
    
    console.log(`Email sent: ${info.response}`);
  } catch (error) {
    console.error(`Error sending email: ${error}`);
  }
};

export { emailRegister };