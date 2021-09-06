const router = require("express").Router()
const bcrypt = require('bcrypt')
const User = require("../models/User.model")

const { isLoggedIn, equalId } = require('../middleware')

// Signup
router.get('/', isLoggedIn, (req, res) => {
    User
        .find()
        .then((user) => {
            if (user) {
                res.render('student/students', { user, isPM: req.session.currentUser?.roles == "PM" })
            }
        })
        .catch(error => console.error(error))
})

router.get('/edit/:id', isLoggedIn, (req, res) => {
    const { id } = req.params
    User
        .findById(id)
        .then((user) => {
            res.render('student/student-edit', user)
        })
        .catch(error => console.error(error))
})

router.post('/edit/:id', isLoggedIn, (req, res) => {

    const { id } = req.params
    const { username, newroles } = req.body

    User
        .findByIdAndUpdate(id, { username: username, roles: newroles }, { new: true })
        .then((user) => {
            res.redirect('/estudiantes')
        })
        .catch(error => console.log(error))

})

router.get('/userEdit/:id', equalId, (req, res, next) => {
    const id = req.session.currentUser._id
    User
        .findById(id)
        .then((user) => {
            console.log(user)
            res.render('student/user-edit', { user })
        })


})
router.post('/userEdit/:id', (req, res, next) => {
    const { id } = req.params
    const { username } = req.body

    User
        .findByIdAndUpdate(id, { username: username }, { new: true })
        .then((user) => {
            res.redirect('/estudiantes')
        })
        .catch(error => console.log(error))
})

router.get('/:id', isLoggedIn, (req, res) => {

    const { id } = req.params
    User
        .findById(id)
        .then((user) => {
            console.log(user)
            res.render('student/details', { user })
        })
        .catch(error => console.error(error))

})

module.exports = router