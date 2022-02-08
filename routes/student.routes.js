const router = require('express').Router()
const User = require('../models/User.model')
const { isLoggedIn } = require('./../middleware/route-guard')
const { isPM } = require('../utils')

// List
router.get('/students', isLoggedIn, (req, res, next) => {
  User.find()
    .then((users) => res.render('students/students', { users }))
    .catch((err) => next(err))
})

// Profile
router.get('/profile/:id', isLoggedIn, (req, res, next) => {
  const { id } = req.params

  User.findById(id)
    .then((student) =>
      //console.log(student)

      res.render('students/profile', {
        student,
        isPM: isPM(req.session.currentUser),
        isMyProfile: req.session.currentUser?._id === req.params.id,
      })
    )
    .catch((err) => next(err))
})

// Update rol
router.post('/set-rol/:id/:rol', isLoggedIn, (req, res) => {
  const { id, rol } = req.params

  User.findByIdAndUpdate(id, { roles: rol.toUpperCase() })
    .then(() => res.redirect('/students'))
    .catch((err) => next(err))
})

// Delete profile
router.post('/delete/:id/', isLoggedIn, (req, res) => {
  const { id } = req.params

  User.findByIdAndDelete(id)
    .then(() => res.redirect('/students'))
    .catch((err) => next(err))
})

// Book update form (render)
router.get('/edit', isLoggedIn, (req, res) => {
  const { student_id } = req.query

  User.findById(student_id)
    .then((student) => {
      res.render('students/profile-form', student)
    })
    .catch((err) => console.log(err))
})

// Book update form (handle)
router.post('/edit', (req, res) => {
  const { id } = req.query
  const { username, email, description } = req.body

  User.findByIdAndUpdate(id, { username, email, description }, { new: true })
    .then((updatedStudent) => res.redirect(`/profile/${updatedStudent._id}`))
    .catch((err) => console.log(err))
})

module.exports = router
