const router = require("express").Router()
const bcrypt = require('bcryptjs')
const User = require("../models/User.model")
const Todo = require("../models/Todo.model")
const Course = require("../models/Course.model")
const { isPM, owner } = require("../utils")
const { isLoggedIn, checkRoles, bothCheck } = require("../middleware/route-guard")
const saltRounds = 10

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



// ESTUDIANTES
router.get("/estudiantes", isLoggedIn, (req, res, next) => {
  User
    .find()
    .then(student => {
      res.render("students/student-list", { student })
    })
    .catch(error => next(error))
})


router.get("/estudiantes/:id", isLoggedIn, (req, res, next) => {
  const { id } = req.params

  User
      .findById(id)
      .then(student => {
        res.render("students/student-profile", 
        { student, isPM: isPM(req.session.currentUser), 
          owner: owner(student, req.session.currentUser) 
        })
      })
      .catch(error => next(error))
})



// PM PRIVILEGIOS EDITAR 

router.get("/estudiantes/:id/editar", isLoggedIn, bothCheck, (req, res, next) => {
  const { id } = req.params
  User
    .findById(id)
    .then(student => {
      res.render("students/edit-student", student)
    })
    .catch(error => next(error))
})

router.post("/estudiantes/:id/editar", isLoggedIn, bothCheck, (req, res, next) => {
  const { id } = req.params
  const {username, email, password, profileImg, description} = req.body
  User
    .findByIdAndUpdate(id, { username, email, password, profileImg, description })
    .then(() => {
      res.redirect("/estudiantes")
    })
    .catch(error => next(error))
})





// EDITAR A DEVELOPER
router.get("/estudiantes/:id/dev", isLoggedIn, checkRoles("PM"), (req, res, next) => {
  const { id } = req.params
  User
    .findById(id)
    .then(student => {
      res.render("students/dev", student)
    })
    .catch(error => next(error))
})

router.post("/estudiantes/:id/dev", isLoggedIn, checkRoles("PM"), (req, res, next) => {
  const { id } = req.params
  const { role } = req.body

  User
    .findByIdAndUpdate(id, { role })
    .then(() => {
      res.redirect("/estudiantes")
    })
    .catch(error => next(error))
})
// PM PRIVILEGIOS ELIMINAR

router.post("/estudiantes/:id/eliminar", isLoggedIn, checkRoles("PM"), (req, res, next) => {
  const { id } = req.params
  User
    .findByIdAndDelete(id)
    .then(() => {
      res.redirect("/estudiantes")
    })
    .catch(error => next(error))
})




// TA PRIVILEGIOS

router.get("/cursos", isLoggedIn, checkRoles("TA"), (req, res, next) => {
  Course
      .find()
      .then(curso => {
        res.render("course-list", {curso})
      })
      .catch(error => next(error))
})


// CREAR CURSOS

router.get("/cursos/crear", isLoggedIn, checkRoles("TA"), (req, res, next) => {
  res.render("create-course")
})

router.post("/cursos/crear", isLoggedIn, checkRoles("TA"), (req, res, next) => {
  const { title } = req.body

  Course
    .create({ title })
    .then(() => {
      res.redirect("/cursos")
    })
    .catch(error => next(error))
})






router.get("/cursos/:id", isLoggedIn, checkRoles("TA"), (req, res, next) => {
  const { id } = req.params

  Course
    .findById(id)
    .then(curso => {
      res.render("course-profile", {curso})
    })
    .catch(error => next(error))

})









// ELIMINAR CURSOS

router.post("/cursos/:id/eliminar", isLoggedIn, checkRoles("TA"), (req, res, next) => {
  const { id } = req.params

  Course
    .findByIdAndDelete(id)
    .then(() => {
      res.redirect("/cursos")
    })
    .catch(error => next(error))
})




// Logout
router.post('/cerrar-sesion', (req, res, next) => {
  req.session.destroy(() => res.redirect('/iniciar-sesion'))
})

module.exports = router
