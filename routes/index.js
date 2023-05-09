module.exports = app => {

  // Base routes
  const indexRouter = require("./index.routes");
  app.use("/", indexRouter);

  // Auth routes
  const authRouter = require("./auth.routes");
  app.use("/", authRouter);

  //Students routes
  const studentRouter = require("./student.routes")
  app.use("/", studentRouter)

  //Pm Routes
  const pmRouter = require("./pm.routes")
  app.use("/pm", pmRouter)
}
