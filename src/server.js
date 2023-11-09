import express from 'express'
import generalRoutes from './routes/generalRoutes.js'
import userRoutes from './routes/userRoutes.js'
import propertyRoutes from './routes/propertyRoutes.js'
import db from './config/db.js'
import User from './models/user.js';
import helmet from 'helmet';
import dotemv from 'dotenv';
import chalk from 'chalk';
import { cookie } from 'express-validator';
import cookieParser from 'cookie-parser';

dotemv.config({path: 'src/.env'})


const app = express();

// HABILITAR LA PROYTECCION A TRAVEZ DE HELMET
app.use(helmet());

//app.use(express.static('src/public'));
app.set('view engine', 'pug');
app.set('views', './src/views');
app.use(express.static('./src/public'))

//Habilitamos el acceso a  las propiedades del DOM
app.use(express.urlencoded({
  extended: false
}))

//HABILITAR EL USO DE COOKIES
app.use(cookieParser({cookie: true}))

app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', "script-src 'self' 'unsafe-inline'");
  next();
});

db.authenticate()
  .then(() => {
    console.log(chalk.green('================================================='));
    console.log(chalk.green('Conexión a la base de datos establecida con éxito'));
    console.log(chalk.green('================================================='));

    return db.sync();
  })
  .then(() => {
    console.log(chalk.green('============================================================='));
    console.log(chalk.green('Se han sincronizado las tablas existentes en la base de datos'));
    console.log(chalk.green('============================================================='));
  })
  .catch((error) => {
    console.error(chalk.red('============================================'));
    console.error(chalk.red('Error al conectar a la base de datos:', error));
    console.error(chalk.red('============================================'));
  });

// Iniciar el servicio HTTP
app.listen(process.env.SERVER_PORT, () => {
    console.log(chalk.blue('============================================='));
    console.log(chalk.blue('El servicio HTTP ha sido iniciado'));
    console.log(chalk.blue(`El servicio está escuchando en el puerto ${process.env.SERVER_PORT}`));
    console.log(chalk.blue('============================================='));
});
  

app.use('/', generalRoutes);
app.use('/login', userRoutes);
app.use('/properties', propertyRoutes)