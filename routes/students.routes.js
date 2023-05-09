const express = require('express')
const router = express.Router()

const User = require('./../models/User.model')

const { isLoggedIn, checkRole, canEdit } = require('../middlewares/route-guard')


// list students
router.get('/students', isLoggedIn, (req, res, next) => {

    User
        .find()
        .then(students => res.render('students/students-list', {
            students
        }))
        .catch(err => next(err))

})

//students profile

router.get('/students/:id', isLoggedIn, (req, res, next) => {

    const { id } = req.params
    User
        .findById(id)
        .then(student => {
            res.render('students/students-profile', {
                student,
                isPM: req.session.currentUser?.role === 'PM',
                isOwner: req.session.currentUser?._id === id
            })
        })
        .catch(err => next(err))
})

// students delete

router.post('/students/:id/delete', isLoggedIn, checkRole('PM'), (req, res, next) => {

    const { id } = req.params
    User
        .findByIdAndDelete(id)
        .then(() => res.redirect('/students'))
        .catch(err => next(err))
})

// students edit 

router.get('/students/:id/edit', isLoggedIn, canEdit, (req, res, next) => {
    const { id } = req.params



    User
        .findById(id)
        .then(student => res.render('students/students-edit', { student, isPM: req.session.currentUser?.role === 'PM' }))
        .catch(err => next(err))
})

router.post('/students/:id/edit', isLoggedIn, canEdit, (req, res, next) => {
    const { username, email, profileImg, description, role } = req.body
    const { id } = req.params
    User
        .findByIdAndUpdate(id, { username, email, profileImg, description, role })
        .then(() => res.redirect(`/students/${id}`))
        .catch(err => next(err))
})


module.exports = router