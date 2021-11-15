const router = require('express').Router()
const { checkMongoID, isPM } = require('../utils')
const User = require('../models/User.model')
const {
  isLoggedIn,
  checkRoles,
  checkIfCurrUserOrPM,
} = require('./../middlewares')

router.get('/', isLoggedIn, (req, res, next) => {
  User.find()
    .then((users) => res.render('students/student-list', { users }))
    .catch((err) => console.error(err))
})

router.get('/:id', isLoggedIn, (req, res, next) => {
  const { id } = req.params

  if (!checkMongoID(id)) {
    res.render('student/student-details', {
      errorMessage: 'This student does not exist in the DB',
    })
  }

  User.findById(id)
    .then((user) => {
      res.render('students/student-details', {
        user,
        isPM: isPM(req.session.currentUser),
        isCurrStudent: req.session.currentUser._id === id,
      })
    })
    .catch((err) => console.error(err))
})

router.post('/:id/delete', isLoggedIn, checkRoles('PM'), (req, res, next) => {
  const { id } = req.params

  User.findByIdAndRemove(id)
    .then(() => res.redirect('/students'))
    .catch((err) => console.error(err))
})

router.get(
  '/:id/edit',
  isLoggedIn,
  checkRoles('PM', 'STUDENT'),
  checkIfCurrUserOrPM,
  (req, res, next) => {
    const { id } = req.params

    User.findById(id)
      .select({ password: 0 })
      .then((student) =>
        res.render('students/edit-student', {
          student,
          id,
          isPM: isPM(req.session.currentUser),
        })
      )
      .catch((err) => console.log(err))
  }
)

router.post(
  '/:id/edit',
  isLoggedIn,
  checkRoles('PM', 'STUDENT'),
  checkIfCurrUserOrPM,
  (req, res, next) => {
    const { id } = req.params
    const { username, name, description, profileImg, role } = req.body

    User.findByIdAndUpdate(
      id,
      {
        username,
        name,
        description,
        profileImg,
        role,
      },
      { new: true }
    )
      .then((user) => res.redirect(`/students/${user._id}`))
      .catch((err) => console.error(err))
  }
)

module.exports = router
