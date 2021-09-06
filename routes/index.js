module.exports = app => {
  
  // Base routes
  app.use("/", require("./base.routes"));
  
  // Auth routes
  app.use("/", require("./auth.routes")); 

  //Students Routes

  app.use("/students", require("./students.routes")); 
}
