var mongoose = require('mongoose')
var db = require('../db')

var FactionSchema = mongoose.Schema({
  slug: String,
  name: String,
  commander: {
    type: mongoose.Schema.ObjectId,
    ref: 'Player'
  },
  players: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Player'
  }],
  score: {
    average: Number,
    cumulative: Number
  },
  games: [{
    system: String,
    percent_win: Number,
    played: Number,
    drawn: Number,
    lost: Number,
    won: Number
  }]
})

module.exports = mongoose.model('Faction', FactionSchema)
