module.exports = app => {

  // Base routes
  app.use("/", require("./base.routes"))
  app.use("/", require("./auth.routes"))
  app.use("/students", require("./students.routes"))
}
