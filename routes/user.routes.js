const router = require('express').Router()
const User = require('../models/User.model')

const { isLoggedIn, checkRoles } = require('../middlewares/route-guard')

router.get('/students', isLoggedIn, (req, res) => {
	User.find({ role: 'STUDENT' })
		.then(studentsList => res.render('students/student-list', { students: studentsList }))
		.catch(error => next(error))
})

router.get('/student/:id', isLoggedIn, (req, res) => {
	const { id } = req.params
	const userRoles = {
		isPM: req.session.currentUser?.role === 'PM',
		isMySelf: req.session.currentUser?._id.toString() === id.toString(),
	}

	User.findById(id).then(userFound => {
		if (req.session.currentUser?._id.toString() === id.toString()) {
			if (req.session.currentUser.role === 'STUDENT') {
				req.session.currentUser.role = 'MYSELF'
			}
			console.log('AAAAAA')
		}

		res.render('students/student-details', { userFound, userRoles })
	})
})

router.get('/edit/:id', isLoggedIn, checkRoles('PM', 'MYSELF'), (req, res) => {
	const { id } = req.params
	User.findById(id)
		.then(userFound => res.render('students/student-edit', userFound))
		.catch(error => next(error))
})

router.post('/edit/:id', isLoggedIn, checkRoles('PM', 'MYSELF'), (req, res) => {
	const { id } = req.params
	const { username, profileImg, description } = req.body

	User.findByIdAndUpdate(id, { username, profileImg, description })
		.then(() => res.redirect(`/student/${id}`))
		.catch(error => next(error))
})

router.get('/delete/:id', checkRoles('PM'), (req, res) => {
	const { id } = req.params

	User.findByIdAndDelete(id)
		.then(userDeleted => {
			console.log('Usuario eliminado ---->', userDeleted)
			res.redirect('/students')
		})
		.catch(error => next(error))
})

router.post('/promote/:id/:role', checkRoles('PM'), (req, res) => {
	const { id, role } = req.params

	User.findByIdAndUpdate(id, { role })
		.then(() => res.redirect(`/student/${id}`))
		.catch(error => next(error))
})

module.exports = router
