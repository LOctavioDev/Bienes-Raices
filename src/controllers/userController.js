// import { response } from "express"

import { request, response } from "express"

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



export { formLogin, formRegister, formPasswordRecovery };