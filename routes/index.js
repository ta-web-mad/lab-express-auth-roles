module.exports = app => {

  // Base routes
  const baseRoutes = require("./base.routes");
  app.use("/", baseRoutes);

  // Auth routes
  const authRoutes = require("./auth.routes");
  app.use("/", authRoutes);

  // Students routes
  const students = require("./student.routes");
  app.use("/student", students);

  //User Routes
  const userRoutes = require("./user.routes")
  app.use("/", userRoutes)
}
