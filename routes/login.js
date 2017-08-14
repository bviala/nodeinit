var express = require('express');
var router = express.Router();
var passport = require('passport');

/*router.post('/', passport.authenticate('local'), function(req, res) {
    res.redirect('/');
});*/

router.post('/', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/',
    failureFlash: true
}));

module.exports = router;