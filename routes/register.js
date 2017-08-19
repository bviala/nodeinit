var express = require('express');
var router = express.Router();
var passport = require('passport');
var recaptcha = require('express-recaptcha');
var Account = require('../models/account');


router.get('/', recaptcha.middleware.render, function(req, res) {
    if (req.isAuthenticated()){
        res.redirect('/');
    }
    res.render('register', {
        message: req.flash('error'),
        captcha: req.recaptcha
    });
});

router.post('/', recaptcha.middleware.verify, captchaVerification, function(req, res) {
    Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
        if (err) {
            req.flash('error', err.message);
            res.redirect('/register');
        }
        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    });
});

function captchaVerification(req, res, next) {
    if (req.recaptcha.error) {
        req.flash('error','reCAPTCHA Incorrect');
        res.redirect('/register');
    } else {
        return next();
    }
}

module.exports = router;