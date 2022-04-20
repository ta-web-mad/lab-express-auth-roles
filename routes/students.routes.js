const router = require("express").Router()
const bcrypt = require('bcryptjs')
const req = require("express/lib/request")
const { isLoggedIn, checkRole } = require("../middlewares/route.guard")
const Student = require("../models/User.model")
const saltRounds = 10

// Student Profile
router.get('/students', isLoggedIn, (req, res, next) => {
    Student
        .find()
        .then(student => {
            res.render('team/students', { student })
        })
        .catch(err => console.log(err))
})

router.get('/students/:id', isLoggedIn, (req, res, next) => {
    const { id } = req.params
    const isAdmin = req.session.currentUser.role === 'PM'
    const isStudent = req.session.currentUser._id === id
    if (isStudent || isAdmin) {
        Student
            .findById(id)
            .then(student => {
                res.render('team/student-profile', { student, isAdmin, isStudent })
            })
            .catch(err => console.log(err))
    }
})

router.get('/students/:id/edit', isLoggedIn, (req, res, next) => {
    const { id } = req.params
    const isAdmin = req.session.currentUser.role === 'PM'
    const isStudent = req.session.currentUser._id === id
    Student
        .findById(id)
        .then(student => {
            res.render('team/student-edit', { student, isAdmin, isStudent })
        })
        .catch(err => console.log(err))
})

router.post('/students/:id/edit', isLoggedIn, (req, res, next) => {
    const isAdmin = req.session.currentUser.role === 'PM'
    const { id } = req.params
    const { email, userPwd, username, profileImg, description } = req.body


    Student
        .findByIdAndUpdate(id, { email, userPwd, username, profileImg, description })
        .then(student => {
            res.render('team/student-profile', { student, isAdmin })
        })
        .catch(err => console.log(err))
})

router.post('/students/:id/delete', isLoggedIn, checkRole('PM'), (req, res, next) => {
    const { id } = req.params
    Student
        .findByIdAndDelete(id)
        .then(() => {
            res.redirect('/students')
        })
        .catch(err => console.log(err))
})

router.post('/students/:id/mark-ta', isLoggedIn, (req, res, next) => {
    const isAdmin = req.session.currentUser.role === 'PM'
    const { id } = req.params
    const { role } = req.body


    Student
        .findByIdAndUpdate(id, { role: 'TA' })
        .then(student => {
            res.render('team/student-profile', { student, isAdmin, })
        })
        .catch(err => console.log(err))
})

router.post('/students/:id/mark-dev', isLoggedIn, (req, res, next) => {
    const isAdmin = req.session.currentUser.role === 'PM'
    const { id } = req.params
    const { role } = req.body


    Student
        .findByIdAndUpdate(id, { role: 'DEV' })
        .then(student => {
            res.render('team/student-profile', { student, isAdmin, })
        })
        .catch(err => console.log(err))
})

module.exports = router
