const express = require('express')
const router = express.Router()

const User = require("../models/User.model")

const { isLoggedIn } = require('../middlewares/route-guard')

router.get('/students', isLoggedIn, (req, res, next) => {

    User
        .find({ role: 'STUDENT' })
        .then(users => res.render('auth/users', { users }))
        .catch(err => console.log(err))
})

router.get('/details/:user_id', isLoggedIn, (req, res) => {

    const { user_id } = req.params

    User
        .findById(user_id)
        .then(user => res.render('auth/details', user))
        .catch(err => console.log(err))
})

// BORRAR

router.get('/details/:user_id/borrar', isLoggedIn, (req, res) => {

    const { user_id } = req.params

    User
        .findByIdAndDelete(user_id)
        .then(() => res.redirect(`/students`))
        .catch(err => console.log(err))
})

// EDITAR

router.get('/details/:user_id/editar', isLoggedIn, (req, res) => {

    const { user_id } = req.params

    User
        .findById(user_id)
        .then(user => res.render('auth/edit', user))
        .catch(err => console.log(err))
})


router.post('/details/:user_id/editar', isLoggedIn, (req, res) => {

    const { user_id } = req.params
    const { username, email, description, role } = req.body

    User
        .findByIdAndUpdate(user_id, { username, email, description, role })
        .then(user => res.redirect(`/details/${user._id}`))
        .catch(err => console.log(err))
})

module.exports = router