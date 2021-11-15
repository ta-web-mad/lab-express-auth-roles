module.exports = (app) => {
  // Base routes
  const baseRoutes = require("./base.routes");
  app.use("/", baseRoutes);

  // Auth routes
  const authRoutes = require("./auth.routes");
  app.use("/", authRoutes);

  // Students routes
  app.use("/students", require("./students.routes"));

  // Courses routes
  app.use("/courses", require("./courses.routes"));
};
