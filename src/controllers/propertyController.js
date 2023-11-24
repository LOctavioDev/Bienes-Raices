import Property from '../models/Property.js'
import Category from '../models/Category.js';
import Price from '../models/Price.js';
import { check } from 'express-validator';

const formProperty = async (req, res) => {
    //TODO: ONTENER LAS CATEGORIAS Y LOS PRECIOS ACTUALES PARA ENVIARLOS AL FORMULARIO
    const [categories, prices] =  await Promise.all([Category.findAll(),Price.findAll()]) 

    res.render('properties/create.pug', {
        page: 'New Property',
        showHeader: true,
        categories, prices
    })
}

const saveNewProperty = async (req, res) => {
    await check("title").notEmpty().withMessage("The title is required").isLength({min:15,max:150}).withMessage("The title property must have between 15 and 150 chracters").run(req)
    await check("description").notEmpty().withMessage("The description is required").run(req)
    await check("category").notEmpty().withMessage("All property must be categoride").isInt({min:1,max:5}).withMessage("The category is unknow").run(req)
    await check("price").notEmpty().withMessage("All property must be categoride").isInt({min:1,max:8}).withMessage("The property mus have a price").run(req)

    await check("nRooms").notEmpty().withMessage("All property must be categoride").isInt({min:0,max:8}).withMessage("The property mus have a price").run(req)
}


export {formProperty, saveNewProperty};