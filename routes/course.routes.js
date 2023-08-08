const router = require('express').Router()

const Course = require('../models/Course.model')
const User = require('../models/User.model')

const { isLoggedIn, checkRoles } = require('../middlewares/route-guard')
const { formatDate } = require('../utils/date-utils')

router.get('/crear-curso', isLoggedIn, checkRoles('TA'), (req, res, next) => {
	const promises = [
		User.find({ role: 'DEV' }),
		User.find({ role: 'TA' }),
		User.find({ role: 'STUDENT' }),
	]
	Promise.all(promises).then(results => {
		const [devUsers, taUsers, studentUsers] = results
		res.render('course/create-form', { devUsers, taUsers, studentUsers })
	})
})

router.post('/crear-curso', isLoggedIn, checkRoles('TA'), (req, res, next) => {
	const { title, leadTeacher, startDate, endDate, ta, courseImg, description, students } =
		req.body
	Course.create({ title, leadTeacher, startDate, endDate, ta, courseImg, description, students })
		.then(course => res.redirect('/courses'))
		.catch(error => next(error))
})

router.get('/courses', isLoggedIn, checkRoles('TA'), (req, res, next) => {
	Course.find()
		.then(coursesList => res.render('course/courses', { coursesList }))
		.catch(error => next(error))
})

router.get('/course/:id', isLoggedIn, checkRoles('TA'), (req, res, next) => {
	const { id } = req.params
	Course.findById(id)
		.populate('leadTeacher')
		.populate('ta')
		.populate('students')
		.then(courseFound => {
			courseFound.formattedStartDate = formatDate(courseFound.startDate)
			courseFound.formattedEndDate = formatDate(courseFound.endDate)
			res.render('course/course-details', courseFound)
		})
		.catch(error => next(error))
})

router.get('/edit-course/:id', isLoggedIn, checkRoles('TA'), (req, res, next) => {
	const { id } = req.params

	const promises = [
		Course.findById(id),
		User.find({ role: 'DEV' }),
		User.find({ role: 'TA' }),
		User.find({ role: 'STUDENT' }),
	]
	Promise.all(promises)
		.then(results => {
			const [courseFound, devUsers, taUsers, studentUsers] = results
			res.render('course/edit-form', { courseFound, devUsers, taUsers, studentUsers })
		})
		.catch(error => next(error))
})

router.post('/edit-course/:id', isLoggedIn, checkRoles('TA'), (req, res, next) => {
	const { id } = req.params
	const { title, leadTeacher, startDate, endDate, ta, courseImg, description, students } =
		req.body

	Course.findByIdAndUpdate(id, {
		title,
		leadTeacher,
		startDate,
		endDate,
		ta,
		courseImg,
		description,
		students,
	})
		.populate('leadTeacher')
		.populate('ta')
		.populate('students')
		.then(() => res.redirect(`/course/${id}`))
		.catch(error => next(error))
})

router.get('/delete-course/:id', isLoggedIn, checkRoles('TA'), (req, res, next) => {
	const { id } = req.params

	Course.findByIdAndDelete(id)
		.then(res.redirect('/courses'))
		.catch(error => next(error))
})

module.exports = router
