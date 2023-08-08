const router = require("express").Router()
const User = require("../models/User.model")
const { isLoggedIn, isLoggedOut, checkRoles } = require('../middlewares/route-guard')

// List all students

router.get('/students', isLoggedIn, (req, res, next) => {

    User
        .find({ role: 'STUDENT' })
        .then((users) => {
            res.render("students/students-list", { users })
        })
        .catch(err => next(err))

})

// Student profile with delete and edit buttons restricted 

router.get('/students/:id', isLoggedIn, checkRoles('PM', 'STUDENT'), (req, res, next) => {

    const { id } = req.params

    const { email, username, profileImg, description } = req.body

    const pmRole = {
        isPM: req.session.currentUser.role === 'PM',
    }

    const ownerRole = {
        isOwner: req.session.currentUser._id === id
    }

    User
        .findByIdAndUpdate(id, { email, username, profileImg, description })
        .then((user) => {
            res.render("students/student-profile", { user, pmRole, ownerRole })

        }).catch(err => next(err))
})

module.exports = router