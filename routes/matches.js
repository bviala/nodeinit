var express = require('express');
var router = express.Router();
var passport = require('passport');
var Match = require('../models/match');
var Team = require('../models/team');
var Dateformat = require('dateformat')

// Matches list page
router.get('/', function (req, res) {
    Match.find()                    // mongoose retrieve the matches collection in the database
        .populate('teamA')          // mongoose replace the object reference by the actual object
        .populate('teamB')
        .lean()                     // get plain JS object instead of mongoose doc so we can format the date
        .exec(function (err, matches) {
        if(err) return console.error(err);

        // format the match date for rendering
        matches.forEach(function (match) {
            if(match.date){         // dateformat create a new date at current time if passed null
                match.date = Dateformat(match.date, "dd/mm, HH:MM");
            }
        });

        res.render('matches', {
            matches: matches.length === 0 ? null : matches, // replace by null in case of empty array, easier to work with in pug templates
            user: req.user
        })
    })
});

// Add match form
router.get('/add', function (req, res) {
    if(req.isAuthenticated()){
        Team.find(function (err, teams) {
            if(err) return console.error(err);

            res.render('matches_add', {
                teams: teams.length === 0 ? null : teams, // replace by null in case of empty array, easier to work with in pug templates
                message: req.flash('error')
            });
        });
    } else {
        res.redirect('/')
    }
});

// Add match request from the form
router.post('/add', function (req, res) {
    if(req.isAuthenticated()){
        if(req.body.teamA !== req.body.teamB){ // prevent from creating matches with team vs itself
            var match = new Match({ // create a new match with data from the form
               teamA: req.body.teamA,
               teamB: req.body.teamB,
               date: req.body.date
            });
            match.save(function (err, match) { // save the match in the db
                if(err){
                    console.log('error while saving match: ', match);
                    console.error(err);
                    req.flash('error', 'Error while creating the match. If you have trouble entering a valid date, consider using Chrome or Edge.');
                    res.redirect('/matches/add');
                } else {
                    res.redirect('/matches');
                }
            });
        } else {
            req.flash('error', "Please select two different teams to create a match.")
            res.redirect('/matches/add')
        }
    } else {
        res.redirect('/')
    }
});

module.exports = router;