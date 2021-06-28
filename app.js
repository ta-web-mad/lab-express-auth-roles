require("dotenv/config");

require("./db");

const express = require("express");
const app = express();

require("./config")(app)
require("./config/session.config")(app)         // Configuración de sesión

const projectName = 'lab-express-auth';
const capitalized = string => string[0].toUpperCase() + string.slice(1).toLowerCase()

app.locals.title = `${capitalized(projectName)}- Generated with Ironlauncher`

require("./routes")(app)

require("./error-handling")(app)

module.exports = app