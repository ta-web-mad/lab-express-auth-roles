const express = require('express')
const router = express.Router()

const User = require('./../models/user.model')
const { isLoggedIn, checkRoles } = require('./../middlewares')

const mongoose = require('mongoose')

const { isValidIdFormat, isBoss } = require('./../utils')


// Students list
router.get('/students', isLoggedIn, (req, res) => {

    // isBoss = req.session.currentUser.role === "BOSS"

    User
        .find()
        .then(allStudents => res.render('pages/students/students-list', { allStudents, isBoss: isBoss(req.session.currentUser) }))
        .catch(err => console.log('Error!', err))
})
// Students profile
router.get('/students/profile/:_id', (req, res) => {

    const { _id } = req.params

    if (isValidIdFormat(_id)) {

        User
            .findById(_id)
            .then(theUser => res.render('pages/students/students-profile', { theUser, isBoss: isBoss(req.session.currentUser) }))
            .catch(err => console.log('Error!', err))

    } else {
        res.redirect('/libros')
    }
})
// Students edit (get)
router.get('/students/editar', isLoggedIn, checkRoles('BOSS'), (req, res) => {

    const { user_id } = req.query

    User
        .findById(user_id)
        .then(user => res.send('/students/edit-students-form', user))
        .catch(err => console.log('Error!', err))
})


// Students edit (post)
router.post('/students/editar', isLoggedIn, checkRoles('BOSS'), (req, res) => {

    const { user_id } = req.query
    const { username, name, profileImg, description } = req.body

    User
        .findByIdAndUpdate(user_id, { username, name, profileImg, description })
        .then(editedStudent => res.redirect(`/students/profile/${editedStudent._id}`))
        .catch(err => console.log('Error!', err))
})


module.exports = router

