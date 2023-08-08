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
  const { _id } = req.session.currentUser
  const { username, email, profileImg, description } = req.body

  if (!email.length) {
    res.render('members/edit', { errorMessage: 'E-mail required' })
    return
  }

  if (!username.length) {
    res.render('members/edit', { errorMessage: 'Username required' })
    return
  }

  User.findByIdAndUpdate(_id, { username, email, profileImg, description })
    .then(() => res.redirect('/members/profile'))
    .catch(err => console.log(err))
})

module.exports = router
