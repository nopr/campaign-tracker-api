var express = require('express')
var router = express.Router()

router.get('/', function(req, res) {
  res.send('get factions')
})
router.get('/:faction', function(req, res) {
  res.send('read a faction')
})
router.post('/:faction', function(req, res) {
  res.send('create a faction')
})
router.put('/:faction', function(req, res) {
  res.send('edit a faction')
})
router.delete('/:faction', function(req, res) {
  res.send('delete a faction')
})

module.exports = router;
