var express = require('express')
var mongoose = require('mongoose')
var router = express.Router()

var Match = require('../model/match')
var Player = require('../model/player')

// GET: Fetch details of all matches
router.get('/', function(req, res) {
  Match.find({}).populate('home.player away.player').exec(function (err, result) {
    res.send(result)
  })
})

// GET: Fetch details of one match
router.get('/:id', function(req, res) {
  var query = { _id: req.params.id }
  Match.findOne(query).populate('player').exec(function (err, result) {
    res.send(result)
  })
})

// POST: Create one match
router.post('/', function(req, res) {
  var Created = new Match({
    home: {
      player: mongoose.Types.ObjectId(req.body.home.player),
      score: req.body.home.score
    },
    away: {
      player: mongoose.Types.ObjectId(req.body.away.player),
      score: req.body.away.score
    }
  })
  var difference = Math.abs(Created.home.score - Created.away.score)
  if (Created.home.score == Created.away.score) {
    Created.home.result = 'draw'
    Created.away.result = 'draw'
    Created.home.score = 100
    Created.away.score = 100
  } else if (Created.home.score > Created.away.score) {
    Created.home.result = 'win'
    Created.away.result = 'lose'
    Created.home.score = 100 + difference
    Created.away.score = 100 - difference
  } else if (Created.away.score > Created.home.score) {
    Created.home.result = 'lose'
    Created.away.result = 'win'
    Created.home.score = 100 - difference
    Created.away.score = 100 + difference
  }
  Created.save(function (err, match) {
    // Update home player
    Player.findOne({ _id: match.home.player }, function (err, home) {
      home.matches.push(match._id);
      home.save(function () {
        // Update away player
        Player.findOne({ _id: match.away.player }, function (err, away) {
          away.matches.push(match._id)
          away.save(function () {
            // Respond
            res.send(match)
          })
        })
      })
    })
  })
})

// PUT: Update one match
router.put('/:id', function(req, res) {
  var query = { _id: req.params.id }
  Match.findOne(query, function (err, result) {
    for (var prop in req.body) {
      result[prop] = req.body[prop]
    }
    result.save(function (err, match) {
      res.send(match)
    })
  })
})

// DELETE: Remove one match
router.delete('/:id', function(req, res) {
  var query = { _id: req.params.id }
  Match.findOne(query, function (err, match) {
    Match.remove(query, function (err, result) {
      // Update home player
      Player.findOne({ _id: match.home.player }, function (err, home) {
        var i = home.matches.indexOf(match._id);
        home.matches.splice(i, 1);
        home.save(function () {
          // Update away player
          Player.findOne({ _id: match.away.player }, function (err, away) {
            var i = away.matches.indexOf(match._id);
            away.matches.splice(i, 1);
            away.save(function () {
              // Respond
              res.send(match)
            })
          })
        })
      })
    })
  })
})

module.exports = router;
