const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')

var obj ={
    "status":false,
    "message":"",
    "data":[]
}
module.exports.createUser = async(req,res) =>{
    var data = req.body
    
    var p = req.body.password
    if(p ) {
    const hash = bcrypt.hashSync(p, 10);    
    data.password = hash
    }
    
   
    const user = new userModel(data)
    await user.save((err,result) => {
        if(err){
            obj.message=err.message;
            obj.status=false
            return res.json(obj)
        }
        else {
            obj.status=true
            obj.message="user registerd successfullyl"
            obj.data=result
            return res.json(obj)
        }
    })
}


module.exports.getAllUser = async(req,res) => {
    
    let page=Number(req.body.page) || 0
    let limit = Number(req.body.limit) || 10
    
    let data = await userModel.find().skip(page*limit).limit(limit)
    return res.json({
        "status":true,
        "message":"User Listed Succssefully",
        "data":data
    })
}


module.exports.updateUser = async(req,res) => {
    let id = req.user.id
    
    
    let data = req.body
    let p = data.password
        if(p ) {
            const hash = bcrypt.hashSync(p, 10);    
            data.password = hash
            }       
    
    let updateData = userModel.findOneAndUpdate({_id:id},data,{new:true},(err,result) =>{
        if(!err){
            return res.json({
                "status":true,
                "message":"User Data updated successfully",
                "data":updateData
            })        
        }
        else {
            return res.json({
                "status":false,
                "message":err.message,
                "data":[]
            })
        }
    })
    
}


module.exports.searchUser = async(req,res) => {
    
    let page=Number(req.body.page) || 0
    let limit = Number(req.body.limit) || 10
    
 let id = req.user.id
 let {first_name, last_name, email, mobile_no}    = req.body
 let search_data = {}
 if(first_name){
    search_data["first_name"]=first_name
 }
 if(last_name){
     search_data["last_name"]=last_name
 }
 if(email){
     search_data["email"]=email
 }
 if(mobile_no){
     search_data["mobile_no"]=mobile_no
 }
 let userData = await userModel.find(search_data).skip(page*limit).limit(limit)
 return res.json({
     "status":true,
     "message":"User Filtered successfully",
     "data":userData
 })
 
}