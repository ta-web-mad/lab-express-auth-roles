const router = require('express').Router()
const { isLoggedIn, checkRoles } = require('../middlewares/route-guard')
const User = require('../models/User.model')

router.get('/list', isLoggedIn, (req, res) => {
  User.find({ role: 'STUDENT' })
    .then(students => {
      res.render('students/list', { students })
    })
    .catch(err => console.log(err))
})

router.get('/details/:student_id', isLoggedIn, (req, res) => {
  const { student_id } = req.params
  const userRoles = {
    isPM: req.session.currentUser?.role === 'PM'
  }

  User.findById(student_id)
    .then(student => {
      res.render('students/details', { student, userRoles })
    })
    .catch(err => console.log(err))
})

router.post('/details/:student_id', isLoggedIn, checkRoles('PM'), (req, res) => {
  const { student_id } = req.params
  const { role } = req.body

  User.findByIdAndUpdate(student_id, { role })
    .then(student => res.redirect(`/students/details/${student._id}`))
    .catch(err => console.log(err))
})

router.get('/details/:student_id/edit', isLoggedIn, checkRoles('PM'), (req, res) => {
  const { student_id } = req.params

  User.findById(student_id)
    .then(student => res.render('students/edit', student))
    .catch(err => console.log(err))
})

router.post('/details/:student_id/edit', isLoggedIn, checkRoles('PM'), (req, res) => {
  const { student_id } = req.params
  const { username, email, profileImg, description } = req.body

  if (!email.length) {
    res.render('students/edit', { errorMessage: 'E-mail required' })
    return
  }

  if (!username.length) {
    res.render('students/edit', { errorMessage: 'Username required' })
    return
  }

  User.findByIdAndUpdate(student_id, { username, email, profileImg, description })
    .then(student => res.redirect(`/students/details/${student._id}`))
    .catch(err => console.log(err))
})

router.post('/details/:student_id/delete', isLoggedIn, checkRoles('PM'), (req, res) => {
  const { student_id } = req.params

  User.findByIdAndDelete(student_id)
    .then(() => res.redirect('/students/list'))
    .catch(err => console.log(err))
})

module.exports = router
