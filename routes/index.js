module.exports = app => {

  // Base routes
  const indexRouter = require("./index.routes");
  app.use("/", indexRouter);

  // Auth routes
  const authRouter = require("./auth.routes");
  app.use("/", authRouter);

  //User routes añadida por mi
  const userRouter = require("./user.routes");
  app.use("/", userRouter);
}
