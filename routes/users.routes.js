const express = require('express');
const router = express.Router();

const User = require("../models/User.model")

const { isUser, checkRole } = require('../middleware/route-guard')

router.get('/estudiantes', isUser, (req, res, next) => {

    const isPM = req.session.currentUser.role === 'PM'

    User
        .find()
        .then(students => {
            res.render('users/students-list', { students, isPM })
        })
        .catch(err => console.log(err))
});

router.get('/estudiantes/:id', isUser, (req, res, next) => {


    const { id } = req.params

    const isMyProfile = req.session.currentUser._id === id

    User
        .findById(id)
        .then(student => {
            res.render('users/profile', { student, isMyProfile })
        })
        .catch(err => console.log(err))

});

router.get('/estudiantes/:id/editar', (req, res, next) => {

    const { id } = req.params

    User
        .findById(id)
        .then(student => {
            res.render('users/edit', student)
        })
        .catch(err => console.log(err))

})

router.post('/estudiantes/:id/editar', (req, res, next) => {

    const { id } = req.params
    const { username, profileImg, email, description, role } = req.body

    User

        .findByIdAndUpdate(id, { username, profileImg, email, description, role })
        .then(student => {
            res.redirect(`/estudiantes/${id}`)
        })
        .catch(err => console.log(err))

})

router.post('/estudiantes/:id/delete', (req, res, next) => {

    const { id } = req.params

    User
        .findByIdAndRemove(id)
        .then(() => {
            res.redirect(`/estudiantes`)
        })
        .catch(err => console.log(err))
});

module.exports = router