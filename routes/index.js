module.exports = app => {

  // Base routes
  const indexRouter = require("./index.routes");
  app.use("/", indexRouter);

  // Auth routes
  const authRouter = require("./auth.routes");
  app.use("/", authRouter);

  //Users routes
  const usersRouter = require("./users.routes");
  app.use("/", usersRouter);

}



