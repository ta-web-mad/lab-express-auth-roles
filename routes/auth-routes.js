const router = require("express").Router()
const bcrypt = require('bcrypt')

const User = require('./../models/user.model')


// Signup
router.get('/sign-in', (req, res) =>  res.render('auth/sign-in'))

router.post('/sign-in', (req, res) => {

    const { username, pwd, name ,profileImg , description } = req.body

    User
        .findOne({ username })
        .then(user => {

            if (user) {
                res.render('auth/sign-in', { errorMessage: 'User already exist!' })
                return
            }

            const bcryptSalt = 10
            const salt = bcrypt.genSaltSync(bcryptSalt)
            const hashPass = bcrypt.hashSync(pwd, salt)

            User
                .create({ username, password: hashPass, name, profileImg, description  })
                .then(() => res.redirect('/'))
                .catch(err => console.log(err))

        })
        .catch(err => console.log(err))
})



// Login
router.get('/log-in', (req, res) => res.render('auth/log-in'))

router.post('/log-in', (req, res) => {

    const { username, pwd } = req.body

    User
        .findOne({ username })
        .then(user => {

            if (!user) {
                res.render('auth/log-in', { errorMessage: 'User not found' })
                return
            }

            if (bcrypt.compareSync(pwd, user.password) === false) {
                res.render('auth/log-in', { errorMessage: 'Wrong Password' })
                return
            }
            req.session.currentUser = user
            res.redirect('/')
        })
        .catch(err => console.log(err))
})



router.get('/Log-out', (req, res) => {
    req.session.destroy(() => res.render('auth/log-out'))
})
module.exports= router