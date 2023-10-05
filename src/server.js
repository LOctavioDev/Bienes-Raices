import express from "express";
import generalRoutes from "./routes/generalRoutes.js";

const app = express();
const port = 3000;

app.use('/', generalRoutes);
app.use('/Login', userRoutes);

app.listen(port, () => {
    console.log(`El servicio HTTP ha sido iniciado\nEl servicio está escuchando en el puerto ${port}`);
});



//AGREGAR Y CONFIGURAR EL TEMPLATE_ENGINE

app.set('view engie', 'pug')
app.set('views', './src/views')