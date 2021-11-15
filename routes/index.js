module.exports = app => {
  
  // Base routes
  app.use("/", require("./base.routes"));
  // Auth routes
  app.use("/", require("./auth.routes"));
  // Students routes
  app.use("/students", require("./students.routes"));
  
  app.use("/", require("./pm.routes"))
}
