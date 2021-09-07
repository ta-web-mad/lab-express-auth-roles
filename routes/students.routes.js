const router = require("express").Router()

const bcrypt = require('bcrypt')

const { checkId, isLoggedIn, checkRoles } = require("../middleware")

const User = require("../models/User.model")

// LISTADO DE ESTUDIANTES

router.get('/', isLoggedIn, (req, res) => {

  User
    .find()
    .then(students => res.render('students/students-list',
      { students, isLogged: req.session.currentUser }))
    .catch(err => console.log(err))
})

// DETALLES DEL PERFIL DE ESTUDIANTES

router.get('/student-profile/:id', isLoggedIn, checkRoles("PM"), (req, res) => {

  const { id } = req.params

  User
    .findById(id)
    .then(theUser => res.render('students/student-profile', { theUser, isPM: req.session.currentUser.role === 'PM' }))
    .catch(err => console.log(err))

})

// ELIMINAR PERFIL

router.get('/delete/:id', isLoggedIn, checkRoles('PM'), (req, res) => {

  const { id } = req.params

  User
    .findByIdAndRemove(id)
    .then(() => res.redirect("/"))
    .catch(err => console.log(err))
})

// EDITAR PERFILES 

router.get('/editar/:user_id', checkRoles('PM'), (req, res) => {

  const { user_id } = req.params

  User
    .findById(user_id)
    .then(theUser => res.render(`students/student-edit`, theUser))
    .catch(err => console.log(err))
})

// EDITAR PERFIL DE ESTUDIANTES , SOLO PM

router.post('/editar/:user_id', isLoggedIn, checkRoles('PM'), (req, res) => {

  const { user_id } = req.params
  const { username, description } = req.body

  User
    .findByIdAndUpdate(user_id, { username, description }, { new: true })
    .then(() => res.redirect("/"))
    .catch(err => console.log(err))
})


// REASIGNAR ROLES

router.get('/:id/:new_role', isLoggedIn, checkRoles('PM'), (req, res) => {

  const { id, new_role } = req.params

  User
    .findByIdAndUpdate(id, { role: new_role }, { new: true })
    .then(() => res.redirect("/"))
    .catch(err => console.log(err))
})



module.exports = router