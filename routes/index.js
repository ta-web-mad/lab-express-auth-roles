module.exports = app => {

  // Base routes
  const indexRouter = require("./index.routes");
  app.use("/", indexRouter);

  // Auth routes
  const authRouter = require("./auth.routes");
  app.use("/", authRouter);

  //Student routes
  const studentRouter = require('./students.routes')
  app.use('/students', studentRouter)

  //Courses routes
  const coursesRouter = require('./courses.routes')
  app.use('/courses', coursesRouter)

}
