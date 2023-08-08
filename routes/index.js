module.exports = app => {

  // Base routes
  const indexRouter = require("./index.routes");
  app.use("/", indexRouter);

  // Auth routes
  const authRouter = require("./auth.routes");
  app.use("/", authRouter);

  // Student routes
  const studentRouter = require("./student.routes");
  app.use("/student", studentRouter);


  const userRoutes = require("./../routes/user.routes")
  app.use("/user", userRoutes)

}
