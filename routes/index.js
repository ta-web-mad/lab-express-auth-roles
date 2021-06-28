module.exports = app => {
  app.use('/', require('./base.routes.js')),
  app.use('/students', require('./students.routes.js'))
}