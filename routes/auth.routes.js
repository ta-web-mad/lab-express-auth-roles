const router = require("express").Router()
const bcrypt = require('bcryptjs')
const User = require("../models/User.model")
const { isLoggedIn, checkRole, check } = require("../middleware/routes-guard")
const { PM1, user } = require("../utils")
const saltRounds = 10

router.get('/perfil/:student_id', (req, res, next) => {
  const { student_id } = req.params

  User
    .findById(student_id)
    .then(user => res.render('profile/profile-view', user))
    .catch(err => console.log(err))
})

router.get('/lista', (req, res) => {
  User
    .find()
    .then(students => res.render('profile/list', { students }))
    .catch(error => console.log(error))
})
// Signup
router.get('/registro', (req, res, next) => res.render('auth/signup'))
router.post('/registro', (req, res, next) => {

  const { userPwd } = req.body

  bcrypt
    .genSalt(saltRounds)
    .then(salt => bcrypt.hash(userPwd, salt))
    .then(hashedPassword => User.create({ ...req.body, password: hashedPassword }))
    .then(createdUser => res.redirect(`/`))
    .catch(error => next(error))
})



// Login
router.get('/iniciar-sesion', (req, res, next) => res.render('auth/login'))
router.post('/iniciar-sesion', (req, res, next) => {

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
        res.redirect(`/perfil/${user.id}`)
      }
    })
    .catch(error => next(error))
})


// Logout
router.post('/cerrar-sesion', (req, res, next) => {
  req.session.destroy(() => res.redirect('/iniciar-sesion'))
})

module.exports = router


router.get('/perfil/:student_id/editar', isLoggedIn, check, (req, res, next) => {
  const { student_id } = req.params
  User
    .findById(student_id)
    .then(student => {res.render("profile/edit", student)})
    .catch(error => next(error))
})

router.post("/perfil/:student_id/editar", isLoggedIn, check, (req, res, next) => {
  const { student_id } = req.params
  const {username, email, password, profileImg, description} = req.body
  User
    .findByIdAndUpdate(student_id, { username, email, password, profileImg, description })
    .then(() => {res.redirect("/lista")})
    .catch(error => next(error))
})

router.post("/perfil/:student_id/eliminar", isLoggedIn, checkRole("PM"), (req, res, next) => {
  const { student_id } = req.params
  User
    .findByIdAndDelete(student_id)
    .then(() => {res.redirect("/lista")})
    .catch(error => next(error))
})