module.exports = app => {
  // Base routes
  const indexRouter = require("./index.routes");
  app.use("/", indexRouter);

  // Auth routes
  const authRouter = require("./auth.routes");
  app.use("/", authRouter);

  const studentRouter = require("./student.routes");
  app.use("/", studentRouter);
}
