module.exports = app => {

  const indexRouter = require("./index.routes");
  app.use("/", indexRouter);

  const authRouter = require("./auth.routes");
  app.use("/", authRouter);

  const studentsRouter = require('./students.routes')
  app.use('/students', studentsRouter)

  const staffRouter = require('./staff.routes')
  app.use('/staff', staffRouter)

  const coursesRouter = require('./courses.routes')
  app.use('/courses', coursesRouter)

}
