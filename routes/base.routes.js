const express = require('express')
const User = require('../models/user.model')
const router = express.Router()


const bcrypt = require("bcrypt")
const bcryptSalt = 10


const { checkLoggedIn, checkRole } = require('./../middleware')
const { isBoss } = require('./../util')

// Endpoints
router.get('/', (req, res) => res.render('index', { user: req.user }))

router.get('/private', checkLoggedIn, (req, res) => {

    User
        .find()
        .then(users => res.render('./auth/private', { user: req.user, isBoss: isBoss(req.user), users }))
        .catch(err => console.log('ERROR:', err))

})
router.get('/add-page', checkLoggedIn, checkRole('BOSS'), (req, res) => res.render('./auth/add'))

router.post('/add-page', (req, res) => {

    console.log(req.body)

    const { username, password, role } = req.body
    const salt = bcrypt.genSaltSync(bcryptSalt)
    const hashPass = bcrypt.hashSync(password, salt)

    User
        .create({ username, password: hashPass, role })
        .then(user => res.redirect(`/private`))
        .catch(err => console.log(err))
})

router.get('/remove-page', checkLoggedIn, checkRole('BOSS'), (req, res) => {
    User
        .find()
        .then(users => {
            res.render('./auth/remove', { users })
        }) //, error: req.query.error }))
        .catch(err => console.log('ERROR:', err))
})

router.post('/remove-page', (req, res) => {
    console.log(req.body.username)
    User
        .findOneAndRemove({ username: req.body.username })
        .then(user => res.redirect(`/private`))
        .catch(err => console.log(err))

})

router.get('/private/:id/edit-page', (req, res) => {

    const user_id = req.params.id
    User
        .findById(user_id)
        .then(user => res.render('./edit', user))
        .catch(err => console.log(err))
})

router.post('/private/:id/edit-page', (req, res) => {

    const { username, name, profileImg, description, facebookId } = req.body
    const user_id = req.params.id

    User
        .findByIdAndUpdate(user_id, { username, name, profileImg, description, facebookId })
        .then(user => res.redirect(`/private`))
        .catch(err => console.log(err))
})




module.exports = router
