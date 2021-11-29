const {check,oneOf} = require("express-validator")
const userModel = require("../models/userModel")

module.exports = {
    valiedateEmail: 
        check('email').trim().not().isEmpty().withMessage("Enter the Email").normalizeEmail().isEmail().withMessage('Invalid Email').custom(async(email) => {
        const user = await userModel.findOne({email:email})
        if(user){
            throw new Error('Email is Already Registered...')
        }
    }),
    validateMobile:check('mobile_no').optional().isNumeric().withMessage('Mobile Number should be numeric').isLength({min:10,max:10}).withMessage('Enter Valid mobile number').custom(async(mobile_no) => {
        const user = await userModel.findOne({mobile_no:mobile_no})
        if(user){
            throw new Error('Mobile Number Already registered')
        }
    }),
    validatePassword:check("password").trim().not().isEmpty().withMessage("Enter the password"),
    checkEmailIfKey:check('email').optional().normalizeEmail().isEmail().withMessage('Invalid Email')
    
   
}