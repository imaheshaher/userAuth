const jwt = require("jsonwebtoken")
const env = require("../config")
const userModel = require("../models/userModel")
const loginMiddleware = async(req,res,next) =>{
    let token = req.headers.authorization
    if(token==null){
        return res.json({
            "status":false,
            "message":"Token is required",
            "data":[]

        })
    }
    else {
        jwt.verify(token,env.secrete,(err,decode) => {
            
            
            if(err){
                return res.json({
                    "status":false,
                    "message":"token is expire",
                    "data":[]
                })
            }
            req.user = decode

            if(req.user){
                let checkUser = userModel.findOne({token:token}).then(result=>{
                    if(result){
                        
                        next();
                    }
                    else{
                        return res.json({
                            "status":false,
                            "message":"Token is expire",
                            "data":[]
                        })
                    }
                })
            }
            else {
                return res.json({
                    "status":false,
                    "message":"token is expire",
                    "data":[]
                })   
            }
        })
        
    }
}
module.exports = loginMiddleware