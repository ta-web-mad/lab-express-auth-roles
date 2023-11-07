const router = require("express").Router()
const bcrypt = require('bcryptjs')
const User = require('../models/User.model')
const saltRounds = 10

const { isLoggedOut } = require('../middleware/route-guard')

// Signup
router.get('/registro', isLoggedOut, (req, res, next) => res.render('auth/signup'))
router.post('/registro', isLoggedOut, (req, res, next) => {

  let { email, userPwd, username, profileImg, description } = req.body

  if (email.length === 0 || userPwd.length === 0 || username.length === 0) {
    res.render('auth/signup', { errorMessage: 'Complete email, password and username the fields' })
    return
  }

  if (profileImg.length === 0) {
    profileImg = 'https://i.stack.imgur.com/l60Hf.png'
  }

  if (description.length === 0) {
    description = 'No existe descripción.'
  }

  bcrypt
    .genSalt(saltRounds)
    .then(salt => bcrypt.hash(userPwd, salt))
    .then(hashedPassword => User.create({ email, username, profileImg, description, password: hashedPassword }))
    .then(createdUser => res.redirect('/'))
    .catch(error => next(error))
})



// Login
router.get('/iniciar-sesion', isLoggedOut, (req, res, next) => res.render('auth/login'))
router.post('/iniciar-sesion', isLoggedOut, (req, res, next) => {

  const { email, userPwd } = req.body

  User
    .findOne({ email })
    .then(user => {
      if (!user) {
        res.render('auth/login', { errorMessage: 'Email no registrado en la Base de Datos' })
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
