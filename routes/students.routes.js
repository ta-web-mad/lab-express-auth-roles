const router = require("express").Router()
const User = require("../models/User.model")
const { checkId, isLoggedIn, checkRoles } = require("./../middleware")
const { userIsPM } = require("./../utils")


// Students list
router.get("/", isLoggedIn, (req, res, next) => {

  User
    .find({ role: 'STUDENT' })
    .then(students => res.render("students/students", { students }))
    .catch(err => console.log(err))
})


// Student profile
router.get('/:id', isLoggedIn, checkId, (req, res) => {

  const { id } = req.params
  const isPM = userIsPM(req.session.currentUser)

  User
    .findById(id)
    .select('username name profileImg description')
    .then(student => res.render("students/student-profile", { student, id, isPM }))
    .catch(err => console.log(err))
})


// Delete student
router.post('/:id/delete', isLoggedIn, checkRoles('PM'), checkId, (req, res)=> {

  const { id } = req.params

  User
    .findByIdAndRemove(id)
    .then(() => res.redirect('/students'))
    .catch(err => console.log(err))
})


// Edit student profile: rendering
router.get('/:id/edit', isLoggedIn, checkRoles('PM'), checkId, (req, res) => {

  const { id } = req.params

  User
    .findById(id)
    .select({ password: 0 })
    .then(student => res.render("students/edit-student", { student, id }))
    .catch(err => console.log(err))
})


// Edit student profile: management
router.post('/:id/edit', isLoggedIn, checkRoles('PM'), checkId, (req, res) => {

  const { id } = req.params
  const { username, name, profileImg, description, role } = req.body

  User
    .findByIdAndUpdate(id, { username, name, profileImg, description, role }, { new: true })
    .then(user => user.role === 'STUDENT' ? res.redirect(`/students/${id}`) : res.redirect('/students'))
    .catch(err => console.log(err))
})


// Mark student as DEV
router.post('/:id/mark-dev', isLoggedIn, checkRoles('PM'), checkId, (req, res) => {

  const { id } = req.params
  const { role } = req.body

  User
    .findByIdAndUpdate(id, { role }, { new: true })
    .then(() => res.redirect('/students'))
    .catch(err => console.log(err))
})


// Mark student as TA
router.post('/:id/mark-ta', isLoggedIn, checkRoles('PM'), checkId, (req, res) => {

  const { id } = req.params
  const { role } = req.body

  User
    .findByIdAndUpdate(id, { role }, { new: true })
    .then(() => res.redirect('/students'))
    .catch(err => console.log(err))
})


module.exports = router
