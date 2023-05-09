const router = require("express").Router()

const User = require('../models/User.model')

const { isLoggedIn, isLoggedOut, checkRoles, checkUser } = require('../middlewares/route-guard')

router.get("/", (req, res, next) => {
  res.render("index")
})

// User list//

router.get('/students', isLoggedIn, (req, res, next) => {

  const userRole = {
    isPM: req.session.currentUser?.role === 'PM',
    isDEV: req.session.currentUser?.role === 'DEV',
    isTA: req.session.currentUser?.role === 'TA'
  }

  const { username, profileImg } = req.params

  User
    .find()
    .then(allStudents => { res.render('students/students-list', { allStudents, userRole }) })
    .catch(err => console.log(err))
})

//user profile//

router.get('/profile/:id', isLoggedIn, (req, res, next) => {

  const { id } = req.params
  User
    .findById(id)
    .then(user => res.render('students/profile', user))
    .catch(err => console.log(err))

})

//user update//
//render
router.get('/edit/:_id', isLoggedIn, checkUser, (req, res, next) => {
  const { _id } = req.params
  User
    .findById(_id)
    .then(user => res.render('students/students-update', user))
    .catch(err => console.log(err))
})

//handler
router.post('/edit/:_id', isLoggedIn, checkUser, (req, res, next) => {

  const { username, email, profileImg, description } = req.body
  const { _id } = req.params
  User
    .findByIdAndUpdate(_id, { username, email, profileImg, description })
    .then(res.redirect(`/profile/${_id}`))
    .catch(err => console.log(err))
})

// user delete//

router.post('/delete/:student_id', isLoggedIn, checkRoles('PM'), (req, res, next) => {
  const { user_id } = req.params

  User
    .findByIdAndDelete(user_id)
    .then(res.redirect('/students'))
    .catch(err => console.log(err))
})




module.exports = router
