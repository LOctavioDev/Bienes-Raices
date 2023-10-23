import { DataTypes } from "sequelize";
import db from '../config/db.js';

const Property = db.define('tbb_properties', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },                  
    description: {  
        type: DataTypes.TEXT,
        allowNull: false
    },
    type: {
        type: DataTypes.ENUM('apartment', 'house', 'condo', 'land', 'commercial'),
        allowNull: false
    },
    
});

export default Property;