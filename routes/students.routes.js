const router = require("express").Router()
const bcrypt = require('bcrypt')
const { checkLoggedUser, whatever } = require('./../middleware')
const { findOneAndDelete } = require("./../models/user.model")
const User = require('./../models/user.model')

//SignUp
//URL                                //CARPETA Y ARCHIVO
router.get('/signup', (req, res) => res.render('signup-page'))

router.post('/signup', (req, res) => {
    const { username, pwd } = req.body

    User
        .findOneAndDelete({ username })
        .then(user => {
            if (user) {
                res.render('signup-page', { errorMessage: 'Estudiante ya registrado' })
                return
            }

            const bcryptSalt = 10
            const salt = bcrypt.genSaltSync(bcryptSalt)
            const hashPass = bcrypt.hashSync(pwd, salt)
            User
                .create({ username, password: hashPass })
                .then(() => res.redirect('/'))
                .catch(err => console.log(err))

        })
        .catch(err => console.log(err))
})
// Login
router.get('/login', (req, res) => res.render('login-page'))


router.get('/usuario/mi-perfil', (req, res) => res.render('student-profile'))

router.post('/login', (req, res) => {

    const { username, pwd } = req.body

    User
        .findOne({ username })
        .then(user => {
            console.log(username)
            if (!user) {
                res.render('login-page', { errorMessage: 'Estudiante no reconocido' })
                return
            }

            if (bcrypt.compareSync(pwd, user.password) === false) {
                res.render('login-page', { errorMessage: 'Contraseña incorrecta' })
                return
            }
            // req.session.currentUser = user
            console.log('Este es el objeto de sesión:', req.session)
            res.redirect('/usuario/mi-perfil')
        })
        .catch(err => console.log(err))
})

router.get('/desconectar', (req, res) => {
    req.session.destroy(() => res.redirect('/'))
})



module.exports = router