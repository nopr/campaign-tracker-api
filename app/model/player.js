var mongoose = require('mongoose')
var db = require('../db')

var PlayerSchema = mongoose.Schema({
  name: String,
  faction: {
    type: mongoose.Schema.ObjectId,
    ref: 'Faction'
  },
  score: {
    average: Number,
    cumulative: Number
  },
  games: {
    won: Number,
    lost: Number,
    drawn: Number
  },
  matches: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Match'
  }]
})

module.exports = mongoose.model('Player', PlayerSchema)
