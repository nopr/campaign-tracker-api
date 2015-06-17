var parser = require('body-parser'),
    express = require('express'),
    mongoose = require('mongoose'),
    cors = require('cors')

var app = express()

// Middleware
app.use(cors())
app.use(parser.json())
app.use(parser.urlencoded({ extended: false }))

// Routes
app.use('/faction', require('./app/route/faction'))

// Root Route
app.get('/', function (req, res) {
  res.send('Hello World!')
})

// Listen
app.listen(process.env.PORT || 5000)
