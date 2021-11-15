const router = require("express").Router()
const User = require("../models/User.model")
const {isLoggedIn, isOwnProfile} = require("../middleware/index")
const {isPM, isOwner} = require("../utils/index")

router.get('/students', isLoggedIn, (req, res) => {
	User.find({role: 'STUDENT'})
		.then(students => res.render('students/students', {students}))
		.catch(err => console.log(err))
})

router.get('/students/:id', isLoggedIn, (req, res) => {
	User.findById(req.params.id)
		.then((student) => {
			const profileId = student._id
			const userId = req.session.currentUser._id
			res.render('students/student-details', { student, isPM: isPM(req.session.currentUser), isOwner: isOwner(profileId, userId)})
		})
})

router.get('/students/:id/edit/own-profile', isLoggedIn, isOwnProfile, (req, res) => {
	User.findById(req.params.id)
		.then(student => res.render('students/student-edit-own', student))
		.catch(err => console.log(err))
})

router.post('/students/:id/edit/own-profile', isLoggedIn, isOwnProfile, (req, res) => {
	const { name, profileImg, description } = req.body;
	const id = req.params.id;
	User.findByIdAndUpdate(id, { name, profileImg, description })
		.then(() => res.redirect('/students/' + id))
		.catch(err => console.log(err))
})


module.exports = router


