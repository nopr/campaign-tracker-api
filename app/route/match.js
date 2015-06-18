var express = require('express')
var router = express.Router()

var Model = require('../model/match')

router.get('/', function(req, res) {
  Model.find({}, function (err, result) {
    if (err) { return res.status(400).send(err) }
    if (!result) { return res.status(404).send('not found') }
    res.send(result)
  })
})
router.get('/:id', function(req, res) {
  var query = { id: req.params.id }
  Model.findOne(query, function (err, result) {
    if (err) { return res.status(400).send(err) }
    if (!result) { return res.status(404).send('not found') }
    res.send(result)
  })
})
router.post('/:id', function(req, res) {
  var query = { id: req.params.id }
  var Created = new Model({
    home: {
      player: req.body.home.player.id,
      result: req.body.home.player.result,
      score: req.body.home.player.score
    },
    away: {
      player: req.body.away.player.id,
      result: req.body.away.player.result,
      score: req.body.away.player.score
    }
  })
  Created.save(function (err, result) {
    if (err) { return res.status(400).send(err) }
    res.send(result)
  })
})
router.put('/:id', function(req, res) {
  var query = { id: req.params.id }
  Model.findOne(query, function (err, result) {
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
  var query = { id: req.params.id }
  Model.findOne(query, function (err, result) {
    if (err) { return res.status(400).send(err) }
    if (!result) { return res.status(404).send('not found') }
    Model.remove(query, function (err, result) {
      if (err) { return res.status(400).send(err) }
      res.send(result)
    })
  })
})

module.exports = router;
