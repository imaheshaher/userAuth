require("dotenv").config()

module.exports = {
    mongoURL :process.env.MONGO_URL,
    secrete: process.env.SECRETE,
    token_expire:process.env.TOKEN_EXPIRE
}