const express = require('express');
const router = express.Router();
const passport = require('passport')

const User = require('../models/user.model')

const bcrypt = require("bcrypt")
const bcryptSalt = 10

router.get('/sign-up', (req, res) => res.render('auth/signUp'))
router.post('/sign-up', (req, res) => {

    const { username, name, password } = req.body

    if (username === '' || name === '' || password === '') {
        res.render('auth/signUp', {errorMsg: 'Missing credentials'})
        return
    }

    User
        .findOne({ username })
        .then(user => {

            if (user) {
                res.render('auth/signUp', {errorMsg: 'User already registered'})
                return
            }
        

        const salt = bcrypt.genSaltSync(bcryptSalt)
        const hashPass = bcrypt.hashSync(password, salt)

        User
            .create({ username, name, password: hashPass })
            .then(() => res.redirect('/'))
            .catch(err => next(new Error(err)))
    })
    .catch(err => next(new Error(err)))
})

router.get('/log-in', (req, res) => res.render('auth/logIn', {errorMsg: req.flash('error')}))
router.post('/log-in', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/log-in',
    failureFlash: true,
    passReqToCallback: true
}))

router.post('/log-out', (req, res) => {
    req.logout();
    res.redirect('/')
})

module.exports = router;
