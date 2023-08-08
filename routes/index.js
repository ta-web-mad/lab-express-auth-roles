module.exports = app => {

  // Base routes
  const indexRouter = require("./index.routes");
  app.use("/", indexRouter);

  // Auth routes
  const authRouter = require("./auth.routes");
  app.use("/", authRouter);

  // Students routes
  const studentsRouter = require("./students.routes");
  app.use("/", studentsRouter);

  // PM routes
  const pmRouter = require("./pm.routes");
  app.use("/", pmRouter)
}
