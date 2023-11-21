import { DataTypes } from "sequelize";
import db from '../config/db.js';

const Property = db.define('tbb_properties', {
    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUDIv4,
        allowNull: false,
        primaryKey: true
    }, title: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    description:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    rooms:{
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,

    },
    wc:{
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
    },
    parkinglots:{
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
    },
    street:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    lat:{
        type: DataTypes.STRING,
        allowNull: false
    },
    long:{
        type: DataTypes.STRING,
        allowNull: false
    },
    image:{
        type: DataTypes.STRING,
        allowNull: false
    },
    published:{
        type: DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue: false
    }

})

export default Property;