require('dotenv/config')

require('./db')

const express = require('express')
const hbs = require('hbs')
const app = express()

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require('./config')(app)
require('./config/session.config')(app)

app.locals.title = `IronHack`

// 👇 Start handling routes here
require('./routes')(app)

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require('./error-handling')(app)

module.exports = app
