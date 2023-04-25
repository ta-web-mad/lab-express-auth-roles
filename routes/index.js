module.exports = (app) => {
  // Base routes
  const indexRouter = require("./index.routes");
  app.use("/", indexRouter);

  // Auth routes
  const authRouter = require("./auth.routes");
  app.use("/", authRouter);

  // Users routes
  const indexStudent = require("./users.routes");
  app.use("/users", indexStudent);

  // Course routes
  const indexCourse = require("./courses.routes");
  app.use("/courses", indexCourse);
};
