const express = require('express')
const router = express.Router()

const { isLoggedIn, checkRoles } = require('./../middlewares')
const { isValidIdFormat, isAdmin } = require('./../utils')


const mongoose = require('mongoose')

const User = require('./../models/user.model')

// Students list
router.get('/', isLoggedIn, (req, res) => {
    User
        .find({role: "STUDENT"})
        .then(allStudents => res.render('pages/students/student-list', { allStudents, user: req.session.currentUser, isAdmin: isAdmin(req.session.currentUser) }))
        .catch(err => console.log('Error!', err))
})

// Students details
router.get('/:id', isLoggedIn, (req, res) => {

    if (isValidIdFormat(req.params.id)) {

        User
            .findById(req.params.id)
            .then(student => res.render('pages/students/student-detail', {student}))
            .catch(err => console.log('Error!', err))

    } else {
        res.redirect('/students')
    }
})

// Delete student (POST)
router.post('/delete/:id', isLoggedIn, checkRoles('BOSS'), (req, res) => {
    User
        .findByIdAndRemove(req.params.id)
        .then(() => res.redirect('/students'))
        .catch(err => console.log('There was an error:', err))
})

// Edit student (GET)
router.get('/edit/:id', isLoggedIn, checkRoles('BOSS'), (req, res) => {

    User
        .findById(req.params.id)
        .then(student => res.render('pages/students/edit-student', student))
        .catch(err => console.log('Error!', err))
})

// Edit student (POST)
router.post('/edit/:id', isLoggedIn, checkRoles('BOSS'), (req, res) => {

    const { username, name, description, profileImg } = req.body

    if (username.length === 0 || name.length === 0 || description.length === 0 || profileImg.length === 0) {
    res.render('pages/students/edit-student', { errorMessage: 'Please fill all the fields' })
    return
    }

    User
        .findByIdAndUpdate(req.params.id, { username, name, description, profileImg })
        .then(() => res.redirect(`/students/`))
        .catch(err => console.log('Error!', err))
})

module.exports = router