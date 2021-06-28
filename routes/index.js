
module.exports = app => {
  app.use('/', require('./base.routes.js')) //REQUIERO PAGINA DE INICIO
  app.use('/students', require('./students.routes.js')) //REQUIERO LISTADO DE ESTUDIANTES
  app.use('/login', require('./auth.routes.js'))
  // app.use('/usuario', require('./user.routes.js'))
  // app.use('/admin', require('./admin.routes.js'))
}
