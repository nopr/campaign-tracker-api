var express = require('express')
var router = express.Router()

var Model = require('../model/faction')

router.get('/', function(req, res) {
  Model.find({}, function (err, result) {
    if (err) { return res.status(400).send(err) }
    if (!result) { return res.status(404).send('not found') }
    res.send(result)
  })
})
router.get('/:slug', function(req, res) {
  var query = { slug: req.params.slug }
  Model.findOne(query, function (err, result) {
    if (err) { return res.status(400).send(err) }
    if (!result) { return res.status(404).send('not found') }
    res.send(result)
  })
})
router.post('/:slug', function(req, res) {
  var query = { slug: req.params.slug }
  var Created = new Model({
    slug: req.params.slug,
    name: req.body.name
  })
  Model.findOne(query, function (err, result) {
    if (err) { return res.status(400).send(err) }
    if (result) { return res.status(400).send('already exists') }
    Created.save(function (err, result) {
      if (err) { return res.status(400).send(err) }
      res.send(result)
    })
  })
})
router.put('/:slug', function(req, res) {
  var query = { slug: req.params.slug }
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
router.delete('/:slug', function(req, res) {
  var query = { slug: req.params.slug }
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
