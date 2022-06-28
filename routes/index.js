module.exports = app => {

  // Base routes
  const indexRouter = require("./index.routes");
  app.use("/", indexRouter);

  // Auth routes
  const authRouter = require("./auth.routes");
  app.use("/", authRouter);

  //Students list
  const studentsRouter = require("./student.routes");
  app.use("/", studentsRouter)

}


