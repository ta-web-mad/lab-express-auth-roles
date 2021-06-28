module.exports = app => {
  app.use('/', require('./base.routes.js'))
  app.use('/login', require('./login.routes.js'))
  app.use('/register', require('./register.routes.js'))
  app.use('/students', require('./students.routes.js'))
}
