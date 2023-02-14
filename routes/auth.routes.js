const router = require("express").Router()
const bcrypt = require('bcryptjs')
const User = require("../models/User.model")

const { isLoggedOut, isLoggedIn, userIsAdmin } = require('./../middlewares/route-guard')


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


// Students

router.get('/students', isLoggedIn, (req, res, next) => {

  User
    .find({ role: 'STUDENT' })
    .sort({ username: 1 })
    .then(users => res.render('students', { users }))
    .catch(error => next(error))
})



// Students Detail


router.get('/students/:_id', userIsAdmin('PM'), (req, res, next) => {

  const { _id } = req.params

  User
    .findById(_id)
    .then(user => {
      res.render('profile', {
        user,
        userIsAdmin: req.session.currentUser?.role === 'PM',
      })
    })
    .catch(err => console.log(err))
})





//  Edit Students


router.get('/edit/:_id', isLoggedIn, userIsAdmin('PM'), (req, res, next) => {

  const { _id } = req.params

  User
    .findById(_id)
    .then(user => res.render('edit-profile', user))
    .catch(error => next(error))
})


router.post('/edit/:id', isLoggedIn, userIsAdmin('PM'), (req, res, next) => {

  const { username, profileImg, description, role, _id } = req.body

  User
    .findByIdAndUpdate(_id, { username, profileImg, description, role, })
    .then(user => res.redirect(`profile/${_id}`))
    .catch(error => next(error))
})





// Delete Students

router.post('/delete/:id', isLoggedIn, userIsAdmin('PM'), (req, res, next) => {

  const { _id } = req.params

  User
    .findByIdAndDelete(_id)
    .then(() => res.redirect('/students'))
    .catch(error => next(error))
})





// Logout

router.post('/cerrar-sesion', (req, res, next) => {
  req.session.destroy(() => res.redirect('/iniciar-sesion'))
})

module.exports = router
