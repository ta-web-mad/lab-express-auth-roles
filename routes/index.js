module.exports = app => {
  
  // Base routes
  const baseRoutes = require("./base.routes");
  app.use("/", baseRoutes);
  
  // Auth routes
  const authRoutes = require("./auth.routes");
  app.use("/", authRoutes); 

  // Students routes
  const studentsRoutes = require("./students.routes");
  app.use("/students", studentsRoutes);

  // app.use("/students", require("./students.routes"));
}
