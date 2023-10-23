import express from 'express'
import { formLogin, formRegister, formPasswordRecovery, insertUser } from "../controllers/userController.js";

const router = express.Router();

router.get("/", formLogin)
router.get("/register", formRegister)
router.get("/password-recovery", formPasswordRecovery)
router.post("/register", insertUser)


export default router;