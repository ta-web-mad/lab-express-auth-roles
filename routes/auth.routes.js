const express = require('express');
const router = express.Router();
const passport = require('passport')

const User = require('../models/user.model')

const bcrypt = require('bcrypt')
const bcryptSalt = 10


// add routes here

router.get('/signup', (req, res) => res.render('auth/signup'))
router.post('/signup', (req, res, next) => {
    const { username, password } = req.body
    if (!username || !password) {
        res.render('auth/signup', { errorMsg: 'Fields required' })
    }
    User
        .findOne({ username })
        .then(user => {
            if (user) {
                res.render('auth/signup', { errorMsg: 'Username already exists' })
                return
            }
            const salt = bcrypt.genSaltSync(bcryptSalt)
            const hashPass = bcrypt.hashSync(password, salt)
            User
                .create({ username, password: hashPass })
                .then(() => res.redirect('/'))
                .catch(() => res.render('auth/signup', { errorMsg: 'Error de servidor' }))
        })
        .catch(error => next(new Error(error)))
})


router.get('/login', (req, res) => res.render('auth/login'))
router.post('/login', passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true,
    passReqToCallback: true
}))




router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
})


module.exports = router