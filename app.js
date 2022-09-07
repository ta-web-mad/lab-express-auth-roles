// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

const session = require('./config/session.config');
session(app);

app.locals.siteTitle = `IronLearn`;

app.use((req, res, next) => {
    if (req.session.currentUser) {
        app.locals.username = req.session.currentUser.username;
        app.locals.profileImg = req.session.currentUser.profileImg;
        app.locals._id = req.session.currentUser._id;
    } else {
        app.locals.username = null;
        app.locals.profileImg = null;
        app.locals._id = null;
    }
    next();
});


// Session config
require('./config/session.config')(app)

// Routes
require("./routes")(app)

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
