const router = require("express").Router()
const { isLoggedIn, checkRole } = require('../middleware/route-guard')
const User = require("../models/User.model")
const { isPM, isOwner } = require("../utils")

router.get('/student', isLoggedIn, (req, res, next) => {
    User
        .find()
        .then(users => res.render('users/student-list', { users }))
        .catch(err => next(err))
})

router.get('/student/:student_id', isLoggedIn, (req, res, next) => {
    const { student_id } = req.params

    User
        .findById(student_id)
        .then(user => res.render('users/student-profile', {
            user, isPM: isPM(req.session.currentUser)
        }))
        .catch(err => next(err))
})

router.post('/delete/:student_id', isLoggedIn, (req, res, next) => {
    const { student_id } = req.params

    User
        .findByIdAndDelete(student_id)
        .then(() => res.redirect('/student'))
        .catch(err => next(err))
})



router.get('/edit/:student_id', isLoggedIn, (req, res, next) => {
    const { student_id } = req.params
    if (isPM(req.session.currentUser) || isOwner(student_id, req.session.currentUser._id))
        User
            .findById(student_id)
            .then(user => res.render('users/edit-profile', user))
            .catch(err => next(err))
})

router.post('/edit/:student_id', isLoggedIn, (req, res, next) => {
    const { student_id } = req.params
    const { username, email, profileImg, description, role } = req.body

    User
        .findByIdAndUpdate(student_id, { username, email, profileImg, description, role })
        .then(updatedStudent => res.redirect(`/student/${updatedStudent._id}`))
        .catch(err => next(err))
})

router.post('/edit/:student_id/dev', isLoggedIn, (req, res, next) => {
    const { student_id } = req.params
    const { username, email, profileImg, description, role } = req.body

    User
        .findByIdAndUpdate(student_id, { role: 'DEV' })
        .then(updatedStudent => res.redirect(`/student/${updatedStudent._id}`))
        .catch(err => next(err))
})

router.post('/edit/:student_id/ta', isLoggedIn, (req, res, next) => {
    const { student_id } = req.params
    const { username, email, profileImg, description, role } = req.body

    User
        .findByIdAndUpdate(student_id, { role: 'TA' })
        .then(updatedStudent => res.redirect(`/student/${updatedStudent._id}`))
        .catch(err => next(err))
})






module.exports = router