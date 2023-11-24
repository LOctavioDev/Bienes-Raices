import express from 'express'
import {formProperty, saveNewProperty} from "../controllers/propertyController.js"

const router = express.Router();

router.get('/create', formProperty)
router.post('/create', saveNewProperty)

export default router;