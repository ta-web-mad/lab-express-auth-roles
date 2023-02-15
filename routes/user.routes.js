const router = require("express").Router()
const { isLoggedIn, isLoggedOut, checkRole, checkUser } = require('../middlewares/route-guard')

// Model
const User = require("../models/User.model")

// List Students
router.get("/students", isLoggedIn, (req, res, next) => {
    User
        .find({ role: 'STUDENT' })
        .sort({ username: 1 })
        .then(users => {
            res.render("students/list", { users })
        })
        .catch(err => next(err))
})

// Details
router.get('/students/:user_id', isLoggedIn, (req, res, next) => {
    const { user_id } = req.params
    User
        .findById(user_id)
        .then(user => {
            const isPM = req.session.currentUser?.role === 'PM'
            const isCurrentUser = req.session.currentUser._id === user_id
            res.render('students/details', {
                user, isPM, isCurrentUser
            })
        })
        .catch(err => next(err))
})

// Edit
router.get('/students/edit/:user_id', isLoggedIn, checkRole('PM'), (req, res, next) => {
    const { user_id } = req.params
    User
        .findById(user_id)
        .then(user => res.render('students/edit', user))
        .catch(err => next(err))
})

router.post('/students/edit', isLoggedIn, checkRole('PM'), (req, res) => {
    const { username, email, profileImg, description, role, user_id } = req.body
    User
        .findByIdAndUpdate(user_id, { username, email, profileImg, description, role })
        .then(user => res.redirect(`/students/${user._id}`))
        .catch(err => next(err))
})

// Delete
router.post('/students/delete/:user_id', isLoggedIn, checkRole('PM'), (req, res, next) => {
    const { user_id } = req.params
    User
        .findByIdAndDelete(user_id)
        .then(() => res.redirect('/students'))
        .catch(err => next(err))
})

// Change role
router.post('/students/update/:user_id/:role', isLoggedIn, checkRole('PM'), (req, res, next) => {
    const { user_id, role } = req.params
    User
        .findByIdAndUpdate(user_id, { role })
        .then(() => res.redirect('/students'))
        .catch(err => next(err))
})


module.exports = router