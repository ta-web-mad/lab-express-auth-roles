const express = require('express');
const router = express.Router();

const bcrypt = require("bcrypt")
const bcryptSalt = 10

const mongoose = require('mongoose')

const User = require('./../models/user.model')

// add routes here

router.get('/signup', (req, res) => res.render('pages/auth/signupForm'))
router.get('/login', (req, res) => res.render('pages/auth/loginForm'))

router.post('/register', (req, res) => {
    const { username, password, name, description } = req.body
    //console.log(username, password, name, description, '- will be registered.')

    if (username.length === 0 || password.length === 0) {
        res.render('pages/auth/signupForm', {
            errorMessage: 'Rellena los campos.'
        })
        return
    }

    User
        .findOne({ username })
        .then(user => {
            if (user) {
                res.render('pages/auth/signupForm', {
                    errorMessage: 'Nombre de usuario ya registrado.'
                })
                return
            }

            const salt = bcrypt.genSaltSync(bcryptSalt)
            const hashPass = bcrypt.hashSync(password, salt)

            User
                .create({ username, password: hashPass, name, description })
                .then(() => res.redirect('/students'))
                .catch(err => console.log('error', err))
        })
        .catch(err => console.log('error', err))
})

router.post('/access', (req, res) => {

    const { username, password, name, description } = req.body

    User
        .findOne({ username })
        .then(user => {
            if (!user) {
                res.render('pages/auth/loginForm', { errorMessage: 'Usuario no reconocido.' })
                return
            }
            if (bcrypt.compareSync(password, user.password) === false) {
                res.render('pages/auth/loginForm', { errorMessage: 'Contraseña incorrecta' })
                return
            }
            // else{
            //     console.log('User', username, 'found.')
            // }

            req.session.currentUser = user
            console.log('User', req.session.currentUser.username, 'is logged in.')
            res.redirect('/')
        })
        .catch(err => console.log('error', err))
})

router.get('/logout', (req, res) => {
    if (req.session.currentUser) {
        console.log('User', req.session.currentUser.username, 'logged out.')
    }
    req.session.destroy((err) => res.redirect("/login"));
})

module.exports = router