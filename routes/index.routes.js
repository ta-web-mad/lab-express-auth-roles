const router = require("express").Router()

const User = require('./../models/User.model')

const { isLoggedIn, checkRole } = require('../middleware/route-guard')

router.get("/", (req, res, next) => {
  res.render("index")
})

router.get('/estudiantes', isLoggedIn, (req, res, next) => {
  User
    .find({
      role: ['STUDENT', 'DEV', 'TA']
    })
    .then(users => res.render('Student/list-students.hbs',
      {
        users: users,
        isPm: req.session.currentUser.role === 'PM',
        isStudent: req.session.currentUser.role === 'STUDENT'
      }
    ))
    .catch(err => next(err))


})


router.get('/estudiantes/perfil/:_id', isLoggedIn, (req, res) => {

  const { _id } = req.params

  User
    .findById(_id)
    .then(users => res.render('Student/perfil-students.hbs', users))
    .catch(err => console.log(err))

})


router.get('/estudiante/editar/:_id', isLoggedIn, (req, res) => {
  const { _id } = req.params

  User
    .findById(_id)
    .then(users => res.render('Student/student-edit.hbs', users))
    .catch(err => console.log(err))

})


router.post('/estudiante/editar/:_id', isLoggedIn, (req, res) => {
  const { _id } = req.params

  const { email, username, profileImg, description } = req.body

  User
    .findByIdAndUpdate(_id, { email, username, profileImg, description })
    .then(() => res.redirect(`/estudiantes/perfil/${_id}`))
    .catch(err => console.log(err))

})


router.get('/estudiantes/editar/:_id', isLoggedIn, (req, res) => {

  const { _id } = req.params

  User
    .findById(_id)
    .then(users => res.render('Student/edit-students.hbs', users))
    .catch(err => console.log(err))

})

router.post('/estudiantes/editar/:_id', isLoggedIn, (req, res) => {

  const { _id } = req.params

  const { email, username, profileImg, description, role } = req.body

  User
    .findByIdAndUpdate(_id, { email, username, profileImg, description, role })
    .then(() => res.redirect(`/estudiantes/perfil/${_id}`))
    .catch(err => console.log(err))

})


router.post('/estudiantes/eliminar/:_id', isLoggedIn, checkRole('PM'), (req, res) => {


  const { _id } = req.params

  User
    .findByIdAndDelete(_id)
    .then(() => res.redirect('/estudiantes'))
    .catch(err => console.log(err))

})




module.exports = router
