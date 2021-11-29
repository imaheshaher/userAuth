const jwt = require("jsonwebtoken")
const env = require("../config")
const generateAccessToken = (username,id)=> {
    return jwt.sign({email:username,id:id}, env.secrete,{expiresIn:env.token_expire});
  }

  module.exports = generateAccessToken