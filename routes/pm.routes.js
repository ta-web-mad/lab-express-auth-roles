const router = require("express").Router()
const User = require("../models/User.model")
const { checkRoles, isLoggedIn} = require("../middleware/index")
const {isPM} = require("../utils/index")

router.get('/users', isLoggedIn, checkRoles('PM'), (req, res)=>{
	User.find()
		.then(allUsers => res.render('all-users', {allUsers}))
		.catch(err => console.log(err))
})

router.get('/students/:id/delete', isLoggedIn, checkRoles('PM'), (req, res) => {
	User.findById(req.params.id)
		.then(student => res.render('students/student-delete', student))
		.catch(err => console.log(err))
})

router.post('/students/:id/delete', isLoggedIn, checkRoles('PM'), (req, res) => {
	User.findByIdAndDelete(req.params.id)
		.then(() => res.redirect('/students'))
		.catch(err => console.log(err))
})

router.get('/students/:id/edit', isLoggedIn, checkRoles('PM'), (req, res) => {
	User.findById(req.params.id)
		.then(student => res.render('students/student-edit', student))
		.catch(err => console.log(err))
})

router.post('/students/:id/edit', isLoggedIn, checkRoles('PM'), (req, res) => {
	const {name, profileImg, description} = req.body;
	const id = req.params.id;
	User.findByIdAndUpdate(id, {name, profileImg, description})
		.then(() => res.redirect('/students/'+id))
})

router.post('/students/:id/makeTA', isLoggedIn, checkRoles('PM'), (req, res)=>{
	User.findByIdAndUpdate(req.params.id, {role: 'TA'})
		.then(() => res.redirect(`/students/${req.params.id}`))
})

router.post('/students/:id/makeDEV', isLoggedIn, checkRoles('PM'), (req, res)=>{
	User.findByIdAndUpdate(req.params.id, {role: 'DEV'})
		.then(() => res.redirect(`/students/${req.params.id}`))
})


module.exports = router