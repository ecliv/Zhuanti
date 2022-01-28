var express = require('express')

var router = express.Router();
var controller = require('../controller/bannerController')

router.get('/', controller.getBanners);
router.post('/', controller.createBanner);
router.delete('/', controller.deleteBanner);
router.patch('/', controller.editBanner);

router.get('/autocomplete', (request, response, next) => {
    response.sendStatus(204)
})

module.exports = router;