const router = require("express").Router()
const User = require("../models/User.model")
const { isLoggedIn, isLoggedOut, checkRoles } = require('../middlewares/route-guard')

// Delete students

router.get('/students/:id/delete', isLoggedIn, checkRoles('PM'), (req, res, next) => {

    const { id } = req.params

    User
        .findByIdAndDelete(id)
        .then(() => res.redirect("/students"))
        .catch(err => next(err))

})

module.exports = router

// Edit students (render)

router.get('/students/:id/edit', isLoggedIn, checkRoles('PM', 'STUDENT'), (req, res, next) => {

    const { id } = req.params

    const pmRole = {
        isPM: req.session.currentUser.role === 'PM',
    }

    const ownerRole = {
        isOwner: req.session.currentUser._id === id
    }

    if (pmRole.isPM || ownerRole.isOwner) {

        User
            .findById(id)
            .then(user => res.render("students/student-profile-edit", user))
            .catch(err => next(err))

    } else {
        res.redirect('/iniciar-sesion?err=No estás autorizado')
    }

})

// Edit student (handler)

router.post('/students/:id/edit', isLoggedIn, checkRoles('PM', 'STUDENT'), (req, res, next) => {

    const { id } = req.params

    const { username, email, profileImg, description } = req.body

    User
        .findByIdAndUpdate(id, { username, email, profileImg, description })
        .then(() => res.redirect("/students"))
        .catch(err => next(err))

})

// Mark as TA

router.get('/students/:id/mark-TA', isLoggedIn, checkRoles('PM'), (req, res, next) => {

    const { id } = req.params

    User
        .findByIdAndUpdate(id, { role: 'TA' })
        .then(() => res.redirect("/students"))
        .catch(err => next(err))

})

// Mark as DEV

router.get('/students/:id/mark-DEV', isLoggedIn, checkRoles('PM'), (req, res, next) => {

    const { id } = req.params

    User
        .findByIdAndUpdate(id, { role: 'DEV' })
        .then(() => res.redirect("/students"))
        .catch(err => next(err))

})

module.exports = router