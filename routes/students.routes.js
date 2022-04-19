const router = require('express').Router()
const Student = require("../models/User.model")

const { isLoggedIn, checkRole } = require('./../middlewares/route-guard')


// students-list endpoint
router.get('/students', isLoggedIn, checkRole('PM', 'TA', 'DEV', 'STUDENT'), (req, res, next) => {
    Student
        .find()                  // si solo quiero que aparezcan los estudiantes introducir en find ({ role: 'STUDENT' })
        .then(student => {
            const isPM = req.session.currentUser.role === 'PM'

            res.render('students-list', { student, user: req.session.currentUser, isPM })
        })
})

// student-profile endpoint

router.get('/students/:id', isLoggedIn, checkRole('PM', 'TA', 'DEV', 'STUDENT'), (req, res) => {

    const { id } = req.params

    Student
        .findById(id)
        .then(student => {
            const isPM = req.session.currentUser.role === 'PM'
            const isCurrentUser = req.session.currentUser._id === id


            res.render('student-profile', { student, user: req.session.currentUser, isPM, isCurrentUser })
        })
        .catch(err => console.log(err))
})

// Edit student

router.get('/students/:id/edit', isLoggedIn, checkRole('PM', 'STUDENT'), (req, res) => {

    const { id } = req.params

    Student
        .findById(id)
        .then(student => {
            const isPM = req.session.currentUser.role === 'PM'

            res.render('edit-student', { student, user: req.session.currentUser, isPM })
        })
        .catch(err => console.log(err))
})

router.post('/students/:id/edit', isLoggedIn, checkRole('PM', 'STUDENT'), (req, res) => {

    const { id } = req.params
    const { username, email, profileImg, description, role } = req.body

    Student
        .findByIdAndUpdate(id, { username, email, profileImg, description, role })
        .then(() => {
            res.redirect('/students')
        })
        .catch(err => console.log(err))
})

// Delete student

router.post('/students/:id/delete', isLoggedIn, checkRole('PM'), (req, res, next) => {

    const { id } = req.params

    Student
        .findByIdAndDelete(id)
        .then(() => {
            res.redirect('/students')
        })
        .catch(err => console.log(err))

});

// Update any student to DEV ROLE

router.post('/students/:id/role-dev', isLoggedIn, checkRole('PM'), (req, res) => {

    const { id } = req.params
    // const { role } = req.body
    //res.send('hola')


    Student
        .findByIdAndUpdate(id, { role: 'DEV' })
        .then(() => {
            res.redirect(`/students/${id}`)
        })
        .catch(err => console.log(err))
})

// Update any student to TA ROLE

router.post('/students/:id/role-ta', isLoggedIn, checkRole('PM'), (req, res) => {

    const { id } = req.params

    Student
        .findByIdAndUpdate(id, { role: 'TA' })
        .then(() => {
            res.redirect(`/students/${id}`)
        })
        .catch(err => console.log(err))
})


module.exports = router


