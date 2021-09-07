module.exports = app => {
  
  // Base routes
  const baseRoutes = require("./base.routes");
  app.use("/", baseRoutes);
  
  // Auth routes
  const authRoutes = require("./auth.routes");
  app.use("/", authRoutes); 

  const students = require('./students.routes')
  app.use('/students', students)

  const courses = require('./courses.routes')
  app.use('/courses', courses)
}
