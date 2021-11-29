const router = require("express").Router();
const user = require("../controllers/userController")
const loginmiddleware = require("../middleware/loginMiddleware");
const loginController = require("../controllers/loginController");
const { valiedateEmail, validateMobile, validatePassword, checkEmailIfKey } = require("../validator/userValidator")
const { validateData } = require("../lib/validateData")
const loginValidator = require("../validator/loginValidator");
const { oneOf } = require("express-validator");
// to avoid frequent try catch and to define this function in every route file
const use = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
    }
    


//register user
router.post("/register",[valiedateEmail,validateMobile,validatePassword,validateData],user.createUser);
//login user
router.post("/login",[loginValidator.validateEmail,loginValidator.validateOtherData, validateData],loginController.login)
//fetch user
router.post("/all/user",loginmiddleware,user.getAllUser)

router.put("/update/user",[loginmiddleware,checkEmailIfKey,validateMobile,validateData],use(user.updateUser))


router.post("/filter/user",loginmiddleware,use(user.searchUser))
module.exports = router