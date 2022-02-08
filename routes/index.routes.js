
const router = require("express").Router()
const User = require("../models/User.model")
const { isLoggedIn } = require("./../middleware/route-guard")
const { isDEV, isTA, isPM, checkIfStudent, isStudent } = require("../utils");

router.get("/", (req, res, next) => {
  res.render("index")
})

router.get('/students', isLoggedIn, (req, res, next) => {
  User
    .find()
    .then(students => res.render('users/students', { students }))
    .catch(err => console.log(err))
});

router.get('/students/:id', isLoggedIn, (req, res, next) => {
  const { id } = req.params
  User
    .findById(id)
    .then(students => res.render("users/student-profile", {
      students, isPM: isPM(req.session.currentUser),
      checkIfStudent: checkIfStudent(id, req.session.currentUser._id),
    }))
    .catch(err => console.log(err))
});


router.get('/students/:id/edit', isLoggedIn, (req, res, next) => {
  const { id } = req.params
  User
    .findById(id)
    .then(students => res.render('students/edit-student', students))
    .catch(err => console.log(err))
});

router.post('/students/:id/edit', isLoggedIn, (req, res, next) => {
  const { id } = req.params
  const { username, email, description } = req.body

  User
    .findByIdAndUpdate(id, { username, email, description }, { new: true })
    .then(() => res.redirect('/students'))
    .catch(err => console.log(err))
});

router.post('/students/:id/delete', isLoggedIn, (req, res, next) => {
  const { id } = req.params

  User
    .findByIdAndDelete(id)
    .then(() => res.redirect('/students'))
    .catch(err => console.log(err))
});


router.get('/conditional-render', isLoggedIn, (req, res, next) => {

  res.render('users/students', {
    user: req.session.currentUser,
    isPM: isPM(req.session.currentUser),
    isTA: isTA(req.session.currentUser),
    isTA: isDEV(req.session.currentUser),
    isTA: isStudent(req.session.currentUser),
  })
})

module.exports = router;


