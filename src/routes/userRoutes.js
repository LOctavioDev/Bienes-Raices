import express, { response } from "express";

const router = express.Router();


router.get('/login', (req, res) => {
    res.render("auth/Login.pug", {
        isLogged: true
    });
});


export default router