// import { response } from "express"

import { request, response } from "express"
import User from "../models/user.js"
import { check, validationResult } from "express-validator"
import { generateToken } from "../lib/tokens.js"
import { json } from "sequelize"

const formLogin = (request, response) => {
    response.render("auth/login.pug", {
        isLogged: false,
        page: "Login"

    })
}

const formRegister = (request, response) => {
    response.render("auth/register.pug", {
        page: "New Account"
    })
}

const formPasswordRecovery = (request, response) => { 
    response.render("auth/recovery-password.pug", {
        page: "Password Recovery"
    })

}


const insertUser = async (request, response) => { 
    console.log("Intentando registrar los datos del usuario en la base de datos");
    console.log(`Nombre: ${request.body.name}`);

    await check("name").notEmpty().withMessage("This field is required").run(request);

    await check("email").notEmpty().withMessage("This field is required").isEmail().withMessage("This is not in email format").run(request);

    await check("password").notEmpty().withMessage("This field is required").isLength({ min: 8 }).withMessage("This field requires at least 8 characters").run(request);


    await check("confirm-password")
        .notEmpty().withMessage("This field is required")
        .isLength({ min: 8 }).withMessage("This field requires at least 8 characters")
        .equals(request.body.password).withMessage("Both passwords must be the same")
        .run(request);

    const errors = validationResult(request);
    
    console.log(`Se encontraron ${errors.errors.length} errores de validación`);

    const userExists = await User.findOne({ where : {email: request.body.email}})
    console.log(userExists);

    const {name,email,password} = request.body

    if (userExists) {
        response.render("auth/register.pug", {
            page: "New Account",
            errors: [{ msg: `The user with email "${request.body.email}" already exists` }],
            user: {
                name: request.body.name,
                email: request.body.email
            }
        });
        console.log(request.body.email);
    }
    else if (errors.isEmpty()) {
        const token = generateToken() 
        let newUser = await User.create({
            name,email,password,token
        });
        response.render("templates/message.pug", {
            page: "New account created",
            message: `We have send an email to: ${email}, Please verify your account`,
            email: email,
        })
    } 
    else {
        response.render("auth/register.pug", {
            page: "New Account",
            errors: errors.array(),
            user: {
                name: request.body.name,
                email: request.body.email
            }
        });
    }
    
}




export { formLogin, formRegister, formPasswordRecovery, insertUser };