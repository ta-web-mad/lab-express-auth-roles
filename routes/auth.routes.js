const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt")
const bcryptSalt = 10

const mongoose = require('./../models/user.model')

const User = require('./../models/user.model')

//SIGN UP
//GET
router.get('/signup', (req, res) => res.render('pages/auth/signup-page'))

//POST
router.post('/signup', (req,res,next) => {

    const {username, name, password, profileImg, description } = req.body
    console.log(req.body)
    User
        .findOne({username})
        .then(user => {
            if (user) {
                res.render('pages/auth/signup-page', {errorMessage: 'El nombre de usuario ya existe, elige otro'})
                return
            }
            const salt = bcrypt.genSaltSync(bcryptSalt)
            const hashPass = bcrypt.hashSync(password, salt)

            User
                .create({ username, name, password: hashPass, profileImg, description })
                .then(() => res.redirect('/'))
                .catch(err => console.log('Error', err))
        })

})


//LOG IN
//GET
router.get('/login', (req, res) => res.render('pages/auth/login-page'))

//POST
router.post('/login', (req,res,next) =>{

    console.log('-----------the req is', req.body)
    const { username, password } = req.body

    User
        .findOne({username})
        .then(user=> {

            if(!user) {
                res.render('pages/auth/login-page', {errorMessage: 'Username not found'})
                return
            }
            if(bcrypt.compareSync(password, user.password) === false) {
                res.render('pages/auth/login-page', { errorMessage: 'Incorrect password' })
                return
            }
            req.session.currentUser = user
            res.redirect('/')
        })
        .catch(err => console.log('Error', err))
})

router.get('/close-session', (req, res) => {
    req.session.destroy((err) => res.redirect("/login"));
})

module.exports = router;
