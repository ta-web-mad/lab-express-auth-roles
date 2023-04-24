module.exports = (app) => {
  // Base routes
  const indexRouter = require("./index.routes");
  app.use("/", indexRouter);

  // Auth routes
  const authRouter = require("./auth.routes");
  app.use("/", authRouter);

  const studentsRouter = require("./students.routes");
  app.use("/students", studentsRouter);

  const coursesRouter = require("./courses.routes");
  app.use("/courses", coursesRouter);
};
