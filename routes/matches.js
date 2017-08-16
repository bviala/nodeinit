var express = require('express');
var router = express.Router();
var passport = require('passport');
var Match = require('../models/match');
var Team = require('../models/team');

router.get('/', function (req, res) {
    Match.find()                    // mongoose retrieve the matches collection in the database
        .populate('teamA')          // mongoose replace the object reference by the actual object
        .populate('teamB')
        .exec(function (err, matches) {
        if(err) return console.error(err);

        res.render('matches', {
            matches: matches.length === 0 ? null : matches, // replace by null in case of empty array, easier to work with in pug templates
            user: req.user
        })
    })
});

router.get('/add', function (req, res) {
    if(req.isAuthenticated()){
        Team.find(function (err, teams) {
            if(err) return console.error(err);

            res.render('matches_add', {
                teams: teams.length === 0 ? null : teams // replace by null in case of empty array, easier to work with in pug templates
            });
        });
    } else {
        res.redirect('/')
    }
});

router.post('/add', function (req, res) {
    if(req.isAuthenticated()){
        var match = new Match({ // create a new match with data from the form
           teamA: req.body.teamA,
           teamB: req.body.teamB,
           date: req.body.date
        });
        match.save(function (err, team) { // save the match in the db
            if(err){
                console.log('error while saving team: ', team);
                console.error(err);
            }
        });
        res.redirect('/matches');
    } else {
        res.redirect('/')
    }
});

module.exports = router;