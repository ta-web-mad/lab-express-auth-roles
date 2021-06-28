module.exports = app => {
  // app.use('/courses', require('./courses.routes.js'))
  app.use('/', require('./auth-routes.js'))
  app.use('/', require('./bases.js'))
  app.use('/user', require('./user-routes.js'))
  app.use('/admin', require('./admin-routes.js'))
}