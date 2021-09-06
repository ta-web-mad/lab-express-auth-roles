const User = require("../models/User.model")

const router = require("express").Router()

const { sameUser, isLoggedIn, checkRoles } = require("../middleware")


// DISPLAY ALL STUDENTS (only names)
router.get('/', isLoggedIn, (req, res) => {

    User
    .find()
    .select('username')
    .then(theStudents => res.render('students/students', {theStudents}))
    .catch(err => console.log(err))
})


// DISPLAY STUDENT PROFILE
router.get('/:id', isLoggedIn, (req, res) => {

    const { id } = req.params

    User
    .findById(id)
    .then(theStudent => res.render('students/student-profile', {theStudent, isPM: req.session.currentUser?.role === "PM", sameUser: req.session.currentUser?._id === req.params.id}))
    .catch(err => console.log(err))

})


// EDIT STUDENTS
router.get('/:id/edit', isLoggedIn, checkRoles('PM'), (req, res) => {

    const { id } = req.params

    User
    .findById(id)
    .then(theStudent => res.render('students/student-edit', {theStudent, isPM: req.session.currentUser?.role === "PM"}))
    .catch(err => console.log(err))
})

router.post('/:id/edit', isLoggedIn, checkRoles('PM'), (req, res) => {

    const { id, username, role } = req.body

    User
    .findByIdAndUpdate(id, {username, role})
    .then(theStudent => res.redirect('/'))
    .catch(err => console.log(err))
})


// DELETE STUDENTS
router.get('/:id/delete', isLoggedIn, checkRoles('PM'), (req, res) => {

    const { id } = req.params

    User
    .findByIdAndDelete(id)
    .then(res.redirect('/students'))
    .catch(err => console.log(err))
})

// MAKE TA
router.get('/:id/ta', isLoggedIn, checkRoles('PM'), (req, res) => {

    const { id } = req.params

    User
    .findByIdAndUpdate(id, {role: "TA"})
    .then(res.redirect(`/students/${id}`))
    .catch(err => console.log(err))
})


// MAKE DEV
router.get('/:id/dev', isLoggedIn, checkRoles('PM'), (req, res) => {

    const { id } = req.params

    User
    .findByIdAndUpdate(id, {role: "DEV"})
    .then(res.redirect(`/students/${id}`))
    .catch(err => console.log(err))
})


// STUDENTS CAN EDIT THEIR OWN PROFILES

router.get('/:id/editme', isLoggedIn, sameUser, (req, res) => {

    const { id } = req.params

    User
    .findById(id)
    .then(theStudent => res.render('students/student-edit-own', {theStudent}))
    .catch(err => console.log(err))
  
})


router.post('/:id/editme', isLoggedIn, sameUser, (req, res) => {

    const { id, username, role } = req.body

    User
    .findByIdAndUpdate(id, {username, role})
    .then(res.redirect('/students/'))
    .catch(err => console.log(err))
})

module.exports = router
