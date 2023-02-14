const router = require("express").Router()
const { isLoggedIn, checkRole, checkUser } = require("../middlewares/route-guard")
const User = require("../models/User.model")

router.get("/", isLoggedIn, (req, res, next) => {

    User
        .find({ role: 'STUDENT' })
        .then(students => {
            res.render("students/students-list", { students })
        })
        .catch(err => next(err))

})

router.get('/:student_id', isLoggedIn, (req, res, next) => {

    const { student_id } = req.params

    User
        .findById(student_id)
        .then(student => {
            res.render('students/student-profile', {
                student,
                isPM: req.session.currentUser?.role === 'PM',
                isUserProfile: req.session.currentUser?._id === student_id
            })
        })
        .catch(err => next(err))

})

router.get('/edit/:student_id', isLoggedIn, checkUser, (req, res, next) => {

    const { student_id } = req.params

    User
        .findById(student_id)
        .then(student => {
            res.render('students/student-edit', student)
        })
        .catch(err => next(err))

})

router.post('/edit/:student_id', isLoggedIn, checkUser, (req, res, next) => {

    const { email, username, profileImg, description, student_id } = req.body

    User
        .findByIdAndUpdate(student_id, { email, username, profileImg, description })
        .then(student => res.redirect(`/students/${student_id}`))
        .catch(err => next(err))

})

router.post('/delete/:student_id', isLoggedIn, checkRole('PM'), (req, res, next) => {

    const { student_id } = req.params

    User
        .findByIdAndRemove(student_id)
        .then(() => res.redirect('/students'))
        .catch(err => next(err))

})

router.post('/:role/:student_id', isLoggedIn, checkRole('PM'), (req, res, next) => {

    const { role, student_id } = req.params

    User
        .findByIdAndUpdate(student_id, { role })
        .then(() => res.redirect('/students'))
        .catch(err => next(err))
})

module.exports = router