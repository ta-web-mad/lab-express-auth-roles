require("dotenv/config");
require("./db");

const express = require("express");
const hbs = require("hbs");
const app = express();

require("./config")(app);
app.locals.siteTitle = `IronLearn`;
require('./config/session.config')(app)

// const { localSession } = require('./middleware/route-guard')
// app.use(localSession)

// Routes
require("./routes")(app)

require("./error-handling")(app);

module.exports = app;
