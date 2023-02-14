require("dotenv/config");

require("./db");

const express = require("express");

const hbs = require("hbs");

const app = express();

require("./config")(app);

app.locals.siteTitle = `IronLearn`;

require('./config/session.config')(app)

require("./routes")(app)

const studentsRoutes = require("./routes/students.routes");
app.use("/students", studentsRoutes)

const staffRoutes = require("./routes/staff.routes");
app.use("/staff", staffRoutes)

const courseRoutes = require("./routes/course.routes");
app.use("/course", courseRoutes)

require("./error-handling")(app);

module.exports = app;
