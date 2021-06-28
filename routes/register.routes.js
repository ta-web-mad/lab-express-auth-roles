const router = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user.model')

router.get('/', (req, res) => res.render('register/register'))

// register if user email do no exist
router.post('/', (req, res) => {
  let { name, username, profileImg, description, pwd } = req.body

  if (profileImg === '') profileImg = undefined

  User.findOne({ username }).then(user => {
    if (user) {
      res.render('register/register', { error: 'User already exist' })
      return
    }
  })

  const bcryptSalt = 10
  const salt = bcrypt.genSaltSync(bcryptSalt)
  const hashPass = bcrypt.hashSync(pwd, salt)

  User.create({ name, username, profileImg, description, password: hashPass })
    .then(user => res.redirect('/login'))
    .catch(err => {
      console.log(err)
      res.render('register/register', { error: 'error ocurred' })
    })
})

module.exports = router
