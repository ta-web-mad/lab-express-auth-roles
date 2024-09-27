const router = require("express").Router()
const { isLoggedIn, checkRole } = require('../middlewares/route-guard')
const User = require("../models/User.model")
const Course = require('../models/Course.model')


//Students List


// Staff list
router.get("/staff", isLoggedIn, checkRole('DEV', 'TA', 'PM'), (req, res) => {

    User
        .find({
            $or: [{ role: 'DEV' }, { role: 'TA' }, { role: 'PM' }]
        })
        .then(users => {
            res.render("users/staff/list", { users })
        })
})

// Staff Profile
router.get('/staff/:_id/profile', isLoggedIn, checkRole('DEV', 'TA', 'PM'), (req, res, next) => {

    const { _id } = req.params

    User
        .findById(_id)
        .then(user => res.render('users/staff/profile', user))
        .catch(err => next(err))
})


// Staff Edit Profile
router.get('/staff/:_id/edit', isLoggedIn, checkRole('DEV', 'TA', 'PM'), (req, res, next) => {

    const { _id } = req.params

    User
        .findById(_id)
        .then(user => res.render('users/staff/edit', user))
        .catch(err => next(err))
})

// Edit form handler
router.post('/staff/edit', isLoggedIn, checkRole('DEV', 'TA', 'PM'), (req, res, next) => {

    const { username, email, profileImg, description, role, _id } = req.body

    User
        .findByIdAndUpdate(_id, { username, email, profileImg, description, role })
        .then(user => res.redirect(`/staff/${_id}/profile`))
        .catch(err => next(err))
})


//Staff Role
router.post('/staff/:_id/profile/:role', isLoggedIn, checkRole('PM'), (req, res, next) => {

    const { role, _id } = req.params

    User
        .findByIdAndUpdate(_id, { role })
        .then(() => res.redirect(`/staff/${_id}/profile`))
        .catch(err => next(err))
})


//Delete 
router.post('/staff/:_id/delete', isLoggedIn, checkRole('PM'), (req, res, next) => {

    const { _id } = req.params

    Book
        .findByIdAndDelete(_id)
        .then(() => res.redirect('/staff'))
        .catch(err => next(err))
})



module.exports = router