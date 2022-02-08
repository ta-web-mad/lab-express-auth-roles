
require("dotenv/config");

require("./db");

const express = require("express");

const app = express();

require("./config")(app);

app.locals.siteTitle = `IronLearn`;

// Session config
require('./config/session.config')(app)

// Routes
require("./routes")(app) //--> si no especificamos ruta, rutea al archivo 'index.js'

require("./error-handling")(app);

module.exports = app;
