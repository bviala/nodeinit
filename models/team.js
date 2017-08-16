var mongoose = require('mongoose');

var teamSchema = mongoose.Schema({
    name: String,
    shortname: String
});

module.exports = mongoose.model('Team', teamSchema);