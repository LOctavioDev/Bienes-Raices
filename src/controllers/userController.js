// import { response } from "express"

import { request, response } from "express"
import User from "../models/user.js"

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


const  insertUser = async (request, response) => { 
    console.log("Intentanndo registrar los datos del usuario en la base de datos");
    console.log(`Nombre: ${request.body.name}`);
    let newUser = await User.create(request.body)
}




export { formLogin, formRegister, formPasswordRecovery, insertUser };