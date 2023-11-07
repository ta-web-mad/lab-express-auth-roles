const router = require("express").Router()

const User = require('./../models/User.model')

const { isLoggedIn, isLoggedOut, checkRole, check } = require('./../middleware/route-guard')

router.get("/", (req, res, next) => {
  res.render("index")
})

router.get('/list', isLoggedIn, (req, res, next) => {
  User
    .find()
    .then(user => res.render('students/list',
      {
        user: user,
        isPM: req.session.currentUser.role === 'PM',

      }
    ))
    .catch(err => console.log(err))
})

router.get('/students/:user_id', isLoggedIn, (req, res, next) => {

  // console.log(req.session.currentUser.role)
  const { user_id } = req.params
  // console.log(user_id)

  User
    .findById(user_id)
    .then(user => {
      console.log({ user })
      res.render('students/details',
        {
          user: user,
          isPM: req.session.currentUser.role === 'PM',

        })
    })
    .catch(err => console.log(err))
})

router.get('/students/:user_id/edit', (req, res) => {

  const { user_id } = req.params

  User
    .findById(user_id)
    .then(user => res.render('students/edit', user))
    .catch(err => console.log(err))
})

router.post('/students/:user_id/edit', (req, res) => {

  const { username, profileImg, description } = req.body
  const { user_id } = req.params

  User
    .findByIdAndUpdate(user_id, { username, profileImg, description })
    .then(() => res.redirect('/list'))
    .catch(err => console.log(err))
})

router.post('/eliminar/:user_id', (req, res) => {

  const { user_id } = req.params
  console.log(user_id)
  User
    .findByIdAndDelete(user_id)
    .then(() => res.redirect('/list'))
    .catch(err => console.log(err))
})

router.post('/students/:user_id/edit/TA', isLoggedIn, checkRole('PM'), (req, res) => {

  const { user_id } = req.params

  User
    .findByIdAndUpdate(user_id, { role: "TA" })
    .then(() => res.redirect(`/students/${user_id}`))
    .catch(err => console.log(err))
})

router.post('/students/:user_id/edit/DEV', isLoggedIn, checkRole('PM'), (req, res) => {

  const { user_id } = req.params

  User
    .findByIdAndUpdate(user_id, { role: "DEV" })
    .then(() => res.redirect(`/students/${user_id}`))
    .catch(err => console.log(err))
})


module.exports = router
