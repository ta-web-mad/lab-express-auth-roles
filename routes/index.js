module.exports = app => {
  const indexRouter = require('./index.routes')
  app.use('/', indexRouter)

  const authRouter = require('./auth.routes')
  app.use('/', authRouter)

  const membersRouter = require('./members.routes')
  app.use('/members', membersRouter)

  const studentsRouter = require('./students.routes')
  app.use('/students', studentsRouter)
}
