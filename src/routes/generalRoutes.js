import express from "express";

const router = express.Router();

router.get('/', (request, response) => {
    response.send("Hola Web");
});

router.get('/quienEres', (request, response) => {
    response.send("Soy tu primera app web en arquitectura de SOA");
});

router.get('/queUsas', (request, response) => {
    response.send("Estoy construida en el lenguaje de programación JavaScript y utilizo el microservidor de Express");
});

router.get('/misDatos', (request, response) => {
    response.json({
        "nombreCompleto": "Luis Octavio Lopez Martinez",
        "fechaNacimiento": "2004-01-11",
        "matricula": "220096",
    });
});

export default router;