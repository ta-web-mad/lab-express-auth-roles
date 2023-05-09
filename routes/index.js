module.exports = app => {

  // Base routes
  const indexRouter = require("./index.routes");
  app.use("/", indexRouter);

  // Auth routes
  const authRouter = require("./auth.routes");
  app.use("/", authRouter);

  // privilege routes
  const privilegeRouter = require("./privilege.routes");
  app.use("/", privilegeRouter);

  //courses routes
  const coursesRouter = require("./courses.routes");
  app.use("/", coursesRouter);
}
