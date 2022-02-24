const express = require('express')

const router = express.Router();
const userController = require('../controller/userController')
const middleware = require('./userMiddleware')

// request -> router -> middleware -> controller
// middleware
//  - lanjutin request
//  - deny request

router.use(middleware.validateUser)

router.get('/me', userController.getMe)

module.exports = router;