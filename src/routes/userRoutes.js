import express from 'express'
import { formLogin, formRegister, formPasswordRecovery, insertUser, confirmAccount, updatePassword, emailChangePassword, authenticateUser, formPasswordUpdate } from "../controllers/userController.js";

const router = express.Router();

router.get("/", formLogin)

router.get("/register", formRegister)
router.post("/register", insertUser)

router.post("/update-recovery", updatePassword)

router.post("/password-recovery", emailChangePassword)
router.get("/password-recovery", formPasswordRecovery)

router.get("/confirm/:token", confirmAccount)

router.get("/update-password/:token", formPasswordUpdate);
router.post("/update-password/:token", updatePassword);

router.post("/", authenticateUser)

export default router;