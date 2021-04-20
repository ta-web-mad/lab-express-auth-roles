const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt")
const bcryptSalt = 10

const User = require('./../models/user.model')

// add routes here

router.get('/registro', (req, res) => res.render('pages/registry'))

router.post('/registro', (req, res) => {

    const { username, pwd } = req.body

    User
        .findOne({ username })
        .then(user => {
            if (user) {
                res.render('pages/login')
                return
            }

            const salt = bcrypt.genSaltSync(bcryptSalt)
            const hashPass = bcrypt.hashSync(pwd, salt)

            User
                .create({ username, password: hashPass })
                .then(() => res.redirect('/'))
                .catch(err => console.log('error', err))
        })
        .catch(err => console.log('error', err))
})

router.get('/inicio-sesion', (req, res) => res.render('pages/login'))

router.post('/inicio-sesion', (req, res) => {
    const { username, pwd } = req.body

    User
        .findOne({ username })
        .then(user => {

            if (!user) {
                res.render('pages/login')
                return
            }

            if (bcrypt.compareSync(pwd, user.password) === false) {
                res.render('pages/login')
                return
            }

            req.session.currentUser = user
            res.redirect('/')
        })
        .catch(err => console.log('error', err))

})

router.get('/cerrar-sesion', (req, res) => req.session.destroy((err) => res.redirect('/')))

module.exports = router;
