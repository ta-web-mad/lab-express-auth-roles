require('dotenv').config()

// DB connection
require('./config/db.config')

// Debug
require('./config/debug.config')

// HBS
require('./config/hbs.config')

// App
const express = require('express')
const app = express()

// var exphbs = require('express-handlebars');
// app.engine('.hbs', exphbs({ defaultLayout: 'layout', extname: '.hbs', layoutsDir: './views/' }));
// app.set('view engine', 'hbs');

// App settings
require('./config/sass.config')(app)
require('./config/middleware.config')(app)
require('./config/views.config')(app)
require('./config/locals.config')(app)
require('./config/session.config')(app)

// Routes index
require('./routes')(app)

// Error handling
require('./config/error-handlers.config')(app)


module.exports = app