const express = require('express')
const { isLoggedIn, checkRoles, checkStudents } = require('../middlewares/route-guard')
const router = express.Router()

const User = require('../models/User.model')

router.get('/students', isLoggedIn, (req, res, next) => {

    User
        .find()
        .select({ username: 1 })
        .then(students => res.render('user/user-list', { students }))
        .catch(err => console.log(err))
})

router.get('/students/:student_id', isLoggedIn, (req, res, next) => {
    const { student_id } = req.params

    const userRole = {
        isPM: req.session.currentUser?.role === 'PM',
        isStudent: req.session.currentUser?._id === student_id
    }

    User
        .findById(student_id)
        .then(student => res.render('user/profile', { student, userRole }))
        .catch(err => console.log(err))
})


router.get('/students/edit/:student_id', isLoggedIn, checkStudents, (req, res, next) => {

    const { student_id } = req.params

    User
        .findById(student_id)
        .then(student => res.render('user/edit', student))
        .catch(err => console.log(err))
})

router.post('/students/edit/:student_id', isLoggedIn, checkStudents, (req, res, next) => {

    const { username, email, profileImg, description } = req.body
    const { student_id } = req.params

    User
        .findByIdAndUpdate(student_id, { username, email, profileImg, description })
        .then(() => res.redirect(`/students/${student_id}`))
        .catch(err => console.log(err))
})

router.post('/students/delete/:student_id', isLoggedIn, checkRoles('PM'), (req, res, next) => {

    const { student_id } = req.params

    User
        .findByIdAndDelete(student_id)
        .then(() => res.redirect(`/students`))
        .catch(err => console.log(err))
})


router.post('/students/ta/:student_id', isLoggedIn, checkRoles('PM'), (req, res, next) => {

    const { student_id } = req.params

    User
        .findByIdAndUpdate(student_id, { role: 'TA' })
        .then(() => res.redirect(`/students/${student_id}`))
        .catch(err => console.log(err))
})

router.post('/students/dev/:student_id', isLoggedIn, checkRoles('PM'), (req, res, next) => {

    const { student_id } = req.params

    User
        .findByIdAndUpdate(student_id, { role: 'DEV' })
        .then(() => res.redirect(`/students/${student_id}`))
        .catch(err => console.log(err))
})

module.exports = router
