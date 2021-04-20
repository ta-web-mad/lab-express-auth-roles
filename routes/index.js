module.exports = app => {
	// Base URLS
	app.use('/students', require('./students.routes.js'))
	app.use('/', require('./base.routes.js'))
	app.use('/', require('./auth.routes.js'))
}
