module.exports = app => {
	// Base URLS
	app.use('/', require('./base.routes.js'))
	app.use('/', require('./auth.routes.js'))
	app.use('/general-manager', require('./gm.routes.js'))
	app.use('/employee', require('./employee.routes.js'))
	app.use('/course', require('./course.routes.js'))

}
