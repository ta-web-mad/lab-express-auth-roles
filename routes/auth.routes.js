const router = require("express").Router()
const bcrypt = require('bcryptjs')
const User = require("../models/User.model")
const { isLogged, checkRoles, userCreatedIt } = require('./../middlewares/auth.middleware')
const { userIsPM } = require('./../utils/index')

const saltRounds = 10

// Signup
router.get('/registro', (req, res, next) => res.render('auth/signup'))
router.post('/registro', (req, res, next) => {

  const { email, userPwd, username, profileImg, description } = req.body

  bcrypt
    .genSalt(saltRounds)
    .then(salt => bcrypt.hash(userPwd, salt))
    .then(hashedPassword => User.create({ email, username, profileImg, description, password: hashedPassword }))
    .then(createdUser => res.redirect('/'))
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
        res.redirect('/')
      }
    })
    .catch(error => next(error))
})


// Logout
router.post('/cerrar-sesion', (req, res, next) => {
  req.session.destroy(() => res.redirect('/iniciar-sesion'))
})

// List of students
router.get('/students', isLogged, (req, res, next) => {
  const isPM = userIsPM(req.session.currentUser);
  User
  .find()
  .then(students => {
    res.render('students/list', {isPM, students})
  })
  .catch(error => next(error))
})

// Students details
router.get('/students/:id', isLogged, (req, res, next) => {
  const isPM = userIsPM(req.session.currentUser);
  const { id } = req.params
  const isItsProfile = id === req.session.currentUser._id 

  User
  .findById(id)
  .then(details => {
    res.render('students/details', { isPM, isItsProfile, details })
  })
  .catch(error => next(error))
})

// Delete

router.post('/students/:id/delete', checkRoles('PM'),(req, res, next) => {
  const { id } = req.params
  User
  .findByIdAndRemove(id)
  .then(()=>{
    res.redirect('/students')
  })
  .catch(error => next(error))
})

// Edit
router.get('/students/:id/edit', checkRoles('PM'), userCreatedIt, (req, res, next) => {
  const isPM = userIsPM(req.session.currentUser);
  const { id } = req.params

  User
  .findById(id)
  .then(details=>{
    res.render('students/update-form', {isPM, details})
  })
  .catch(error => next(error))
});

router.post('/students/:id/edit', checkRoles('PM'), userCreatedIt, (req, res, next) => {
  const { id } = req.params
  const { profileImg, username, email, role, description } = req.body
  User
  .findByIdAndUpdate(id, { profileImg, username, email, role, description })
  .then(()=>{
    res.redirect(`/students/${id}`)
  })
  .catch(error => next(error))
});

module.exports = router
