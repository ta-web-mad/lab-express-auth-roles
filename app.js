require('dotenv/config')
require('./db')
const express = require('express')
const app = express()

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require('./config')(app)
require('./config/session.config')(app)

app.locals.siteTitle = `IronLearn`

// Session config
require('./config/session.config')(app)

// Routes
require('./routes')(app)

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require('./error-handling')(app)

module.exports = app
