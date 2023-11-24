import {exit} from 'node:process'
import Category from '../../models/Category.js'
import categories from './categorySeed.js'
import Price from '../../models/Price.js'
import price from './priceSeed.js'
import db from '../../config/db.js'
import { log } from 'node:console'
import webpack from 'webpack';
import { promises } from 'node:dns'
const experiments = webpack.experiments;


const importData = async () => {
    try {
        //AUTENTICAR
        await db.authenticate()
        //GENERAR LAS COLUMNAS 
        await db.sync()
        //TODO: IMPORTAR LOS DATOS
        await Promise.all([Category.bulkCreate(categories), Price.bulkCreate(price)])
        
        console.log("SE HAN IMPORTADO LOS DATOS DE LAS TABLAS CATALOGO DE MANERA CORRECTA");
        exit()

    } catch (error) {
        console.log(error);
        exit(1);
    }
}

const deleteData = async () => {

    try {
        const queryResetCategoryID = "alter table tbc_categories auto_increment = 1;"
        const queryResetPriceID = "alter table tbc_prices auto_increment = 1;"
        await Promise.all([Category.destroy({where:{},truncate:true}),Price.destroy({where:{},truncate:true})])
        await Promise.all([db.query(queryResetCategoryID),db.query(queryResetPriceID)])

    } catch (error) {
        console.log(error);
        exit(1);
    }
} 

if(process.argv[2] === "-i"){    
    importData()
}

if(process.argv[2] === "-d"){    
    deleteData()
}