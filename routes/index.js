module.exports = app => {
  app.use('/', require('./auth.routes.js'))
  app.use('/', require('./base.routes.js'))
  app.use('/student', require('./student.routes.js'))
  app.use('/login', require('./login.routes'))
  app.use('/register', require('./register.routes.js'))
  app.use('/pm', require('./pm.routes.js'))
}
