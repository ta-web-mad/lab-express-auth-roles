module.exports = app => {

  // Base routes
  const indexRouter = require("./index.routes");
  app.use("/", indexRouter);

  // Auth routes
  const authRouter = require("./auth.routes");
  app.use("/", authRouter);

  //Students routes
  const studentsRoutes = require("./students.routes");
  app.use("/", studentsRoutes);

  //User routes
  const userRoutes = require("./user.routes");
  app.use("/", userRoutes);

  //Staff routes
  const staffRoutes = require("./staff.routes");
  app.use("/", staffRoutes);
}
