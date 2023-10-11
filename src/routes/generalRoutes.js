import express, { request, response } from 'express'

const router = express.Router();

// RUTAS GET
// router.get('/', (request, response) => {
//     response.send("Hola Web");
// })

// router.get('/', (request, response) => response.render('../views/layout/index.pug', {page: "Home"}))
router.get('/', (request, response) => response.render("layout/index.pug", {page: "Home"}));




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
router.get('/get/', (request, response) => {
    response.send("Hola desde GET");
});


//PRACTICA 22 "PETICION ATRAVEZ DE LOS VERBOS HTTP"
//RUTAS DE POST
router.post('/post', (request, response) => response.send("Hi web from POST verb"))


//RUTAS DE PUT
router.put('/put', (request, response) => response.send("You are trying to update some properties of data using PUT"))


//RUTAS DE PATCH
router.patch('/patch', (request, response) => response.send("Hi, you are tryning to update all data object throught PACTH"))


//RUTAS DE PELETE
router.delete('/delete', (request, response) => response.send("Are you sure that you want to DELETE data?"))


export default router;