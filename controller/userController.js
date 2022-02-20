const repository = require('../repository/userRepository')
const crypto = require("crypto-js");
const Base64 = require("crypto-js/enc-base64")

class ProductController {
    registerUser(req, res, next) {
        const password = crypto.AES.encrypt(req.body.password, process.env.SECRET)
        repository.registerUser(req.body, password)
        res.sendStatus(201)
    }
}

module.exports = new ProductController()