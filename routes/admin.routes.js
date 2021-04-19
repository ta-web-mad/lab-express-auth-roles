const express = require('express')
const router = express.Router()

const User = require('./../models/user.model')

const { isLoggedIn, checkRoles } = require('./../middlewares')

// Manager admin page for editing roles (GET)
router.get('/manager/', isLoggedIn, checkRoles('BOSS'), (req, res) => {

    User
    .find({ role: "STUDENT"})
    .then(restUsers => res.render('pages/manager-admin/edit-roles', { restUsers, user: req.session.currentUser }))
    .catch(err => console.log('Error!', err))
})

// Manager admin page for editing roles (POST)
router.post('/manager/edit/:id', isLoggedIn, checkRoles('BOSS'), (req, res) => {

    const { role } = req.body

    User
        .findByIdAndUpdate(req.params.id, { role })
        .then(() => res.redirect(`/admin/manager/`))
        .catch(err => console.log('Error!', err))
})

// Student admin page for editing profile (GET)
router.get('/student/', isLoggedIn, checkRoles('STUDENT'), (req, res) => {

    User
    .find({ role: "STUDENT"})
    .then(restUsers => res.render('pages/student-admin/edit-profile', { restUsers, user: req.session.currentUser }))
    .catch(err => console.log('Error!', err))
})

// Student admin page for editing profile (POST)
router.post('/student/edit/', isLoggedIn, checkRoles('STUDENT'), (req, res) => {

    const { username, name, description, profileImg } = req.body

    if (username.length === 0 || name.length === 0 || description.length === 0 || profileImg.length === 0) {
    res.render('pages/student-admin/edit-profile', { errorMessage: 'Please fill all the fields' })
    return
    }

    User
        .findByIdAndUpdate(req.session.currentUser, { username, name, description, profileImg }, { new: true })
        .then(() => res.redirect(`/students/${req.session.currentUser._id}`))
        .catch(err => console.log('Error!', err))
})

module.exports = router