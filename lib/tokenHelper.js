const jwt = require("jsonwebtoken")
const env= require("../config/config")
console.log(env)
const generateAccessToken = (id,name,user_type)=> {
  
    return jwt.sign({id:id,name:name,user_type:user_type},env.secrete,{expiresIn:env.token_expire});
  }



module.exports = generateAccessToken