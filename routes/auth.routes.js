const router = require("express").Router()
const bcrypt = require('bcrypt')

const User = require('./../models/user.model')


// Signup
router.get('/register', (req, res) => res.render('auth/signup-page'))

router.post('/register', (req, res) => {

    const { username, pwd } = req.body

    User
        .findOne({ username })
        .then(user => {

            if (user) {
                res.render('auth/signup-page', { errorMessage: 'User already registered' })
                return
            }

            const bcryptSalt = 10
            const salt = bcrypt.genSaltSync(bcryptSalt)
            const hashPass = bcrypt.hashSync(pwd, salt)

            User
                .create({ username, password: hashPass })
                .then(() => res.redirect('/students/list'))
                .catch(err => console.log(err))

        })
        .catch(err => console.log(err))
})


// Login
router.get('/log-in', (req, res) => res.render('auth/login-page'))

router.post('/log-in', (req, res) => {

    const { username, pwd } = req.body

    User
        .findOne({ username })
        .then(user => {

            if (!user) {
                res.render('auth/login-page', { errorMessage: 'Unknown User' })
                return
            }

            if (bcrypt.compareSync(pwd, user.password) === false) {
                res.render('auth/login-page', { errorMessage: 'Wrong Password dude!' })
                return
            }
            req.session.currentUser = user
            res.redirect('/')
        })
        .catch(err => console.log(err))
})



router.get('/log-off', (req, res) => {
    req.session.destroy(() => res.redirect('/'))
})



module.exports = router