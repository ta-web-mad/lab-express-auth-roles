module.exports = app => {

  // Base routes
  const indexRouter = require("./index.routes");
  app.use("/", indexRouter);

  // Auth routes
  const authRouter = require("./auth.routes");
  app.use("/", authRouter);

  // Students
  const studentsRouter = require("./student.routes")
  app.use("/", studentsRouter);


  // Courses
  const courseRouter = require("./course.routes")
  app.use("/", courseRouter);

}