const express = require('express')
const router = express.Router()

const User = require("../models/user.model")

const { checkLoggedIn, checkRole } = require('./../middleware')
const { isBoss } = require('./../utils')
const { isUser } = require('./../utils')


// Endpoints
router.get('/', (req, res) => res.render('index'))

router.get('/profile', checkLoggedIn, (req, res) => res.render('users/profile', { user: req.user, isUser: isUser(req.user) }))

router.get('/boss-page', checkLoggedIn, checkRole('BOSS'), (req, res) => res.render('users/boss-page', { user: req.user, isBoss: isBoss(req.user) }))

router.get('/register', checkLoggedIn, checkRole('BOSS'), (req, res) => res.render('auth/register', { user: req.user, isBoss: isBoss(req.user) }))

// Users list
router.get('/users-list', checkLoggedIn, checkRole('BOSS'), (req, res) => {

    User
        .find()
        .select('username')
        .then(users => res.render('users/users-list', { users, error: req.query.error }))
        .catch(err => console.log('ERROR:', err))
})

// Delete
router.post('/:_id/delete', (req, res) => {
    const user_id = req.params._id

    User
    .findByIdAndRemove(user_id)
    .then(user => res.redirect('/boss-page'))
    .catch(err => console.log('ERROR:', err))
})

// Edit
router.get('/edit/:user_id', (req, res) => {

    const user_id = req.params.user_id

    User
        .findById(user_id)
        .then(user => res.render('users/edit-profile', user))
        .catch(err => console.log(err))
})

router.post('/edit/:user_id', (req, res) => {

    const { name, profileImg } = req.body
    const user_id = req.params.user_id

    User
        .findByIdAndUpdate(user_id, { name, profileImg })
        .then(user => res.redirect(`/profile`))
        .catch(err => console.log(err))
})



module.exports = router
