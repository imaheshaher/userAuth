const userModel = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const generateAccessToken = require("../helper/tokenHelper")
var obj={
    "status":false,
    "message":"",
    "data":[]
}
module.exports.login = async(req,res) =>{
    var data = req.body
    if(data.email==null){
        obj.message="email is required"
        return res.json(obj)
    }
    else if(data.password==null){
        obj.message="password is required"
        return res.json(obj)
    }
    else {
        var user = await userModel.findOne({email:data.email})
        if(user==null){
            return res.json({
                "status":false,
                "message":"user not found",
                "data":[]
            })
        }
        let check = bcrypt.compareSync(data.password,user.password)
        if(check){
            let token = generateAccessToken(user.email,user._id)
            
            var user = await userModel.findOneAndUpdate({email:user.email},{$set:{token:token}},{new:true})
            return res.json({
                "status":true,
                "message":"User Login Successfully",
                "data":user
            })
        

        }
        else {
            return res.json({
                "status":false,
                "message":"email or password Incorrect",
                "data":[]
            })
        }

        
    }
}