module.exports = app => {

  // Base routes
  const indexRouter = require("./index.routes");
  app.use("/", indexRouter);

  // Auth routes
  const authRouter = require("./auth.routes");
  app.use("/", authRouter);

  // User routes
  const userRouter = require('./user.routes.js');
  app.use('/', userRouter)

  // Courses routes
  const courseRouter = require('./course.routes');
  app.use('/', courseRouter);
}



