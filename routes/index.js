module.exports = (app) => {
  // Base routes
  app.use("/", require("./base.routes"));
  // Auth routes
  app.use("/", require("./auth.routes"));
  // Student routes
  app.use("/", require("./student.routes"));
  //TA routes
  app.use("/", require("./courses.routes"));
};
