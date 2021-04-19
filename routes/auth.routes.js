const express = require('express');
const bodyParser = require('body-parser')
const router = express.Router();
const bcrypt = require("bcrypt")
const bcryptSalt = 10

const mongoose = require('mongoose')

const User = require('./../models/user.model')

// Sign up (GET)
router.get('/signup', (req, res) => res.render('pages/auth/signup'))

// Sign up (POST)
router.post('/signup', (req, res, next) => {

    const { username, password } = req.body

    User
        .findOne({ username })
        .then(user => {

            if (user) {
                res.render('pages/auth/signup', { errorMessage: 'User already registered' })
                return
            }

            if (username.length === 0 || password.length === 0) {
            res.render('pages/auth/signup', { errorMessage: 'Please fill all the fields' })
            return
            }

            if (password.length < 8) {
            res.render('pages/auth/login', { errorMessage: 'Please use a longer password' })
            return
            }

            const salt = bcrypt.genSaltSync(bcryptSalt)
            const hashPass = bcrypt.hashSync(password, salt)

            User
                .create({ username, password: hashPass })
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

// Log in (GET)
router.get('/login', (req, res) => res.render('pages/auth/login'))

// Log in (POST)
router.post('/login', (req, res) => {

    const { username, password } = req.body

    User
        .findOne({ username })
        .then(user => {

            if (username.length === 0 || password.length === 0) {
            res.render('pages/auth/login', { errorMessage: 'Please fill all the fields' })
            return
            }

            if (!user) {
                res.render('pages/auth/login', { errorMessage: 'User not found' })
                return
            }

            if (bcrypt.compareSync(password, user.password) === false) {
                res.render('pages/auth/login', { errorMessage: 'Password incorrect' })
                return
            }

            req.session.currentUser = user
            res.redirect('/')
        })
        .catch(err => console.log('error', err))
})

// Log out
router.get('/logout', (req, res) => {
    req.session.destroy((err) => res.redirect("/login"));
})


module.exports = router;
