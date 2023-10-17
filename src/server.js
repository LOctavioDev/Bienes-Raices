import express from 'express';
import generalRoutes from './routes/generalRoutes.js';
import userRoutes from './routes/userRoutes.js';
import db from './config/db.js'
import User from './models/user.js';

const app = express();
const port = 3000;

// app.use(express.static('src/public'));
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


app.listen(port, () => {
    console.log(`El servicio HTTP ha sido iniciado\nEl servicio está escuchando en el puerto ${port}`);
});

app.use('/', generalRoutes);
app.use('/login', userRoutes);