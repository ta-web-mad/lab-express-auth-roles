const router = require("express").Router()
const { isLoggedIn, checkRoles } = require("../middlewares/route-guards")
const User = require('../models/User.model')

router.get("/", (req, res, next) => {
  res.render("index")
})

router.get("/students", isLoggedIn, (req, res, next) => {

  User
    .find()
    .then(students => res.render('students-list', { students }))
    .catch(err => next(err))
})

router.get('/students-details/:user_id', isLoggedIn, checkRoles('PM', 'STUDENT'), (req, res, next) => {

  const { user_id } = req.params

  const userRoles = {
    isPM: req.session.currentUser?.role === 'PM',
  }

  const currentUserId = req.session.currentUser._id
  const isCurrentUser = currentUserId === user_id



  User
    .findById(user_id)
    .then(student => {
      res.render('students-details', { student, userRoles, isCurrentUser })
    })

    .catch(err => next(err))
})

router.get('/editar-alumno/:user_id', isLoggedIn, checkRoles('PM', 'STUDENT'), (req, res, next) => {


  const { user_id } = req.params

  const rolPM = {

    isPM: req.session.currentUser.role === 'PM'
  }

  const rolOwner = {

    isOwner: req.session.currentUser._id === user_id
  }

  if (rolPM.isPM || rolOwner.isOwner) {

    User
      .findById(user_id)
      .then(student => res.render("students/edit-profile", student))
      .catch(err => next(err))
  }

  else { res.redirect('inicar-sesion?.No tienes autorización para entrar') }
})

router.post('/editar-alumno/:user_id', isLoggedIn, (req, res, next) => {

  const { user_id } = req.params
  const { username, description, email, role } = req.body

  User
    .findByIdAndUpdate(user_id, { username, description, email, role })
    .then(() => res.redirect(`/students-details/${user_id}`))
    .catch(err => next(err))
})


router.post('/eliminar-alumno/:user_id', isLoggedIn, (req, res, next) => {

  const { user_id } = req.params

  User
    .findByIdAndDelete(user_id)
    .then(() => res.redirect(`/students`))
    .catch(err => next(err))
})

router.post('/actualizar-rol/:user_id/ta', isLoggedIn, (req, res, next) => {

  const { user_id } = req.params

  User
    .findByIdAndUpdate(user_id, { role: 'TA' })
    .then(() => res.redirect('/students'))
    .catch(err => next(err))

})

router.post('/actualizar-rol/:user_id/dev', isLoggedIn, (req, res, next) => {

  const { user_id } = req.params

  User
    .findByIdAndUpdate(user_id, { role: 'DEV' })
    .then(() => res.redirect('/students'))
    .catch(err => next(err))

})

module.exports = router
