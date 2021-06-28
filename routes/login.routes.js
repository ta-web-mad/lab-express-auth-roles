const router = require('express').Router()
const User = require('../models/user.model')
const bcrypt = require('bcrypt')

// login form
router.get('/', (req, res) => res.render('login/login'))

// login access
router.post('/', (req, res) => {
  const { username, pwd } = req.body

  User.findOne({ username })
    .then(user => {
      if (!user) {
        res.render('login/login', { error: 'User not found' })
        return
      }
      if (!bcrypt.compareSync(pwd, user.password)) {
        res.render('login/login', { error: 'password dont match!' })
        return
      }

      return user
    })
    .then(user => {
      if (user) {
        req.session.currentUser = user
        res.redirect('/')
      }
    })
    .catch(err => console.log(err))
})

// logout
router.get('/logout', (req, res) => req.session.destroy(() => res.redirect('/')))

module.exports = router
