// user.js
import { DataTypes } from "sequelize";
import db from '../config/db.js';
import bycript from 'bcrypt'

const User = db.define('tbb_users', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false
    },

    token: {
        type: DataTypes.STRING,
        defaultValue: "",
        unique: false
    },

    verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
},{
    hooks: {
        beforeCreate: async(User) =>{
           const salt = await bycript.genSalt(10);
           User.password = await bycript.hash(User.password, salt)
        }
    }
}
);

export default User;