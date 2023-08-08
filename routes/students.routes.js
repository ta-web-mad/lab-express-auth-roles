const router = require("express").Router()
const { isLoggedIn, checkRoles } = require("../middlewares/route-guard")
const User = require('../models/User.model')

router.get('/students', isLoggedIn, (req, res, next) => {

    User
        .find({ role: 'STUDENT' })
        .then(students => res.render('student/students', { students }))
        .catch(err => next(err))

})

router.get('/students/:id', isLoggedIn, (req, res, next) => {
    const { id } = req.params

    const userRoles = {
        isPM: req.session.currentUser?.role === 'PM',
        isThisUser: req.session.currentUser?._id === id
    }

    User
        .findById(id)
        .then(student => res.render('student/student-profile', { student, userRoles }))
        .catch(err => next(err))
})

router.post('/students/:id/delete', isLoggedIn, checkRoles('PM'), (req, res, next) => {
    const { id } = req.params

    User
        .findByIdAndDelete(id)
        .then(() => res.redirect('/students'))
        .catch(err => next(err))

})

router.get('/students/:id/edit', isLoggedIn, checkRoles('PM', 'STUDENT'), (req, res, next) => {
    const { id } = req.params

    const userRoles = {
        isPM: req.session.currentUser?.role === 'PM',
        isThisUser: req.session.currentUser?._id === id
    }

    if (userRoles.isPM || userRoles.isThisUser) {

        User
            .findById(id)
            .then(student => res.render('student/edit-profile', student))
            .catch(err => next(err))
    } else {
        res.redirect('/iniciar-sesion?err=You are not authorized to do that')
    }
})

router.post('/students/:id/edit', isLoggedIn, checkRoles('PM', 'STUDENT'), (req, res, next) => {
    const { id } = req.params
    const { username, profileImg, description } = req.body

    const userRoles = {
        isPM: req.session.currentUser?.role === 'PM',
        isThisUser: req.session.currentUser?._id === id
    }

    if (userRoles.isPM || userRoles.isThisUser) {

        User
            .findByIdAndUpdate(id, { username, profileImg, description })
            .then(() => res.redirect('/students'))
            .catch(err => next(err))
    } else {
        res.redirect('/iniciar-sesion?err=You are not authorized to do that')
    }

})


router.post('/students/:id/dev', isLoggedIn, checkRoles('PM'), (req, res, next) => {
    const { id } = req.params

    User
        .findByIdAndUpdate(id, { role: 'DEV' })
        .then(() => res.redirect('/students'))
        .catch(err => next(err))

})

router.post('/students/:id/ta', isLoggedIn, checkRoles('PM'), (req, res, next) => {
    const { id } = req.params

    User
        .findByIdAndUpdate(id, { role: 'TA' })
        .then(() => res.redirect('/students'))
        .catch(err => next(err))
})





module.exports = router