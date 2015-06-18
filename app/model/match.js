var mongoose = require('mongoose')
var db = require('../db')

var MatchSchema = mongoose.Schema({
  home: {
    player: {
      type: mongoose.Schema.ObjectId,
      ref: 'Player'
    },
    score: Number,
    result: String
  },
  away: {
    player: {
      type: mongoose.Schema.ObjectId,
      ref: 'Player'
    },
    score: Number,
    result: String
  }
})

module.exports = mongoose.model('Match', MatchSchema)
