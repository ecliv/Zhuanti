var express = require('express')

var router = express.Router();
var bannerController = require('../controller/bannerController')
var categoryController = require('../controller/categoryController')
var productController = require('../controller/productController')

router.get('/banner', bannerController.getBanners);
router.post('/banner', bannerController.createBanner);
router.delete('/banner', bannerController.deleteBanner);
router.patch('/banner', bannerController.editBanner);

router.get('/category', categoryController.getCategories);
router.post('/category', categoryController.createCategory);
router.delete('/category', categoryController.deleteCategory);
router.patch('/category', categoryController.editCategory);

router.get('/product', productController.getProducts);
router.post('/product', productController.createProduct);
router.delete('/product', productController.deleteProduct);
router.patch('/product', productController.editProduct);
router.post('/product/:productId/stock', productController.updateStock);
router.post('/product/:productId/price', productController.updatePrice);
router.post('/product/:productId/weight', productController.updateWeight);

router.get('/autocomplete', (request, response, next) => {
    response.sendStatus(204)
    response.status
})

module.exports = router;