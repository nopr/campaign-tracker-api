var express = require('express')
var router = express.Router()

var Faction = require('../model/faction')
var Player = require('../model/player')

router.get('/', function(req, res) {
  Faction.find({}).populate('commander players').exec(function (err, result) {
    if (err) { return res.status(400).send(err) }
    if (!result) { return res.status(404).send('not found') }
    res.send(result)
  })
})
router.get('/:slug', function(req, res) {
  var query = { slug: req.params.slug }
  Faction.findOne(query).populate('commander players').exec(function (err, result) {
    if (err) { return res.status(400).send(err) }
    if (!result) { return res.status(404).send('not found') }
    res.send(result)
  })
})
router.post('/', function(req, res) {
  var query = { slug: req.params.slug }
  var Created = new Faction({
    slug: req.body.slug,
    name: req.body.name
  })
  if (req.body.commander) {
    Created.commander = req.body.commander;
    Created.players = [req.body.commander];
  }
  Faction.findOne(query, function (err, result) {
    if (err) { return res.status(400).send(err) }
    if (result) { return res.status(400).send('already exists') }
    Created.save(function (err, result) {
      if (err) { return res.status(400).send(err) }
      if (req.body.commander) {
        Player.findOne({ _id: req.body.commander}, function (err, p) {
          p.faction = result._id;
          p.save();
          res.send(result);
        });
      } else {
        res.send(result);
      }
    })
  })
})
router.put('/:slug', function(req, res) {
  var query = { slug: req.params.slug }
  Faction.findOne(query, function (err, result) {
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
router.delete('/:slug', function(req, res) {
  var query = { slug: req.params.slug }
  Faction.findOne(query, function (err, result) {
    if (err) { return res.status(400).send(err) }
    if (!result) { return res.status(404).send('not found') }
    Faction.remove(query, function (err, result) {
      if (err) { return res.status(400).send(err) }
      res.send(result)
    })
  })
})

module.exports = router;
