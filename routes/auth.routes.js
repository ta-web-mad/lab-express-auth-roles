const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt")
const bcryptSalt = 10

const mongoose = require('mongoose')

const User = require('./../models/user.model')


// Signup form (get)
router.get('/signup-form', (req, res) => res.render('pages/auth/signup-form'))


// Signup (post)
router.post('/signup-form', (req, res, next) => {

    const { username, name, password } = req.body

    User
        .findOne({ username })
        .then(user => {
            if (user) {
                res.render('pages/auth/signup-form', { errorMessage: 'This user already exist' })
                return
            }

            const salt = bcrypt.genSaltSync(bcryptSalt)
            const hashPass = bcrypt.hashSync(password, salt)

            User
                .create({ username, name, password: hashPass })
                .then(() => res.redirect('/'))
                .catch(err => {
                    if (err instanceof mongoose.Error.ValidationError) {
                        console.log(err.errors)
                    } else {
                        next()
                    }
                })
        })
        .catch(err => console.log('error', err))
})


// Login (get)
router.get('/login-form', (req, res) => res.render('pages/auth/login-form'))


// Login (post)
router.post('/login-form', (req, res) => {

    const { username, password } = req.body

    User
        .findOne({ username })
        .then(user => {

            if (!user) {
                res.render('pages/auth/login-form', { errorMessage: 'User not recognized' })
                return
            }

            if (bcrypt.compareSync(password, user.password) === false) {
                res.render('pages/auth/login-form', { errorMessage: 'Wrong password' })
                return
            }

            req.session.currentUser = user
            res.redirect('/')
        })
        .catch(err => console.log('error', err))
})


// Logout
router.get('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy((err) => res.redirect("/login-form"));
    } else {
        res.redirect("/login-form");
    }
})


module.exports = router;