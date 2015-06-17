var parser = require('body-parser'),
    express = require('express'),
    mongoose = require('mongoose')

var app = express()

// Middleware
app.use(parser.json())
app.use(parser.urlencoded({ extended: false }))

// Routes
app.use('/faction', require('./app/route/faction'))

// Root Route
app.get('/', function (req, res) {
  res.send('Hello World!')
})

// Listen
app.listen(3000)
