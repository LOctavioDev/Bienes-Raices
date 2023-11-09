import { request, response } from "express"
import User from "../models/user.js"
import { check, validationResult } from "express-validator"
import { generateToken, generateJwt } from "../lib/tokens.js"
import { json } from "sequelize"
import { emailRegister,emailPasswordRecovery } from "../lib/emails.js"
import bcrypt from "bcrypt";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser"

dotenv.config({path: 'src/.env'})

const formLogin = (request, response) => {
    response.render("auth/login.pug", {
        isLogged: false,
        page: "Login",

    })
}

const formRegister = (request, response) => {
    response.render("auth/register.pug", {
        page: "New Account",
    })
}

const formPasswordRecovery = (request, response) => { 
    response.render("auth/recovery-password.pug", {
        page: "Password Recovery",
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
        .isLength({ min:8, max:20}).withMessage("This field requires at least 8 characters")
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

        emailRegister({email, name, token})
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

const formPasswordUpdate = async (request, response) => {
    const {token}= request.params;
    const user = await User.findOne({where: {token}})
    console.log(user);
    if(!user){
        response.render('auth/confirm-account', {
            page: 'password recovery',
            error: true,
            msg: 'We have found some issues and could not verify your account.',
            button: 'Access denied'

        })
    }

    response.render("../views/auth/password-update.pug", {
        isLogged: false,
        page: "Password update",

    })
}

const confirmAccount = async (req, res) => {
    //TODO: verificar token
    const tokenRecived = req.params.token
    const userAwner = await User.findOne({where: {token: tokenRecived}})
    if(!userAwner){
        //TODO: PINTAR LA PAGINA DE ERROR
            console.log("El token es invaido");
            res.render('auth/confirm-account', {
                page: 'Status verification',
                error: true,
                msg: 'We have found some issues and couldnot verify your account verification.',
            })
    }

    else{
        console.log("El token existe");
        userAwner.token = '';
        userAwner.verified = true;
        await userAwner.save();
        //ESTA OPERACION ACTUALIZA EN LA BASE DE DATOS
        res.render('auth/confirm-account', {
            page: 'Status verification',
            error: false,
            msg: 'Your account has been confirmed succesfuly.',
        })
    }

    //TODO: actualizar el estado de la verificacion en la tabla de usuarios
    //TODO: actializar vacio el token de activacion 

}

const updatePassword = async (req, res) => {
    console.log(`Guardando password`);
  
    await check("password")
      .notEmpty()
      .withMessage("YOUR PASSWORD IS REQUIRED")
      .isLength({ min: 8 })
      .withMessage("YOUR PASSWORD MUST HAVE 8 CHARACTERS AT LEAST")
      .run(req);
    await check("confirmPassword")
      .notEmpty()
      .withMessage("YOUR PASSWORD IS REQUIRED")
      .isLength({ min: 8 })
      .withMessage("YOUR PASSWORD MUST HAVE 8 CHARACTERS AT LEAST")
      .equals(req.body.password)
      .withMessage("BOTH PASSWORDS FIELDS MUST BE THE SAME")
      .run(req);
    let resultValidate = validationResult(req);
    if (resultValidate.isEmpty()) {
      const { token } = req.params;
      const { password } = req.body;
      const user = await User.findOne({ where: { token } });
  
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      user.token = null;
      await user.save();
  
      res.render("auth/confirm-account.pug", {
        page: "Password recovery",
        button: "Back to login",
        msg: "The password has been changed successfully",
      });
    } else {
      res.render("auth/password-update.pug", {
        page: "New account",
        errors: resultValidate.array(),
      });
    }
  };

  const emailChangePassword = async (req, res) => {
    const { email } = req.body; 

    console.log(`El usuario ha solicitado cambiar su contraseña y se le enviará un correo electrónico a ${email} con el enlace para actualizar su contraseña.`);
    
    // VALIDACION de correo electrónico
    await check("email")
        .notEmpty().withMessage("YOUR EMAIL IS REQUIRED")
        .isEmail().withMessage("THIS IS NOT EMAIL FORMAT")
        .run(req);

    const resultValidate = validationResult(req);

    if (resultValidate.isEmpty()) {
        const userExists = await User.findOne({
            where: {
                email
            }
        });

        if (!userExists) { 
            console.log(`El usuario que está intentando recuperar su contraseña no existe`);
            res.render("templates/message.pug", {
                page: "User not found",
                part1: "The user associated with:",
                part2: "does not exist in the database.",
                message: email,
                type: "error"
            });
        }
        else {
            console.log("Envío de correo");
            const token = generateToken();
            userExists.token = token;
            userExists.save();

            emailPasswordRecovery({ name: userExists.name, email, token });

            res.render('templates/message', {
                page: 'Email Send',
                email: email, 
                type: "success"
            });
        }
    }
    else {
        res.render('auth/recovery-password', {
            page: 'Status verification',
            error: false,
            msg: 'Your account has been confirmed successfully.',
            button: 'Now you can log in',
            errors: resultValidate.array(),
            user: {
                name: req.body.name,
                email
            }
        });
    }
};

const authenticateUser = async (request, response) => {
    await check("email")
        .notEmpty().withMessage("El campo de correo electrónico es obligatorio")
        .isEmail().withMessage("Este no es un formato de correo electrónico válido")
        .run(request);

    await check("password")
        .notEmpty().withMessage("El campo de contraseña es obligatorio")
        .isLength({ min: 8, max: 20 }).withMessage("La contraseña debe contener entre 8 y 20 caracteres")
        .run(request);

    const resultValidation = validationResult(request);

    if (resultValidation.isEmpty()) {
        console.log("Todo está correcto.");
        const {email,password} = request.body;
        console.log(`EL USUARIO ${email} ESTA INTENTANDO ACCEDER AL SISTEMA`);
        const userExists = await User.findOne({where:{email}})

        if(!userExists){
            console.log("EL USUARIO NO EXISTE");
            response.render("auth/login.pug", {
                page: "Login",
                errors: [{msg:`The user associated to: ${email} was not found`}],
                user: {
                    email: request.body.email
                }
            });
        }
        else{
            console.log("EL USUARIO EXISTE");
            if(!userExists.verified){
                console.log("EXISTE PERO NO ESTA VERIFICADO");
                response.render("auth/login.pug", {
                    page: "Login",
                    errors: [{msg:`The user associated to: ${email} was found but not verified`}],
                    user: {
                        email
                    }
                })
            }
            else{
                if(userExists.verifiedPassword(password)){
                    response.render("auth/login.pug", {
                        page: "Login",
                        errors: [{msg:`User adn password does not match`}],
                        user: {
                            email
                        }
                    })
                }else{
                    console.log(`EL USUARIO: ${email}`);
                    //TODO Generer el token de acceso
                    const token = generateJwt(userExists.id)
                    response.cookie('_token',token,{httpOnly:true}).redirect('login/home')
                    // secure:true #ESTO SOLO SE HABILITARA EN CASO DE TENER UN CERIFICADO HTTPS
                }
            }
        }

    } else {
        response.render("auth/login.pug", {
            page: "Login",
            errors: resultValidation.array(),
            user: {
                email: request.body.email
            }
        });
    }
}

const userHome = (req, res) => {
    res.render('user/home',{
        showHeader: true
    })
}


export { formLogin, formRegister, formPasswordRecovery, insertUser, confirmAccount, updatePassword, emailChangePassword, authenticateUser, formPasswordUpdate, userHome };