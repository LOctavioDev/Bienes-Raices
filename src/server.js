import express from "express";
import generalRoutes from "./routes/generalRoutes.js";

const app = express();
const port = 3000;

app.use('/', generalRoutes);

app.listen(port, () => {
    console.log(`El servicio HTTP ha sido iniciado\nEl servicio está escuchando en el puerto ${port}`);
});
