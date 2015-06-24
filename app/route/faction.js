var express = require('express')
var router = express.Router()

var Faction = require('../model/faction')
var Player = require('../model/player')
var Match = require('../model/match')

var PlayerScores = require('../helper/player-scores')

// GET: Details of all factions
router.get('/', function(req, res) {
  Faction.find({}).populate('commander players').exec(function (err, result) {
    res.send(result)
  })
})

// GET: Details of one faction
router.get('/:id', function(req, res) {
  var query = { _id: req.params.id }
  Faction.findOne(query).populate('commander players').exec(function (err, result) {
    Player.populate(result, {
      path: 'players.matches',
      model: 'Match'
    }, function (err, result) {
      result.players = result.players.map(PlayerScores)
      res.send(result)
    })
  })
})

// POST: Add a faction
router.post('/', function(req, res) {
  var query = { _id: req.params.id }
  var Created = new Faction({
    slug: req.body.slug,
    name: req.body.name
  })
  if (req.body.commander) {
    Created.commander = req.body.commander
    Created.players = [req.body.commander]
  }
  Faction.findOne(query, function (err, result) {
    Created.save(function (err, result) {
      if (!req.body.commander) { return res.send(result) }
      Player.findOne({ _id: req.body.commander}, function (err, p) {
        p.faction = result._id
        p.save()
        res.send(result)
      })
    })
  })
})

// PUT: Update a faction
router.put('/:id', function(req, res) {
  var query = { _id: req.params.id }
  Faction.findOne(query, function (err, result) {
    for (var prop in req.body) {
      result[prop] = req.body[prop]
    }
    result.save(function (err, result) {
      res.send(result)
    })
  })
})

// Delete: Remove a faction
router.delete('/:id', function(req, res) {
  var query = { _id: req.params.id }
  Faction.findOne(query, function (err, result) {
    Faction.remove(query, function (err, result) {
      res.send(result)
    })
  })
})

module.exports = router;
