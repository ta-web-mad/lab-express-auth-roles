const express = require('express')
const router = express.Router()
const User = require("../models/user.model")

const { checkLoggedIn, checkRole } = require('./../middleware')
const { isBoss, isTA, isDev, isStudent } = require('./../utils')

router.get('/', (req, res) => res.render('index'))

router.get('/home', (req, res) => res.render('site/home'))

router.get('/my-profile', checkLoggedIn, (req, res) => {
    const username = req.user.username
    User
        .findOne({ username })
        .then(user => res.render('site/my-profile', user))
})

router.get('/student-profiles', checkLoggedIn, (req, res) => {
    User
        .find({ role: 'STUDENT' })
        .then(users => res.render('site/student-profiles', { users }))
        .catch(err => console.log(err))
})

router.get('/profile/:username', checkLoggedIn, (req, res) => {
    const username = req.params.username
    const loggedUserRole = req.user.role
    User
        .findOne({ username })
        .then(user => {
            if (!(user.role === 'STUDENT') && loggedUserRole === 'STUDENT') {
                res.render('site/home', { errorMsg: 'Desautorizado, no tienes privilegios' })
            } else { res.render('site/profile-page', { userPage: user, isBoss: isBoss(loggedUserRole) }) }
        })
        .catch(err => console.log(err))
})
router.post('/profile/:username', checkLoggedIn, (req, res) => {
    const username = req.params.username
    const role = req.body.role
    const loggedUserRole = req.user.role
    User
        .findOneAndUpdate({ username }, { role }, { new: true })
        .then(user => res.render('site/profile-page', { userPage: user, isBoss: isBoss(loggedUserRole) }))
        .catch(err => console.log(err))
})
router.post('/delete/:username', checkLoggedIn, checkRole('BOSS'), (req, res) => {
    const username = req.params.username
    const loggedUserRole = req.user.role
    User
        .findOneAndDelete({ username })
        .then(() => res.render('site/home'))
        .catch(err => console.log(err))
})


router.get('/courses', checkLoggedIn, (req, res) => res.render('site/courses'))

router.get('/staff-profiles', checkLoggedIn, checkRole('BOSS', 'DEV', 'TA'), (req, res) => {
    User
        .find({ role: { $ne: 'STUDENT' } })
        .then(users => res.render('site/staff-profiles', { users }))
        .catch(err => console.log(err))
})

module.exports = router