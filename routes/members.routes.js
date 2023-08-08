const router = require('express').Router()
const { isLoggedIn } = require('../middlewares/route-guard')
const User = require('../models/User.model')

router.get('/profile', isLoggedIn, (req, res) => {
  const { _id } = req.session.currentUser

  User.findById(_id)
    .then(user => res.render('members/profile', user))
    .catch(err => console.log(err))
})

router.get('/profile/edit', isLoggedIn, (req, res) => {
  const { _id } = req.session.currentUser

  User.findById(_id)
    .then(user => res.render('members/edit', user))
    .catch(err => console.log(err))
})

router.post('/profile/edit', isLoggedIn, (req, res) => {
  const { _id, username, email, profileImg, description } = req.session.currentUser

  if (!email.length) {
    res.render('auth/signup', { errorMessage: 'E-mail required' })
    return
  }

  if (!username.length) {
    res.render('auth/signup', { errorMessage: 'Username required' })
    return
  }

  User.findOne({ email }).then(foundUser => {
    if (foundUser) {
      res.render('auth/signup', { errorMessage: 'This e-mail alredy exists' })
      return
    }
  })

  User.findByIdAndUpdate(_id, { username, email, profileImg, description })
    .then(() => res.redirect('/members/profile'))
    .catch(err => console.log(err))
})

module.exports = router
