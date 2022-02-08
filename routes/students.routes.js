const router = require("express").Router()
const User = require('../models/User.model')

const { isLoggedIn, isUser } = require('../middleware/route-guard')
const { isPM } = require("../utils");

router.get('/', isLoggedIn, (req, res) => {
  User
    .find()
    .select('username')
    .then((students) => res.render('students/students', { students, isPM: isPM(req.session.currentUser) }))
    .catch(err => console.log(err))
});

router.get('/:id', isLoggedIn, (req, res) => {
  const { id } = req.params

  User
    .findById(id)
    .then((students) => res.render("students/students-details", { students }))
    .catch(err => console.log(err))
})

router.post('/:id/delete', isLoggedIn, (req, res) => {
  const { id } = req.params

  User
    .findByIdAndDelete(id)
    .then(() => res.redirect("/students"))
    .catch(err => console.log(err))
});

router.get('/:id/edit', isLoggedIn, (req, res, next) => {
  const { id } = req.params

  User
    .findById(id)
    .then(students => res.render("students/students-edit", { students, isPM: isPM(req.session.currentUser) }))
    .catch(err => console.log(err))
})

router.get('/:id/edit', isUser, (req, res, next) => {
  const { id } = req.params

  User
    .findById(id)
    .then(students => res.render("students/students-edit", { students, isUser: isUser(req.session.currentUser) }))
    .catch(err => console.log(err))
})

router.post('/:id/edit', isLoggedIn, (req, res, next) => {
  const { id } = req.params
  const { username, email, password, profileImg, description, role } = req.body

  User
    .findByIdAndUpdate(id, { username, email, password, profileImg, description, role }, { new: true })
    .then(user => res.redirect(`/students`))
    .catch(err => console.log(err))
})


module.exports = router