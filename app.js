require("dotenv/config");

require("./db");

const express = require("express");

const hbs = require("hbs");

const app = express();

require("./config")(app)
require("./config/session.config")(app)         // Configuración de sesión

app.locals.siteTitle = 'lab-express-auth-roles';

require("./routes")(app)

require("./error-handling")(app);

module.exports = app;
