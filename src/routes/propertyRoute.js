import express from 'express'
import {insertProperty, formProperty} from "../controllers/propertyController.js";

const router = express.Router();

router.get("/property", formProperty)
router.post('/insert-property', insertProperty);

export default router;