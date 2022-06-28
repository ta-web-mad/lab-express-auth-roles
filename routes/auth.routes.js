const router = require("express").Router()
const bcrypt = require('bcryptjs')
const User = require("../models/User.model")
const Course = require("../models/Course.model")

const saltRounds = 10

const { isLoggedIn, isLoggedOut } = require('./../middleware/session-guard')
const { rolesChecker } = require("../utils/roles-checker");
const { findByIdAndDelete } = require("../models/User.model")

// Course

router.get('/new-course', (req, res) => {

  User
    .find()
    .then(users => {
      res.render('auth/new-course', { users })
    })
})

router.post('/new-course', (req, res) => {
  const { title, leadTeacher, ta, students, iDate, eDate, pic, description, status } = req.body
  Course
    .create({ title, leadTeacher, ta, students, iDate, eDate, pic, description, status })
    .then(res.redirect('/'))
    .catch(e => console.log(e))
})

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

// Students
router.get('/students', (req, res) => {

  const roles = rolesChecker(req.session.currentUser)

  User
    .find()
    .then(students => res.render('auth/students', { students, roles }))
    .catch(e => console.log(e))
})

router.get('/students/:id', (req, res) => {

  const { id: student_id } = req.params


  User
    .findById(student_id)
    .then(student => {
      const isMatch = (student.username === req.session.currentUser.username)
      res.render('auth/students-details', { student, isMatch })
    })
})

// DELETE STUDENT

router.get('/delete/:id', (req, res) => {
  const { id } = req.params
  User
    .findByIdAndDelete(id)
    .then(res.redirect('/students'))
    .catch(e => console.log(e))
})

// EDIT STUDENTS
router.get('/edit/:id', (req, res) => {
  const { id } = req.params

  User
    .findById(id)
    .then(student => {
      res.render('auth/update-student', student)
    })
    .catch(e => console.log(e))

})

router.post('/edit/:id', (req, res) => {
  const { id } = req.params
  const { username, email, password, description, role, profileImg } = req.body


  User
    .findByIdAndUpdate(id, { username, email, password, description, role, profileImg })
    .then(res.redirect('/students'))
    .catch(e => console.log(e))
})

// EDIT STUDENT ROLES

router.get('/edit/:id/role-ta', (req, res) => {

  const { id } = req.params

  User
    .findByIdAndUpdate(id, { role: 'TA' })
    .then(res.redirect('/students'))
    .catch(e => console.log(e))
})

router.get('/edit/:id/role-dev', (req, res) => {

  const { id } = req.params

  User
    .findByIdAndUpdate(id, { role: 'DEV' })
    .then(res.redirect('/students'))
    .catch(e => console.log(e))
})

module.exports = router
