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

  // User routes
  const userRoutes = require("./user.routes");
  app.use("/", userRoutes)

   // Courses routes
   const coursesRoutes = require("./courses.routes");
   app.use("/courses", coursesRoutes)
}
