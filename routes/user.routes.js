const router = require("express").Router()
const bcrypt = require('bcryptjs')
const User = require("../models/User.model")
const { isLoggedIn, checkRole } = require('../middlewares/route-guard')

router.get('/students', isLoggedIn, (req, res, next) => {
    User
        .find({ role: 'STUDENT' })
        .then(students => {
            res.render('user/all-students', { students })
        })

})

router.get('/students/:student_id', isLoggedIn, (req, res, next) => {

    const { student_id } = req.params
    User
        .findById(student_id)
        .then(student => {
            res.render('user/student-profile', { student: student, isAdmin: req.session.currentUser?.role === 'PM' })
        })
        .catch(err => console.log(err))
})


router.get('/students/:student_id/edit', isLoggedIn, checkRole('PM', 'STUDENT'), (req, res) => {
    const { student_id } = req.params

    User.findById(student_id)
        .then(student => res.render('pm/edit-student-form', student))
        .catch(err => console.log(err))

})

router.post('/students/:student_id/edit', isLoggedIn, checkRole('PM', 'STUDENT'), (req, res) => {
    const { username, email, profileImg, description, student_id } = req.body


    User
        .findByIdAndUpdate(student_id, { username, email, profileImg, description })
        .then(student => res.redirect('/students'))
        .catch(err => console.log(err))
})


router.post('/students/:student_id/delete', isLoggedIn, checkRole('PM'), (req, res, next) => {
    const { student_id } = req.params
    User
        .findByIdAndDelete(student_id)
        .then(student => res.redirect('/students'))
})

router.post('/students/:student_id/mark-dv', isLoggedIn, checkRole('PM'), (req, res, next) => {
    const { student_id, role } = req.params

    User
        .findByIdAndUpdate(student_id, { role: 'DEV' })
        .then(() => res.redirect('/students'))

})

router.post('/students/:student_id/mark-ta', isLoggedIn, checkRole('PM'), (req, res, next) => {
    const { student_id, role } = req.params

    User
        .findByIdAndUpdate(student_id, { role: 'TA' })
        .then(() => res.redirect('/students'))

})

router.get("/profile", isLoggedIn, checkRole('PM', 'STUDENT'), (req, res, next) => {
    res.render("user/profile", { user: req.session.currentUser })
})

// router.get('/staff', isLoggedIn, (req, res, next) => {
//     User.find(
//         {

//             $or    [
//                 { role: 'TA' },
//                 { role: 'DEV' },
//                 { role: 'PM' }
//             ]
//     })

// })
module.exports = router