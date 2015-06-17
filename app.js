var express = require('express'),
    mongoose = require('mongoose')

var app = express()

app.get('/', function (req, res) {
  res.send('Hello World!')
})
app.use('/faction', require('./app/route/faction'))

app.listen(3000)
