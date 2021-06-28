const router = require('express').Router()
const User = require('../models/user.model')
const bcrypt = require('bcrypt')

const { accessRole } = require('./../middlewares')

// acceso a students restringido

router.get('/', accessRole('STUDENT', 'TA', 'PM', 'DEV'), (req, res) => {
  User.find()
    .then(users => {
      res.render('students/students', { users })
    })
    .catch(err => console.log(err))
})

// endpoint para detalle de estudiante, si es pm vecra botones

router.get('/:id', accessRole('STUDENT', 'TA', 'PM', 'DEV'), (req, res) => {
  const { id } = req.params

  const pm = req.session.currentUser?.role === 'PM'

  const currentUser = id === req.session.currentUser?._id

  User.findById(id)
    .then(user => {
      if (pm) {
        res.render('students/student-details', { user, pm })
        return
      }

      if (currentUser) {
        res.render('students/student-details', { user, currentUser })
        return
      }

      res.render('students/student-details', { user })
    })
    .catch(err => console.log(err))
})

// edit user form

router.get('/edit/:id', (req, res) => {
  const { id } = req.params

  const currentUser = id === req.session.currentUser?._id
  const pm = req.session.currentUser?.role === 'PM'

  if (currentUser) {
    User.findById(id)
      .then(user => res.render('students/edit-student', { user }))
      .catch(err => console.log(err))
  } else if (pm) {
    User.findById(id)
      .then(user => res.render('students/edit-student', { user }))
      .catch(err => console.log(err))
  } else {
    res.render('login/login', { error: 'not allowed' })
  }
})

// edit user logic

router.post('/edit/:id', (req, res) => {
  const { id } = req.params

  accessRole('PM', id)

  const { name, username, profileImg, description, pwd } = req.body

  if (pwd === '') {
    User.findByIdAndUpdate(id, { name, username, profileImg, description })
      .then(user => res.redirect('/students'))
      .catch(err => console.log(err))
  } else {
    const bcryptSalt = 10
    const salt = bcrypt.genSaltSync(bcryptSalt)
    const hashPass = bcrypt.hashSync(pwd, salt)

    User.findByIdAndUpdate(id, { name, username, profileImg, description, password: hashPass })

      .then(user => res.redirect('/students'))
      .catch(err => console.log(err))
  }
})

// delete user

router.get('/delete/:id', accessRole('PM'), (req, res) => {
  const { id } = req.params

  User.findByIdAndDelete(id)
    .then(user => {
      res.redirect('/students')
    })
    .catch(err => console.log(err))
})

router.get('/promote/:promote/:id', accessRole('PM'), (req, res) => {
  const { promote, id } = req.params

  User.findByIdAndUpdate(id, { role: promote })
    .then(user => res.redirect('/students'))
    .catch(err => console.log(err))
})

module.exports = router
