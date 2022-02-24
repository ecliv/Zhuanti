var express = require('express');
const { response } = require('../app');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  // res.send("AAAAA!!!");
  res.render('home/index.html');
});


router.get('/about', function (req, res, next) {
  res.render('about/about.html')
});

router.get('/menu', function (req, res, next) {
  res.render('menu/menu.html')
});

router.get('/admin', function (req, res, next) {
  res.render('admin/index.html')
});

router.get('/login', function (req, res, next) {
  res.render('login/login.html')
});

router.get('/help', function (req, res, next) {
  res.render('help/help.html')
});
// GET VS POST -> HTTP Method
// PATCH, DELETE

// HTTP Request

// parameter

// - url -> http://localhost:3000/about -> http (protocol) - localhost (host) - 3000 (port) - /about (path)
// - header
// - body (GET ga punya body)

module.exports = router;
