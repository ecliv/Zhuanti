const express = require('express')

const router = express.Router();
const userController = require('../controller/userController')
const cartController = require('../controller/cartController')
const middleware = require('./userMiddleware')

// request -> router -> middleware -> controller
// middleware
//  - lanjutin request
//  - deny request

router.use(middleware.validateUser)

router.get('/me', userController.getMe)

router.get('/cart', cartController.getUserCart)
router.post('/cart', cartController.addToCart)
router.delete('/cart', cartController.deleteFromCart)

module.exports = router;