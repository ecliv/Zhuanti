const express = require('express')

const router = express.Router();
const userController = require('../controller/userController')
const cartController = require('../controller/cartController')
const addressController = require('../controller/addressController')
const checkoutController = require('../controller/checkoutController')
const middleware = require('./userMiddleware')

// request -> router -> middleware -> controller
// middleware
//  - lanjutin request
//  - deny request

router.use(middleware.validateUser)

router.get('/me', userController.getMe)

router.get('/address', addressController.getUserAddress)
router.post('/address', addressController.addUserAddress)
router.patch('/address', addressController.updateUserAddress)
router.delete('/address', addressController.deleteUserAddress)

router.get('/cart', cartController.getUserCart)
router.post('/cart', cartController.addToCart)
router.delete('/cart', cartController.deleteFromCart)

router.post('/checkout', checkoutController.checkout)

module.exports = router;