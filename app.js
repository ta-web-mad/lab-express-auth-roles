// const { roleValidation } = require('../middleware/roles.middleware');
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

app.locals.siteTitle = `IronLearn`;

// app.use((req, res, next) => {
//     if (req.session.user.role === "PM") {
//         app.locals.pm = req.session.user.role;
//     } else if () {
//         app.locals.dev = req.session.user.username;
//     }
//     next();
// })

// Session config
require('./config/session.config')(app)

// Routes
require("./routes")(app)

const students = require('./routes/students.routes');
app.use('/students', students);

const admin = require('./routes/admin.routes');
app.use('/admin', admin);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
