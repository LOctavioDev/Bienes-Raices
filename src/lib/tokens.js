import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config({path: 'src/.env'})

//TOKEN propio
const generateToken = () => {
    const randomPart1 = Math.random().toString(32).substring(2);
    const timestamp = Date.now().toString(32);
    const randomPart2 = Math.random().toString(32).substring(2);
    return randomPart1 + timestamp + randomPart2;
  };

//JWT
const generateJwt = (userID) => 
    jwt.sign({
    domain: process.env.JWT_DOMAIN,
    signature: process.env.JWT_SIGNATURE,
    author: process.env.JWT_AUTHOR,
    year: process.env.JWT_YEAR,
    userID  
},
process.env.JWT_SECRET_HAS_STRING,
{
    expiresIn:'1d'
})

  
export {generateToken, generateJwt}