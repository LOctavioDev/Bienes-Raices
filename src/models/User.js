// user.js
import { DataTypes } from "sequelize";
import db from '../config/db.js';

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
        defaultValue: ""
    },

    verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});

export default User;
