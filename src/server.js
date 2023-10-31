import express from 'express'
import generalRoutes from './routes/generalRoutes.js'
import userRoutes from './routes/userRoutes.js'
import db from './config/db.js'
import User from './models/user.js';
import helmet from 'helmet';
import dotemv from 'dotenv';

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

db.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida con éxito');
    db.sync()
    console.log("Se han sincronizado las tablas existentes en la base de datos");

  })
  .catch((error) => {
    console.error('Error al conectar a la base de datos:', error);
  });


app.listen(process.env.SERVER_PORT, () => {
    console.log(`El servicio HTTP ha sido iniciado\nEl servicio está escuchando en el puerto ${process.env.SERVER_PORT}`);
});

app.use('/', generalRoutes);
app.use('/login', userRoutes);