var express = require('express')
var mongoose = require('mongoose')
var router = express.Router()

var Player = require('../model/player')
var Faction = require('../model/faction')

var PlayerScores = require('../helper/player-scores')

// GET: Fetch details of all players
router.get('/', function(req, res) {
  Player.find({}).populate('faction matches').exec(function (err, result) {
    var transformed = result.map(PlayerScores)
    res.send(transformed)
  })
})

// GET: Fetch details of one player
router.get('/:id', function(req, res) {
  var query = { _id: req.params.id }
  Player.findOne(query).populate('faction matches').exec(function (err, result) {
    var transformed = PlayerScores(result)
    res.send(transformed)
  })
})

// POST: Add a new player
router.post('/', function(req, res) {
  var Created = new Player({
    name: req.body.name
  })
  if (req.body.faction) {
    Created.faction = req.body.faction;
  }
  Created.save(function (err, result) {
    if (!req.body.faction) { return res.send(result) }
    Faction.findOne({ _id: req.body.faction}, function (err, f) {
      f.players.push(mongoose.Types.ObjectId(result._id))
      f.save()
      res.send(result)
    })
  })
})

// PUT: Update a player
router.put('/:id', function(req, res) {
  var query = { _id: req.params.id }
  Player.findOne(query, function (err, result) {
    for (var prop in req.body) {
      result[prop] = req.body[prop]
    }
    result.save(function (err, result) {
      res.send(result)
    })
  })
})

// DELETE: Remove a player
router.delete('/:id', function(req, res) {
  var query = { _id: req.params.id }
  Player.findOne(query, function (err, result) {
    Player.remove(query, function (err, result) {
      res.send(result)
    })
  })
})

module.exports = router;
