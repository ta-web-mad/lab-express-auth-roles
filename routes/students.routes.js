const router = require("express").Router()
const User = require("../models/User.model")

const { isLoggedOut } = require('./../middleware/route-guard')
const { isLoggedIn } = require('./../middleware/route-guard')

// Students list route

router.get('/students', isLoggedIn, (req, res, next) => {

    User

        .find({ role: "STUDENT" })
        .then(students => {
            res.render('students', { students })
        })
        .catch(err => console.log(err))
})

// Students profile route

router.get('/students/:id', isLoggedIn, (req, res, next) => {
    const { id } = req.params
    const isPM = req.session.currentUser.role === 'PM'
    const isMine = req.session.currentUser._id === id

    User
        .findById(id)
        .then(student => {
            res.render('student-profile', { student, isPM, isMine })
        })
        .catch(err => console.log(err))
})


// PM Delete Student profile

router.post('/students/:id/delete', (req, res, next) => {

    const { id } = req.params

    User
        .findByIdAndDelete(id)
        .then(() => {
            res.redirect('/students')
        })
        .catch(err => console.log(err))
})


// PM Edit Student profile

router.get('/students/:id/edit', (req, res, next) => {

    const { id } = req.params

    User
        .findById(id)
        .then(student => {
            res.render('edit-student', student)
        })
        .catch(err => console.log(err))
})

router.post('/students/:id/edit', (req, res, next) => {

    const { id } = req.params
    const { username, email, description, profileImg } = req.body

    User
        .findByIdAndUpdate(id, { username, email, description, profileImg })
        .then(student => {
            res.redirect(`/students/${student.id}`)
        })
        .catch(err => console.log(err))
})

// PM upgrades to Developer

router.post('/students/:id/upgrade-dev', (req, res, next) => {

    const { id } = req.params

    User
        .findByIdAndUpdate(id, { role: 'DEV' })
        .then(() => {
            res.redirect('/students')
        })
        .catch(err => console.log(err))
})

// PM upgrades to TA

router.post('/students/:id/upgrade-ta', (req, res, next) => {

    const { id } = req.params

    User
        .findByIdAndUpdate(id, { role: 'TA' })
        .then(() => {
            res.redirect('/students')
        })
        .catch(err => console.log(err))
})

module.exports = router

