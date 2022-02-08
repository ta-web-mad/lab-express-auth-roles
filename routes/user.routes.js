const router = require('express').Router()
const { isLoggedIn, checkRole } = require('../middleware/route-guard')
const User = require('../models/User.model')
const { isStudent, isPM, itsMe } = require('../utils')

router.get('/students', isLoggedIn, (req, res, next) => {
    User
        .find()
        .then(users => res.render('users/users-list-page', { users }))
        .catch(error => next(error))
})


// Students profile

router.get('/students/:id', isLoggedIn, (req, res, next) => {
    const { id } = req.params
    User
        .findById(id)
        .then(users => {
            res.render('users/student-profile', {
                users,
                isAllowed: isPM(req.session.currentUser),
                isStudent: itsMe(id, req.session.currentUser._id)
            })
        })
        .catch(error => next(error))
})

// Delete student (PM)
router.post('/students/:id/delete', isLoggedIn, (req, res, next) => {
    const { id } = req.params
    User
        .findByIdAndDelete(id)
        .then(() => res.redirect('/students'))
        .catch(error => next(error))
})

// Edit student (PM)

router.get('/students/:id/edit', isLoggedIn, checkRole('STUDENT', 'PM'), (req, res, next) => {
    const { id } = req.params

    if (itsMe(id, req.session.currentUser._id) || isPM(req.session.currentUser)) {
        User
            .findById(id)
            .then(users => {
                res.render('users/student-edit-page', {
                    users,
                    isAllowed: isPM(req.session.currentUser),
                    isStudent: itsMe(id, req.session.currentUser._id)
                })
            })
            .catch(error => next(error))
    }
})

router.post('/students/:id/edit', isLoggedIn, (req, res, next) => {
    const { id } = req.params

    if (itsMe || isPM) {
        User
            .findByIdAndUpdate(id, req.body)
            .then(() => res.redirect(`/students/${id}`))
            .catch(error => next(error))
    }
})


module.exports = router