import { request, response } from "express";
import Property from "../models/Property.js";


const formProperty = (request, response) => {
    response.render("auth/register-property.pug", {
        page: "New Account"
    })
}

const insertProperty = async (request, response) => {
    console.log("Intentando insertar una propiedad en la base de datos");
    console.log(`Nombre: ${request.body.name}`);

    try {
        const newProperty = await Property.create(request.body);
        response.json({ success: true, message: "Property inserted successfully", property: newProperty });
    } catch (error) {
        console.error("Error al insertar la propiedad:", error);
        response.status(500).json({ success: false, message: "Error al insertar la propiedad" });
    }
};

export { insertProperty, formProperty};
