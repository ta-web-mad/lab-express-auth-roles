module.exports = app => {

  // Base routes
  const indexRouter = require("./index.routes");
  app.use("/", indexRouter);

  // Auth routes
  const authRouter = require("./auth.routes");
  app.use("/", authRouter);

  const userRouter = require("./user.routes");
  app.use("/", userRouter);

  const PMRouter = require("./PM.routes");
  app.use("/", PMRouter);
}

