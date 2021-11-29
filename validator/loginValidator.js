const {check,oneOf} = require("express-validator")


const loginValidator = {
    validateEmail:check('email').trim().not().isEmpty().withMessage("Enter the Email").normalizeEmail().isEmail().withMessage('Enter the valid email'),
    validateOtherData:[check('password').trim().not().isEmpty().withMessage("Enter the password")]
}

module.exports = loginValidator