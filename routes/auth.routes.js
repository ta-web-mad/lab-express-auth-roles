const express = require('express')
const router = express.Router()
const bcrypt = require("bcrypt")
const bcryptSalt = 10

const mongoose = require('mongoose')

const User = require('./../models/user.model')

router.get('/register', (req, res) => res.render('pages/auth/signup-form'))

router.post('/register', (req, res, next) => {

    const { username, pwd } = req.body

    User
        .findOne({ username })
        .then(user => {
            if (user) {
                res.render('pages/auth/signup-form', { errorMessage: 'Nombre de usuario ya registrado' })
                return
            }

            const salt = bcrypt.genSaltSync(bcryptSalt)
            const hashPass = bcrypt.hashSync(pwd, salt)

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

router.get('/start-session', (req, res) => res.render('pages/auth/login-form'))

router.post('/start-session', (req, res) => {

    const { username, pwd } = req.body

    User
        .findOne({ username })
        .then(user => {

            if (!user) {
                res.render('pages/auth/login-form', { errorMessage: 'Invalid username' })
            }

            if(bcrypt.compareSync(pwd, user.password) === false) {
                res.render('pages/auth/login-form', { errorMessage: 'Incorrect password' })
                return
            }

            req.session.currentUser = user
            
            res.redirect('/')
        })
        .catch(err => console.log('error', err))
})

router.get('/close-session', (req, res) => {
    req.session.destroy((err) => res.redirect('/start-session'))
})

module.exports = router;
