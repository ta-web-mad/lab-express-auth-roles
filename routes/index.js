module.exports = (app) => {
  // Base routes
  const baseRoutes = require("./base.routes");
  app.use("/", baseRoutes);

  const studentRoutes = require("./students.routes");
  app.use("/students", studentRoutes);

  

  // Auth routes
  const authRoutes = require("./auth.routes");
  app.use("/", authRoutes);
};
