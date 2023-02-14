module.exports = app => {

  const indexRouter = require("./index.routes");
  app.use("/", indexRouter);

  const authRouter = require("./auth.routes");
  app.use("/", authRouter);

  const studentRouter = require('./student.routes')
  app.use('/students', studentRouter)

  const staffRouter = require('./staff.routes')
  app.use('/staff', staffRouter)

  const coursesRouter = require('./courses.routes')
  app.use('/courses', coursesRouter)
}
