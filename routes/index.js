module.exports = app => {
  
  // Base routes
  const baseRoutes = require("./base.routes");
  app.use("/", baseRoutes);
  
  // Auth routes
  const authRoutes = require("./auth.routes");
  app.use("/", authRoutes); 

  // Student routes
  const studentRoutes = require("./student.routes");
  app.use("/students", studentRoutes);

  // Courses routes
  const coursesRoutes = require("./courses.routes");
  app.use("/courses", coursesRoutes);
}
