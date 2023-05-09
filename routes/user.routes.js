const express = require('express')
const { isLoggedIn, checkRoles, checkStudent } = require('../middlewares/routes-guard')
const router = express.Router()

const User = require('../models/User.model')


// lista alumnos
router.get('/estudiantes', isLoggedIn, (req, res, next) => {

  User
  .find()
  .then(student => res.render('student/student-list', { student/*, userRole */}))
  .catch(err => console.log(err))

})

// perfil
router.get('/estudiantes/:id/perfil', isLoggedIn, (req, res, next) => {

  const { id } = req.params

  const userRole = {

    isPM: req.session.currentUser?.role === 'PM',
    isStudent: req.session.currentUser?._id === id
  }

  User
  .findById(id)
  .then(student => res.render('student/student-profile', {student, userRole}))
  .catch(err => console.log(err))

})


// modificar alumnos
router.get("/estudiantes/:id/edit", isLoggedIn, checkStudent, (req, res, next) => {

  const { id } = req.params

  User
    .findById(id)
    .then(student => res.render("student/student-edit", student))
    .catch(err => console.log(err))
})

router.post('/estudiantes/:id/edit', isLoggedIn, checkStudent, (req, res, next) => {
  
    const { username, email, profileImg, description, role } = req.body
    const { id } = req.params

    User
    .findByIdAndUpdate(id, { username, email, profileImg, description, role })
    .then(student => res.redirect('/estudiantes'))
    .catch(err => console.log(err))

})

// modificar a TA
router.post('/estudiantes/:id/TA', isLoggedIn, checkRoles('PM'), (req, res, next) => {
  
    const { id } = req.params

    User
    .findByIdAndUpdate(id, { role: 'TA' })
    .then(student => res.redirect('/estudiantes'))
    .catch(err => console.log(err))

})

// modificar a TA
router.post('/estudiantes/:id/DEV', isLoggedIn, checkRoles('PM'), (req, res, next) => {
  
    const { id } = req.params

    User
    .findByIdAndUpdate(id, { role: 'DEV' })
    .then(student => res.redirect('/estudiantes'))
    .catch(err => console.log(err))

})


//eliminar alumnos
router.post('/estudiantes/:id/eliminar', isLoggedIn, checkRoles('PM'), (req, res, next) => {

  const { id } = req.params

  User
    .findByIdAndDelete(id)
    .then(() => res.redirect(`/estudiantes`))
    .catch(err => console.log(err))
})





module.exports = router