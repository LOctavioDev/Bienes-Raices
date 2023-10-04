// IMPORTANDO LA LIBRERIA DE EXPRESS - NO SE PUEDE TENER EMCS Y COMMON AL MISMO TIEMPO... 
const express = require('express')

//INSTANCIANDO EL MODULO EXPRESS DE LA LIBRERIA PARA DEFINIR EL SERVIDOR
const app = express()
const port = 3000;  //DEFINIR EL PUERTO 64400 PUERTOS MTB

app.listen(port, (request, response) => {
    console.log(`EL SERVICIO HTTP HA SIDO INICIADO \n EL SERVICIO ESTA ESCUCHANDO EN EL PUERTO ${port}`)
});   // INICIAMOS A LA INSTACNIA DE EXPRESS QUE COMENCIE A ESCUCHAS LAS PETICIONES 

// ROUTING CONTANDO LAS PETICIONES QUE SE RECBIEN POR MEDIO DE UN END POINT
app.get('/', (request, response) => {
    response.send("Hola Web");
});

app.get('/quienEres', (request, response) => {
    response.send("Soy tu primera app en web en arquitectura de SOA");
});

app.get('/queUsas', (request, response) => {
    response.send("Estoy construida en el lenguaje de programacion JavaScript, y utilizo el microservidor de Express");
});

app.get('/misDatos', (req,res) => {

    res.json({
        "nombreCompleto" : "Luis Octavio Lopez Martinez",
        "fechaNacimiento": "2004-01-11",
        "matricula": "220096",

    })
});