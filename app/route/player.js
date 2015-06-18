var express = require('express')
var mongoose = require('mongoose')
var router = express.Router()

var Player = require('../model/player')
var Faction = require('../model/faction')

router.get('/', function(req, res) {
  Player.find({}).populate('faction matches').exec(function (err, result) {
    if (err) { return res.status(400).send(err) }
    if (!result) { return res.status(404).send('not found') }
    res.send(result)
  })
})
router.get('/:id', function(req, res) {
  var query = { _id: req.params.id }
  Player.findOne(query).populate('faction matches').exec(function (err, result) {
    if (err) { return res.status(400).send(err) }
    if (!result) { return res.status(404).send('not found') }
    res.send(result)
  })
})
router.post('/', function(req, res) {
  var Created = new Player({
    name: req.body.name
  })
  if (req.body.faction) {
    Created.faction = req.body.faction;
  }
  Created.save(function (err, result) {
    if (err) { return res.status(400).send(err) }
    if (req.body.faction) {
      Faction.findOne({ _id: req.body.faction}, function (err, f) {
        f.players.push(mongoose.Types.ObjectId(result._id));
        f.save();
        res.send(result);
      });
    } else {
      res.send(result);
    }
  })
})
router.put('/:id', function(req, res) {
  var query = { _id: req.params.id }
  Player.findOne(query, function (err, result) {
    if (err) { return res.status(400).send(err) }
    if (!result) { return res.status(404).send('not found') }
    for (var prop in req.body) {
      result[prop] = req.body[prop]
    }
    result.save(function (err, result) {
      if (err) { return res.status(400).send(err) }
      res.send(result)
    })
  })
})
router.delete('/:id', function(req, res) {
  var query = { _id: req.params.id }
  Player.findOne(query, function (err, result) {
    if (err) { return res.status(400).send(err) }
    if (!result) { return res.status(404).send('not found') }
    Player.remove(query, function (err, result) {
      if (err) { return res.status(400).send(err) }
      res.send(result)
    })
  })
})

module.exports = router;
