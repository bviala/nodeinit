var mongoose = require('mongoose');
var Team = require('./team');

var matchSchema = mongoose.Schema({
    teamA : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Team'
    },
    teamB : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    },
    date : Date
});

module.exports = mongoose.model('Match', matchSchema);