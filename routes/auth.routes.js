const router = require("express").Router()
const bcrypt = require('bcrypt')
const { checkLoggedUser } = require("../middleware")
const User = require('./../models/User.model')


// Signup
router.get('/signup', (req, res) => res.render('auth/signup-page'))

router.post('/signup', (req, res) => {

    const { username, password } = req.body

    User
        .findOne( {username} )
        .then(name => {

            if (name) {
                res.render('auth/signup-page', { errorMessage: 'Already Registered, Log in!' })
                return
            }

            const bcryptSalt = 10
            const salt = bcrypt.genSaltSync(bcryptSalt)
            const hashPass = bcrypt.hashSync(password, salt)

            User
                .create({ username, password: hashPass })
                .then(user => {
                    console.log(user)
                    res.redirect('/')
                })
                .catch(err => console.log(err))

        })
    
        .catch(err => console.log(err))
})



// Login
router.get('/login', (req, res) => res.render('auth/login-page'))

router.post('/login', (req, res) => {

    const { username, password } = req.body

    User
        .findOne({ username })
        .then(user => {

            if (!user) {
                res.render('auth/login-page', { errorMessage: 'User not registered, Log in!' })
                return
            }

            if (bcrypt.compareSync(password, user.password) === false) {
                res.render('auth/login-page', { errorMessage: 'Wrong Password' })
                return
            }
            
            req.session.currentUser = user
            console.log('Este es el objeto de sesión:', req.session)
            res.redirect('/')
        })
        .catch(err => console.log(err))
})



router.get('/logout', (req, res) => {
    req.session.destroy(() => res.redirect('/'))
})



module.exports = router