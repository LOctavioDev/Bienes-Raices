import User from "./user.js";
import Property from "./Property.js";
import Category from "./Category.js";
import Price from "./Price.js";

Property.belongsTo(User),{
    foreignKey: 'user_ID'
}
Category.hasOne(Property),{
    foreignKey: 'property_ID'
}

Price.hasOne(Property),{
    foreignKey: 'property_ID'
}

export {User, Property, Category, Price}