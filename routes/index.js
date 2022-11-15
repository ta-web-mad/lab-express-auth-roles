module.exports = app => {

  // Base routes
  const indexRouter = require("./index.routes");
  app.use("/", indexRouter);

  const studentRouter = require("./student.routes")
  app.use("/students", studentRouter)

  // Auth routes
  const authRouter = require("./auth.routes");
  app.use("/", authRouter);
}
