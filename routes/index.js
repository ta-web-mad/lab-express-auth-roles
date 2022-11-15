module.exports = app => {

  // Base routes
  const indexRouter = require("./index.routes");
  app.use("/", indexRouter);

  // Auth routes
  const authRouter = require("./auth.routes");
  app.use("/", authRouter);

  // students routes
  const studentsRouter = require("./student.routes");
  app.use("/student", studentsRouter);
}



