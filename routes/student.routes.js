const router = require("express").Router()
const User = require("../models/User.model")
const { isLoggedIn, checkRole } = require('../middleware/route-guard')

router.get('/estudiantes', isLoggedIn, checkRole('STUDENT', 'PM'), (req, res) => {
    //res.render('students/student-list', { user: req.session.currentUser })

    User
        .find()
        .then(users => res.render('students/student-home', {
            users: users,
            isStudent: req.session.currentUser.role === 'STUDENT',
            isPM: req.session.currentUser.role === 'PM'
        }))
        .catch(err => console.log(err))

})




router.get('/estudiantes/listado', isLoggedIn, checkRole('STUDENT', 'PM'), (req, res) => {
    //res.render('students/student-list', { user: req.session.currentUser })

    User
        .find()
        .then(users => res.render('students/student-list', {
            users: users,
            isStudent: req.session.currentUser.role === 'STUDENT',
            isPM: req.session.currentUser.role === 'PM'
        }))
        .catch(err => console.log(err))

})

router.get('/estudiantes/:student_id', isLoggedIn, checkRole('STUDENT'), (req, res) => {
    const { student_id } = req.params
    res.render('students/student-profile', { user: req.session.currentUser })
    // User
    //     .findById(student_id)
    //     .then(user => res.render('students/student-profile', { user: req.session.currentUser })
    //     )
    //     .catch(err => console.log(err))
})

module.exports = router