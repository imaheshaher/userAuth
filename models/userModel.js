const mongoose = require("mongoose")
const uniqueValidator  = require("mongoose-unique-validator")
const userSchema = new mongoose.Schema({
    email: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true},
    first_name:{
      type:String,
      required:true
    },
    last_name:{
      type:String,
      required:true
    },
    mobile_no:{
      type:String,
      required:true
    },
    address:{
      type:String,
      required:true
    },
    password:{type:String,required: [true, "can't be blank"]},
    token:String
   
  },{timestamps:true})


userSchema.plugin(uniqueValidator, {message: 'is already taken.'});
const userModel = mongoose.model('user', userSchema);
module.exports= userModel;