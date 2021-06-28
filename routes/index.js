module.exports = app => {
  app.use('/', require('./base.routes'))
  app.use('/', require('./students.routes.js'))
  
}