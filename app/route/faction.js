var express = require('express')
var router = express.Router()

var Factions = require('../model/faction')

router.get('/', function(req, res) {
  Factions.find({}, function (err, result) {
    if (err) { return res.status(400).send(err) }
    if (!result) { return res.status(404).send('not found') }
    res.send(result)
  })
})
router.get('/:faction', function(req, res) {
  var query = { slug: req.params.faction }
  Factions.findOne(query, function (err, result) {
    if (err) { return res.status(400).send(err) }
    if (!result) { return res.status(404).send('not found') }
    res.send(result)
  })
})
router.post('/:faction', function(req, res) {
  var query = { slug: req.params.faction }
  var Faction = new Factions({
    slug: req.params.faction,
    name: req.body.name
  })
  Factions.findOne(query, function (err, result) {
    if (err) { return res.status(400).send(err) }
    if (result) { return res.status(400).send('already exists') }
    Faction.save(function (err, result) {
      if (err) { return res.status(400).send(err) }
      res.send(result)
    })
  })
})
router.put('/:faction', function(req, res) {
  var query = { slug: req.params.faction }
  Factions.findOne(query, function (err, result) {
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
router.delete('/:faction', function(req, res) {
  var query = { slug: req.params.faction }
  Factions.findOne(query, function (err, result) {
    if (err) { return res.status(400).send(err) }
    if (!result) { return res.status(404).send('not found') }
    Factions.remove(query, function (err, result) {
      if (err) { return res.status(400).send(err) }
      res.send(result)
    })
  })
})

module.exports = router;
