import dotenv from 'dotenv';
import nodemailer from 'nodemailer'

dotenv.config({path: 'src/.env'})

const emailRegister = async(userData) => {
    console.log(`Trying send to email of activation user ${userData.email}`);

    var transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD
        }
      });

    const {name, email, token} = userData
    // CREANDO Y ENVIANDO EL CUERPO DEL PROYECTO

    await transport.sendMail({
        from: '220096@utxicotepec.edu.mx',
        to: email, 
        subject: 'RealState-220096: Verify your account.',
        text: 'Welcome to real Sate-220096, to continue is mandatory that you click on link below to activate your account.',
        html: `<p>Hello, ${name}</p>
        <p>Thank you for chosing to search, sell and buy your properties, if you want to continue use ypu platafrom pleace click below.</p>
        <a href="#">Click here to active your account</a>
        <p>Best regards</p>
        <p>Luis Octavio Lopez Martinez</p>
        <p>CEO of RealState-220096</p>
        <p>* if you did not created this account please ignore this email </p>`

    })
}

export {emailRegister} 