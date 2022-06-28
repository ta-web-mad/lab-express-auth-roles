const router = require("express").Router()
const bcrypt = require('bcryptjs')
const { findByIdAndUpdate } = require("../models/User.model")
const User = require("../models/User.model")
const saltRounds = 10
const { isLoggedIn, checkRole } = require('./../middlewares/route-guards')





// Signup
router.get('/registro', (req, res, next) => res.render('auth/signup'))
router.post('/registro', (req, res, next) => {

  const { userPwd } = req.body

  bcrypt
    .genSalt(saltRounds)
    .then(salt => bcrypt.hash(userPwd, salt))
    .then(hashedPassword => User.create({ ...req.body, password: hashedPassword }))
    .then(createdUser => res.redirect('/'))
    .catch(error => next(error))
})



// Login INICIO DE SESIÓN CON REDIRECCIÓN AL HOME

router.get('/iniciar-sesion', (req, res, next) => res.render('auth/login'))
router.post('/iniciar-sesion', (req, res, next) => {

  const { email, userPwd } = req.body

  if (email.length === 0 || userPwd.length === 0) {
    res.render('auth/iniciar-sesion', { errorMessage: 'Rellena todos los campos' })
    return

  }

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

// List: LISTA DE ESTUDIANTES 

router.get('/students', isLoggedIn, (req, res, next) => {

  User //modelo
    .find() // va a buscar los estudiantes
    .then(user => { //user es el lugar donde guardo la búsqueda
      res.render('auth/students', { user }) // user es el resultado de la búsqueda que le paso a la vista
    })
    .catch(err => console.log(err))
})






// PERFILES PARTICULARES POR ID

router.get('/students/:id', isLoggedIn, (req, res) => {

  const { id } = req.params
  const isPM = req.session.currentUser.role === 'PM'

  User
    .findById(id)
    .then(user => {
      res.render('auth/perfiles', { user, isPM }) //el segundo argumento es: y necesito la info de...
    })
    .catch(err => console.log(err))
})

//EDITAR PERFILES // RUTA GET a UPDATE FORM

router.get('/students/:id/editar', isLoggedIn, checkRole('PM'), (req, res, next) => {

  const { id } = req.params



  User
    .findById(id)
    .then(user => {
      console.log(user)
      res.render('update-form', { user })
    })

    .catch(err => console.log(err))
})

// RUTA POST A 

router.post('/students/:id/editar', isLoggedIn, checkRole('PM'), (req, res) => {

  const { id } = req.params
  const { username, email, password, profileImg, description, role } = req.body

  User

    .findByIdAndUpdate(id, {
      username, email, password, profileImg, description, role
    })
    .then(user => {
      res.redirect('/students')
    })
    .catch(err => console.log(err))
})


//ELIMINAR 

router.post('/students/:id/eliminar', isLoggedIn, (req, res, next) => {

  const { id } = req.params

  User
    .findByIdAndDelete(id)
    .then(() => {
      res.redirect('/students')
    })
    .catch(err => console.log(err))
});

//CAMBIAR ROLES








// Logout
router.post('/cerrar-sesion', (req, res, next) => {
  req.session.destroy(() => res.redirect('/iniciar-sesion'))
})

module.exports = router
