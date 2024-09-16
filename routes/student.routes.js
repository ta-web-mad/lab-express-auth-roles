const router = require("express").Router()
const User = require("../models/User.model")

const { isLoggedIn } = require('./../middleware/route-guard')

router.get("/students", (req, res, next) => {
    User
        .find()
        .then(users => {
            res.render('students/student-list', { users })
        })
        .catch(err => (err))
})

router.get("/students/details/:student_id", isLoggedIn, (req, res, next) => {
    const { student_id } = req.params

    User
        .findById(student_id)
        .then(students => {
            res.render('students/student-details',
                {
                    students,
                    isPM: req.session.currentUser.role === 'PM',
                    currentStudent: req.session.currentUser._id.toString() === student_id
                })
        })
        .catch(err => (err))
})

router.post('/students/delete/:student_id', (req, res, next) => {

    const { student_id } = req.params

    User
        .findByIdAndDelete(student_id)
        .then(() => res.redirect('/students'))
        .catch(err => console.log(err))

})

router.get('/students/edit/:student_id', isLoggedIn, (req, res, next) => {
    const { student_id } = req.params
    User
        .findById(student_id)
        .then(student => {
            res.render('students/student-edit',
                {
                    student,
                    isPM: req.session.currentUser.role === 'PM',
                })
        })
        .catch(err => console.log(err))
})

router.post('/students/edit/:student_id', (req, res) => {

    const { username, email, description, role } = req.body
    const { student_id } = req.params
    const currentStudent = req.session.currentUser._id.toString()

    if (currentStudent === student_id || req.session.currentUser.role === 'PM') {

        User
            .findByIdAndUpdate(student_id, { username, email, description, role })
            .then(() => res.redirect(`/students/details/${student_id}`))
            .catch(err => console.log(err))
    }
    else {
        res.redirect('/students')
    }
})

module.exports = router