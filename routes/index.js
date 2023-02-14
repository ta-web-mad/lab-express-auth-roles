module.exports = app => {

  const indexRouter = require("./index.routes");
  app.use("/", indexRouter);

  const studentRouter = require("./student.routes");
  app.use("/students", studentRouter);

  const authRouter = require("./auth.routes");
  app.use("/", authRouter);

  const coursesRouter = require("./courses.routes");
  app.use("/courses", coursesRouter);

  const adminRouter = require("./admin.routes");
  app.use("/admin", adminRouter);
}
