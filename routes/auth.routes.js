const express = require('express');
const router = express.Router();
const User = require('./../models/user.model');
const bcrypt = require("bcrypt")
const bcryptSalt = 10
const mongoose = require('mongoose')

// add routes here
router.get('/register', (req, res) => res.render('pages/auth/signup-form'))

router.post('/register', (req, res, next) => {


    let { username, name, password, profileImg, description, role } = req.body

    if (role == "") role = "STUDENT"

    User
        .findOne({ username })
        .then(user => {
            if (user) {
                res.render('pages/auth/signup-form', { errorMessage: 'Nombre de usuario ya registrado' })
                return
            }

            const salt = bcrypt.genSaltSync(bcryptSalt)
            const hashPass = bcrypt.hashSync(password, salt)

            User
                .create({ username, name, password: hashPass, profileImg, description, role })
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


router.get('/sign-in', (req, res) => res.render('pages/auth/login-form'))

// Login (post)
router.post('/sign-in', (req, res) => {

    const { username, password } = req.body

    User
        .findOne({ username })
        .then(user => {

            if (!user) {
                res.render('pages/auth/login-form', { errorMessage: 'Usuario no reconocido' })
                return
            }

            if (bcrypt.compareSync(password, user.password) === false) {
                res.render('pages/auth/login-form', { errorMessage: 'Contraseña incorrecta' })
                return
            }

            req.session.currentUser = user
            res.redirect('/')
        })
        .catch(err => console.log('error', err))
})


router.get('/sign-out', (req, res) => {
    req.session.destroy((err) => res.redirect("/sign-in"));
})


module.exports = router;
