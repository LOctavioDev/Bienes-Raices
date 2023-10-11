import express from 'express';
import generalRoutes from './routes/generalRoutes.js';
import userRoutes from './routes/userRoutes.js';


const app = express();
const port = 3000;

// app.use(express.static('src/public'));
app.set('view engine', 'pug');
app.set('views', './src/views');
app.use(express.static('./src/public'))


app.listen(port, () => {
    console.log(`El servicio HTTP ha sido iniciado\nEl servicio está escuchando en el puerto ${port}`);
});

app.use('/', generalRoutes);
app.use('/login', userRoutes);