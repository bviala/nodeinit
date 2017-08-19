var express = require('express');
var router = express.Router();
var passport = require('passport');
var recaptcha = require('express-recaptcha');

router.post('/', recaptcha.middleware.verify, captchaVerification, passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/',
        failureFlash: true
}));

function captchaVerification(req, res, next) {
    if (req.recaptcha.error) {
        req.flash('error','reCAPTCHA Incorrect');
        res.redirect('/');
    } else {
        return next();
    }
}

module.exports = router;