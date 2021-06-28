
module.exports = app => {
  app.use('/students', require('./students.routes.js'))
  app.use('/', require('./auth.routes.js'))
  app.use('/', require('./base.routes.js'))
  //app.use('/usuario', require('./user.routes.js'))
  //app.use('/admin', require('./admin.routes.js'))
}

