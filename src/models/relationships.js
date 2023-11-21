import User from "./user.js";
import Property from "./Property.js";

Property.belongsTo(User),{
    foreingKey: 'user_ID'
}

export {User, Property}