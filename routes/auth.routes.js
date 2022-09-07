const router = require("express").Router()
const bcrypt = require('bcryptjs')
const User = require("../models/User.model")
const saltRounds = 10
const hasNumber = require('../utils/checkNumber')

// Signup
router.get('/registro', (req, res, next) => res.render('auth/signup'))
router.post('/registro', (req, res, next) => {
  // clean the req.body from empty arrays
  for (const key in req.body) {
    if (!req.body[key]) delete req.body[key]
  }

  const { email, userPwd, username, profileImg, description } = req.body

  if (userPwd.length > 7 && hasNumber(userPwd)) {
    bcrypt
      .genSalt(saltRounds)
      .then(salt => bcrypt.hash(userPwd, salt))
      .then(hashedPassword => User.create({ email, password: hashedPassword, username, profileImg, description }))
      .then(createdUser => res.redirect('/iniciar-sesion'))
      .catch(error => {
        console.log(error._message)
        if (error.code === 11000) {
          // console.log('User validation failed')
          res.render('auth/signup', { errorMessage: 'Duplicated value' })
        } else {
          next(error)
        }
      })
  } else {
    res.render('auth/signup', { errorMessage: 'La contraseña debe tener minimo 8 caracteres y contener un numero ' })
  }
})



// Login
router.get('/iniciar-sesion', (req, res, next) => res.render('auth/login'))
router.post('/iniciar-sesion', (req, res, next) => {

  const { email, userPwd } = req.body

  User
    .findOne({ email })
    .then(user => {
      if (!user) {
        res.render('auth/login', { errorMessage: 'Email no registrado' })
        return
      } else if (bcrypt.compareSync(userPwd, user.password) === false) {
        res.render('auth/login', { errorMessage: 'La contraseña es incorrecta' })
        return
      } else {
        req.session.currentUser = user
        res.redirect('/')
      }
    })
    .catch(error => next(error))
})


// Logout
router.post('/cerrar-sesion', (req, res, next) => {
  req.session.destroy(() => res.redirect('/iniciar-sesion'))
})

module.exports = router
