module.exports = (app) => {
  // Base routes
  const indexRouter = require("./base.routes");
  app.use("/", indexRouter);

  // Auth routes
  const authRouter = require("./auth.routes");
  app.use("/", authRouter);

  // Students routes
  const studentsRouter = require("./students.routes");
  app.use("/", studentsRouter);
};
