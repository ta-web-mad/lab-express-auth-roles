module.exports = app => {
  
  // Base routes
  app.use("/", require("./base.routes"));
  
  // Auth routes
  app.use("/", require("./auth.routes")); 

  //Students Routes

  app.use("/estudiantes", require("./students.routes")); 

  //Courses

  app.use("/cursos", require("./courses.routes"))
}
