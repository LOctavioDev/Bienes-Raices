import express from 'express'
import {formProperty} from "../controllers/propertyController.js"

const router = express.Router();

router.get('/create', formProperty)

export default router;