module.exports = app => {
	// Base URLS
	app.use('/', require('./base.routes.js'))
	app.use('/', require('./auth.routes.js'))
	app.use('/students', require('./students.routes.js'))
	app.use('/courses', require('./courses.routes.js'))
	app.use('/admin', require('./admin.routes.js'))
}
