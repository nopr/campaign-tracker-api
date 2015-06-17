var mongoose = require('mongoose')

mongoose.connect('mongodb://186:186@ds043952.mongolab.com:43952/heroku_98518n4l')

var db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function (callback) {
  console.log('connection to database successful')
})

module.exports = db
