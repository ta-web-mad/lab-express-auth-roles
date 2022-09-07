const { TA, STUDENT } = require("../const")
const isLogged = require("../middleware/isLogged.middleware")
const checkRole = require("../middleware/roles.middleware")
const roleValidation = require('../middleware/roleValidation.middleware')

module.exports = app => {
  app.use(checkRole)

  // Base routes
  const indexRouter = require("./index.routes");
  app.use("/", indexRouter);

  // Auth routes
  const authRouter = require("./auth.routes");
  app.use("/", authRouter);

  // Student routes
  const studentRouter = require("./students.routes");
  app.use("/students", isLogged(app), studentRouter);

  // Courses routes
  // Aqui podemos meter un if con isTa por ejemplo, pero voy a hacer un middleware
  const coursesRouter = require("./courses.routes");
  app.use("/courses", roleValidation(TA, STUDENT), coursesRouter);
}
