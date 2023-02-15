const router = require("express").Router()
const { isLoggedIn, checkRole } = require('../middlewares/route-guard')
const { findById } = require("../models/User.model")
const User = require('../models/User.model')

router.get('/perfil', isLoggedIn, (req, res, next) => {
    res.render('user/mi-profile', { user: req.session.currentUser })
        .catch(err => next(err))
})

router.get('/students', isLoggedIn, (req, res, next) => {

    User
        .find({ role: 'STUDENT' })
        .then(students => {
            res.render('user/students-list', { students })
        })
        .catch(err => next(err))
})

router.get('/members', isLoggedIn, (req, res, next) => {
    const { role } = req.params
    User
        .find(role)
        .then(students => {
            res.render('user/members', { students })
        })
        .catch(err => next(err))
})

router.get('/students/:student_id', isLoggedIn, (req, res, next) => {

    const { student_id } = req.params
    // res.send(req.params)
    User
        .findById(student_id)
        .then(user => {
            res.render('user/student-profile', {
                user,
                isPm: req.session.currentUser?.role === 'PM',
            })
        })
        .catch(err => next(err))
})

router.get('/edit/:student_id', isLoggedIn, checkRole('PM', 'STUDENT'), (req, res, next) => {
    const { student_id } = req.params
    User
        .findById(student_id)
        .then(user => res.render('user/edit-profile', user))
        .catch(err => next(err))
})

router.post('/edit', isLoggedIn, checkRole('PM', 'STUDENT'), (req, res, next) => {
    const { username, email, description, role, student_id } = req.body
    User
        .findByIdAndUpdate(student_id, { username, email, description, role })
        .then(() => res.redirect(`/students/${student_id}`))
        .catch(err => next(err))
})

router.post('/roleTa/:student_id', isLoggedIn, checkRole('PM'), (req, res, next) => {

    const { student_id, role } = req.params

    User
        .findByIdAndUpdate(student_id, { role: 'TA' })
        .then(user => res.redirect('/members'))
        .catch(err => next(err))
})

router.post('/roleDev/:student_id', isLoggedIn,  checkRole('PM'), (req, res, next) => {
    const { student_id, role } = req.params

    User
        .findByIdAndUpdate(student_id, { role: 'DEV' })
        .then(user => res.redirect('/members'))
        .catch(err => next(err))
})

router.post('/delete/:student_id', checkRole ('PM'), (res, req, next) => {
    // console.log("LOS PARAMS ====>", req.params)
    res.send('hola')
    // const { student_id } = req.params

    // User
    //     .findByIdAndDelete(student_id)
    //     .then(() => res.redirect('/students'))
    //     .catch(err => (err))
})


module.exports = router