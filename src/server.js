import express from 'express'
import generalRoutes from './routes/generalRoutes.js'
import userRoutes from './routes/userRoutes.js'
import propertyRoutes from './routes/propertyRoutes.js'
import db from './config/db.js'
import {User, Property} from './models/relationships.js'



import helmet from 'helmet';
import dotemv from 'dotenv';
import chalk from 'chalk';
import { cookie } from 'express-validator';
import cookieParser from 'cookie-parser';

dotemv.config({path: 'src/.env'})

const app = express();


// app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static('src/public'));
app.set('view engine', 'pug');
app.set('views', './src/views');
app.use(express.static('./src/public'))

// HABILITAR LA PROYTECCION A TRAVEZ DE HELMET
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", 'https://unpkg.com', 'https://cdnjs.cloudflare.com', "'unsafe-eval'"],
    styleSrc: ["'self'", 'https://unpkg.com', 'https://cloudflare.com', 'https://cdnjs.cloudflare.com'],
    imgSrc: ["'self'", 'data:', 'https://unpkg.com', 'https://cloudflare.com', 'https://cdnjs.cloudflare.com', 'https://a.tile.openstreetmap.org', 'https://b.tile.openstreetmap.org', 'https://c.tile.openstreetmap.org'],
    connectSrc: ["'self'", 'https://tile-provider-domain.com', 'https://geocode.arcgis.com'],
  },
}));


//Habilitamos el acceso a  las propiedades del DOM
app.use(express.urlencoded({
  extended: false
}))

//HABILITAR EL USO DE COOKIES
app.use(cookieParser({cookie: true}))

// app.use((req, res, next) => {
//   res.setHeader('Content-Security-Policy', "script-src 'self' 'unsafe-inline'");
//   next();
// });

db.authenticate()
  .then(() => {
    console.log(chalk.green('============================='));
    console.log(chalk.green('CONNECTED SUCCESSFUL DATABASE'));
    console.log(chalk.green('============================='));

    return db.sync();
  })
  .then(() => {
    console.log(chalk.green('======================================================'));
    console.log(chalk.green('EXISTING TABLES IN THE DATABASE HAVE BEEN SYNCHRONIDEZ'));
    console.log(chalk.green('======================================================'));
  })
  .catch((error) => {
    console.error(chalk.red('==========================='));
    console.error(chalk.red('THERE IS AN ERROR: ', error));
    console.error(chalk.red('==========================='));
  });

// Iniciar el servicio HTTP
app.listen(process.env.SERVER_PORT, () => {
    console.log(chalk.blue('================================='));
    console.log(chalk.blue('THE HTTP SERVICE HAS BEEN STARTED'));
    console.log(chalk.blue(`THE SERVICE IS ON THE PORT: ${process.env.SERVER_PORT}`));
    console.log(chalk.blue('================================='));
});
  

app.use('/', generalRoutes);
app.use('/login', userRoutes);
app.use('/properties', propertyRoutes)