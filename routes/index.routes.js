const router = require("express").Router()
const { isLoggedIn, checkRole } = require('../middleware/route-guard')
const { isLoggedOut } = require('../middleware/route-guard')

const User = require("../models/User.model")
const edit = false



//routes

router.get("/", (req, res, next) => {
  res.render("index")
})

router.get("/listado", isLoggedIn, (req, res, next) => {
  User
    .find()
    .then(users => res.render('auth/list', {
      user: users,
      // {

      // isTA: req.session.currentUser.role === 'TA',
      // isDEV: req.session.currentUser.role === 'DEV',
      isPM: req.session.currentUser.role === 'PM'
    }

    ))
    .catch(err => console.log(err))
})

router.get("/auth/details/:_id", isLoggedIn, (req, res, next) => {
  const { _id } = req.params

  User
    .findById(_id)
    .then(user => res.render('auth/details', {
      user: user,
      isPM: req.session.currentUser.role === 'PM',
      profile: ((req.session.currentUser._id === _id) || (req.session.currentUser.role === 'PM'))
    }
    ))
    .catch(err => console.log(err))

})
router.get("/edita/:_id", isLoggedIn, (req, res) => {
  const { _id } = req.params
  User
    .findById(_id)
    .then(user => res.render(`/auth/details/${_id}`, user,))
    .catch(err => console.log(err))
})
router.post('/edita/:_id', isLoggedIn, (req, res, next) => {
  const { _id } = req.params
  const { username, profileImg, description } = req.body
  User
    .findByIdAndUpdate(_id, { username, profileImg, description })
    .then(() => res.redirect(`/auth/details/${_id}`))
    .catch(err => console.log(err))
})






router.get('/edit/:_id', isLoggedIn, checkRole('PM'), (req, res) => {
  const { _id } = req.params

  User
    .findById(_id)
    .then(user => res.render(`/auth/details/${id}`, user))
    .catch(err => console.log(err))
})
router.post('/edit/:_id', isLoggedIn, checkRole('PM'), (req, res, next) => {
  const { _id } = req.params
  const { role } = req.body
  User
    .findByIdAndUpdate(_id, { role })
    .then(() => res.redirect(`/auth/details/${_id}`))
    .catch(err => console.log(err))
}
)
router.post('/auth/delete/:_id', isLoggedIn, checkRole('PM'), (req, res) => {
  const { _id } = req.params
  User
    .findByIdAndDelete(_id)
    .then(() => res.redirect('/listado'))
    .catch(err => console.log(err))
}
)

module.exports = router
