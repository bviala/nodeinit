var express = require('express');
var router = express.Router();
var recaptcha = require('express-recaptcha');

/* GET home page. */
router.get('/', recaptcha.middleware.render, function(req, res, next) {
  res.render('index', {
      title: 'Nodeinit',
      user: req.user,
      message: req.flash('error'),
      captcha: req.recaptcha
  });
});

module.exports = router;
