module.exports = app => {

  // Base routes
  const baseRoutes = require("./base.routes");
  app.use("/", baseRoutes);

  const student = require("./student.router");
  app.use("/estudiantes", student);

  // Auth routes
  const authRoutes = require("./auth.routes");
  app.use("/", authRoutes);

}
