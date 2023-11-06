import express from 'express'
import { formLogin, formRegister, formPasswordRecovery, insertUser, confirmAccount, updatePassword, emailChangePassword } from "../controllers/userController.js";

const router = express.Router();

router.get("/", formLogin)
router.get("/register", formRegister)
router.get("/password-recovery", formPasswordRecovery)
router.post("/password-recovery", emailChangePassword)
router.post("/update-recovery", updatePassword)
router.post("/register", insertUser)
router.get("/confirm/:token", confirmAccount)

export default router;