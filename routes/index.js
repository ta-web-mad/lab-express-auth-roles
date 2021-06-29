module.exports = app => {
  app.use('/', require('./base.routes.js')),
  app.use('/students', require('./students.routes.js')),
  app.use('/courses', require('./courses.routes.js'))
}