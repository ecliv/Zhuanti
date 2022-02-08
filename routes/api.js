var express = require('express')

var router = express.Router();
var bannerController = require('../controller/bannerController')
var categoryController = require('../controller/categoryController')

router.get('/banner', bannerController.getBanners);
router.post('/banner', bannerController.createBanner);
router.delete('/banner', bannerController.deleteBanner);
router.patch('/banner', bannerController.editBanner);

router.get('/category', categoryController.getCategories);
router.post('/category', categoryController.createCategory);
router.delete('/category', categoryController.deleteCategory);
router.patch('/category', categoryController.editCategory);

router.get('/autocomplete', (request, response, next) => {
    response.sendStatus(204)
})

module.exports = router;