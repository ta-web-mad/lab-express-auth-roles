const express = require('express');
const router = express.Router();

const bcrypt = require("bcrypt")
const bcryptSalt = 10

const User = require('./../models/user.model')

router.get('/registro', (req, res) => res.render('pages/auth/signup-form'))

router.post('/registro', (req, res)=>{
    const {username, pwd} = req.body

    if (username.length === 0 || pwd.length === 0) {
        res.render('pages/auth/signup-form', { errorMessage: 'Rellena los campos' })
        return
    }
    if (pwd.length < 6) {
        res.render('pages/auth/signup-form', { errorMessage: 'por favor pon mas seguridad en tu contraseña' })
        return
    }

    User
        .findOne({username})
        .then(user =>{
            if(user){
                res.render('pages/auth/sign-form', { errorMessage: 'Nombre de usuario ya registrado' })
            }
            const salt = bcrypt.genSaltSync(bcryptSalt)
            const hashPass = bcrypt.hashSync(pwd, salt)
        
            User
            .create({username, password: hashPass})
            .then(()=> res.redirect('/'))
            .catch(err => console.log('error', err))
        })
})

router.get('/inicio-sesion', (req, res) => res.render('pages/auth/login-form'))

router.post('/inicio-sesion', (req, res) => {

    const {username, pwd} = req.body
    console.log(pwd)
    User
        .findOne({username})
        .then(user =>{
            console.log(user)
            if(!user){
                res.render('pages/auth/login-form', {errorMessage: ' usuario no registrado'})
                return
            }
            if (bcrypt.compareSync(pwd, user.password) === false) {
                res.render('pages/auth/login-form', { errorMessage: 'Contraseña incorrecta' })
                return
            }

            req.session.currentUser = user
            res.redirect('/')
        })
        .catch(err => console.log('error', err))

})

router.get('/cerrar-sesion', (req, res) => {
    req.session.destroy((err) => res.redirect("/inicio-sesion"));
})


module.exports = router;
