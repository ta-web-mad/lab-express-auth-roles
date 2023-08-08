const router = require('express').Router()
const bcrypt = require('bcryptjs')
const User = require('../models/User.model')
const saltRounds = 10

// Signup
router.get('/sign-up', (req, res, next) => res.render('auth/signup'))
router.post('/sign-up', (req, res, next) => {
  const { email, userPwd, username, profileImg, description } = req.body

  if (!email.length) {
    res.render('auth/signup', { errorMessage: 'E-mail required' })
    return
  }

  if (!username.length) {
    res.render('auth/signup', { errorMessage: 'Username required' })
    return
  }

  if (!userPwd.length) {
    res.render('auth/signup', { errorMessage: 'Password required' })
    return
  }

  User.findOne({ email }).then(foundUser => {
    if (foundUser) {
      res.render('auth/signup', { errorMessage: 'This e-mail alredy exists' })
      return
    }
  })

  bcrypt
    .genSalt(saltRounds)
    .then(salt => bcrypt.hash(userPwd, salt))
    .then(hashedPassword => User.create({ email, username, profileImg, description, password: hashedPassword }))
    .then(createdUser => res.redirect('/'))
    .catch(error => next(error))
})

// Login
router.get('/log-in', (req, res, next) => res.render('auth/login'))
router.post('/log-in', (req, res, next) => {
  const { email, userPwd } = req.body

  User.findOne({ email })
    .then(user => {
      if (!user) {
        res.render('auth/login', { errorMessage: 'Email not registered in the database' })
        return
      } else if (bcrypt.compareSync(userPwd, user.password) === false) {
        res.render('auth/login', { errorMessage: 'Incorrect Password' })
        return
      } else {
        req.session.currentUser = user
        res.redirect('/')
      }
    })
    .catch(error => next(error))
})

// Logout
router.post('/log-out', (req, res, next) => {
  req.session.destroy(() => res.redirect('/log-in'))
})

module.exports = router
