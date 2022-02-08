const { isLoggedIn, checkRole } = require("../middleware/route-guard");

const User = require('../models/User.model');
const { isStudent, isPm, isTa, sameUser } = require("../utils");

const router = require("express").Router()

//Student list
router.get('/students', isLoggedIn, (req, res, next) => {

    User
        .find({ role: 'STUDENT' })
        .then(allStudents => res.render('students-list', { allStudents }))
        .catch(err => next(err))
})


// Student details
router.get('/students/:id', isLoggedIn, (req, res, next) => {

    const { id } = req.params

    User
        .findById(id)
        .then(student => res.render('students-profile', {
            student,
            user: req.session.currentUser,
            isPm: isPm(req.session.currentUser),
            isStudent: isStudent(req.session.currentUser)
        }))
        .catch(err => next(err))
})

// Delete student
router.post('/students/:id/delete', isLoggedIn, checkRole('PM'), (req, res, next) => {

    const { id } = req.params

    User
        .findByIdAndDelete(id)
        .then(() => res.redirect('/students'))
        .catch(err => next(err))
})

// Edit student
router.get('/students/:id/edit', isLoggedIn, checkRole('PM'), (req, res, next) => {

    const { id } = req.params

    User
        .findById(id)
        .then(student => res.render('edit-student', student))
        .catch(err => next(err))
})

router.post('/students/:id/edit', isLoggedIn, checkRole('PM'), (req, res, next) => {

    const { id } = req.params
    const { username, email, profileImg, description } = req.body

    User
        .findByIdAndUpdate(id, { username, email, profileImg, description }, { new: true })
        .then(updatedStudent => res.redirect(`/students/${updatedStudent.id}`))
        .catch(err => next(err))
})

// Role handling
router.post('/students/:id/ista', isLoggedIn, checkRole('PM'), (req, res, next) => {

    const { id } = req.params

    User
        .findByIdAndUpdate(id, { role: 'TA' })
        .then(updatedStudent => res.redirect(`/students/${updatedStudent.id}`))
        .catch(err => next(err))
})

router.post('/students/:id/isdev', isLoggedIn, checkRole('PM'), (req, res, next) => {

    const { id } = req.params

    User
        .findByIdAndUpdate(id, { role: 'DEV' })
        .then(updatedStudent => res.redirect(`/students/${updatedStudent.id}`))
        .catch(err => next(err))
})

// User profile editing


module.exports = router