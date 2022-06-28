module.exports = app => {

  // Base routes
  const indexRouter = require("./index.routes");
  app.use("/", indexRouter);

  // Auth routes
  const authRouter = require("./auth.routes");
  app.use("/", authRouter);


  //Student routes
  const studentRouter = require("./student.routes");
  app.use("/students", studentRouter);

  //PM routes
  const adminRouter = require("./admin.routes");
  app.use("/students", adminRouter);

  //TA routes
  const taRouter = require("./ta.routes");
  app.use("/", taRouter);

}
