const router = require("express").Router()
const isLogedin = require('../middleware/is_logedin.middleware');
const { userIsPm, userIsStudent } = require('../utils/index')
const { STUDENT } = require('../const/user.const')
const bcrypt = require('bcryptjs')
const User = require("../models/User.model")
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
        req.session.user = user
        res.redirect('/')
      }
    })
    .catch(error => next(error))
})


// Logout
router.post('/cerrar-sesion', (req, res, next) => {
  req.session.destroy(() => res.redirect('/iniciar-sesion'))
})


// List of students
router.get('/students', isLogedin, (req, res, next) => {
  User.find({ role: STUDENT })
    .then((students) => {
      //req.session.user
      //console.log('ALL THE students -------->', stdents)
      res.render('auth/students', { students });
    })
    .catch((err) => {
      console.error(err);
    });
});

// ID Student profile

router.get('/student/:id', (req, res, next) => {

  const { id } = req.params

  console.log('ID estudanite!!!!!!----------->', req.params.id)
  User
    .findById(id)
    .then(student => {
      const isPm = userIsPm(req.session.user)
      const isStudent = student._id.toString() === req.session.user._id
      console.log('LO QUE DICE DANI QUE ES', req.params.id === req.session.user._id)
      console.log('ID session!!!!!!----------->', req.session.user._id)
      res.render('auth/student', { isPm, student, isStudent });
    })
    .catch((err) => {
      next(err);
    });
});


// Edit Student

router.get('/student/:id/edit', (req, res, next) => {
  if (req.params.id === req.session.user._id || req.session.user.role === 'PM') {
    User.findById(req.params.id)
      .then((userId) => {
        console.log('ESTOYYYYYY AQUIIIIIII', userId)
        res.render('auth/update-form', userId);
      })
      .catch((err) => {
        next(err);
      });
  } else {
    res.render('auth/login', { errorMessage: 'No tienes permiso' })
  }
});

router.post('/student/:id/edit', (req, res, next) => {
  const { username, email, description } = req.body
  User.findByIdAndUpdate(req.params.id, { username, email, description })
    .then((userId) => {
      res.redirect(`/students`);
    })
    .catch((err) => {
      next(err);
    });
});


// Delete student

router.post('/student/:id/delete', (req, res, next) => {
  User.findByIdAndDelete(req.params.id)
    .then((userId) => {
      res.redirect(`/students`);
    })
    .catch((err) => {
      next(err);
    });

});


module.exports = router
